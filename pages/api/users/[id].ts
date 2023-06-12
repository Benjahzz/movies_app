
import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from '@/libs/prismadb'
export default async function handler(req: NextApiRequest , res: NextApiResponse ) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }
    try {
        const currentUser = await serverAuth(req, res)
        const {id} = req.query;
        if(!currentUser || !id || typeof id !== "string"){
            throw new Error("Datos Incorrectos")
        }

        const user = prisma.account.findUnique({
            where:{
                id
            }
        })

        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).end()
    }
}