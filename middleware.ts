import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
    const session = await getToken({req,secret: process.env.NEXTAUTH_SECRET,raw: true})
    
    if(!session){
        const requestedPage = req.nextUrl.pathname
        const url = req.nextUrl.clone();
        url.pathname = `/login`
        if(requestedPage !== '/') url.search = `p=${requestedPage}`
        return NextResponse.redirect(url)
    }
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/","/category/movies"],
};