import { NextApiResponse, NextApiRequest } from 'next';
import prisma from '@/libs/prismadb'
import serverAuth from '@/libs/serverAuth';
import axios from 'axios';
import { Prisma } from '@prisma/client'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        try {
            const currentUser = await serverAuth(req, res)
            const headers = {
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
            if (currentUser?.wishMovies && typeof currentUser?.wishMovies === 'object' && Array.isArray(currentUser?.wishMovies)) {
                const wishList = currentUser.wishMovies as Prisma.JsonArray
                const wishListPromises = wishList.map(async (wishmovie) => {
                    if (
                        typeof wishmovie === 'object' &&
                        wishmovie !== null &&
                        'id' in wishmovie
                    ) {
                        const jsonObject = wishmovie as Prisma.JsonObject;
                        const url = `${process.env.TMDB_URL}${jsonObject.media_type}/${jsonObject.id}`;
                        const response = await axios.get(url, { headers });
                        response.data.media_type = jsonObject.media_type;
                        return response.data;
                    } else {
                        throw new Error('Invalid wishmovie object');
                    }
                });
                const responses = await Promise.all(wishListPromises)
                return res.status(200).json(responses)
            } else {
                return res.status(400).json({ error: 'Invalid wishMovies array' });
            }
        } catch (error) {
            return res.status(400).end()
        }
    } else if (req.method === "POST") {
        try {
            const currentUser = await serverAuth(req, res)
            const { id, type } = req.body
            const isInWish = await prisma.account.findFirst({
                where: {
                    id: currentUser?.id,
                    wishMovies: {
                        has: {
                            id,
                            media_type: type
                        }
                    }
                }
            })
            if (!isInWish) {
                const favoritesMovies = await prisma.account.update({
                    where: {
                        id: currentUser?.id
                    },
                    data: {
                        wishMovies: {
                            push: {
                                id: id,
                                media_type: type
                            }
                        }
                    }
                })
                return res.status(200).json({ message: "Added in WishList" })
            }
        } catch (error) {

        }
    }else if (req.method === "PATCH"){
        const currentUser = await serverAuth(req, res)
        const { id, type } = req.body
        const wishList = currentUser?.wishMovies as Prisma.JsonArray
        const updatedWishList = currentUser?.wishMovies.filter((wishMovie)=> {
            const jsonObject = wishMovie as Prisma.JsonObject;
            return !(jsonObject.id === id && jsonObject.media_type === type)
        })
        const updatedUser = await prisma.account.update({
            where:{
                id:currentUser?.id
            },
            data:{
                wishMovies: updatedWishList
            }
        })
        return res.status(200).json({message:"Removed from Wishlist"})
    }


}