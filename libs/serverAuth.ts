import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth"
import prisma from '@/libs/prismadb'
import { authOptions } from "@/pages/api/auth/[...nextauth]";
const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions)

    if (!session?.user?.email) return;
    const currentUser = await prisma.account.findUnique({
        where: {
            email: session.user.email
        }
    })
    return currentUser


}
export default serverAuth;