import { NextApiResponse, NextApiRequest } from 'next';
import bcrypt from 'bcrypt'
import prisma from '@/libs/prismadb'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {

        try {
            const { email, username,password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 12);
            const userCreated = await prisma.account.create({
                data: {
                    email,
                    username,
                    password: hashedPassword
                }
            })
            return res.status(200).json(userCreated)
        } catch (error) {
            return res.status(400).end()
        }

    }


}