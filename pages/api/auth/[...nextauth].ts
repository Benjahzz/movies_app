import bcrypt from 'bcrypt'

import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'


import prisma from '@/libs/prismadb'

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            id: 'credentials',
            credentials: {
                email: { label: 'email', type: "text" },
                password: { label: 'password', type: 'password' },

            },
            async authorize(credentials) {

                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid Credentials')
                }
                const user = await prisma.account.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!user || !user?.password) {
                    throw new Error('Invalid Credentials')
                }
                const isCorrectPassword = await bcrypt.compare(credentials.password, user.password)
                if (!isCorrectPassword) {
                    throw new Error('Invalid Credentials')
                }
                return user;
            }

        })
    ],
    // callbacks: {
    //     async jwt({account,token,user}){
            
    //         return {...token,...user}
    //     },
    //     async session({ session, token, newSession, ...params }) {
            
    //         session.user = token
    //         console.log(session)
    //         return session;
    //     },
    // },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET
    },
    secret: process.env.NEXTAUTH_SECRET
}
export default NextAuth(authOptions)