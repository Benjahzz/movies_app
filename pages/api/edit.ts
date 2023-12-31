import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'PATCH') {
        return res.status(405).end();
    }

    try {
        const currentUser = await serverAuth(req, res)
        const { username,image } = req.body;
        
        const updatedUser = await prisma?.account.update({
            where: {
                id: currentUser?.id
            },
            data: {
                username,
                profileImage: image
            }
        })
        return res.status(200).json(updatedUser)
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}