import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
    matcher: ['/home', '/recipes', '/recipe:path*', '/add-recipe', '/auth/signup', '/auth/login', '/'],
};

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    // console.log('token', token);
    const url = request.nextUrl;

    if (
        token &&
        (
            url.pathname.startsWith('/auth/signup') ||
            url.pathname.startsWith('/auth/login') ||
            url.pathname === '/'
        )
    ) {
        return NextResponse.redirect(new URL('/home', request.url));
    }

    if (!token &&
        (
            url.pathname.startsWith('/recipes') ||
            url.pathname.startsWith('/home') ||
            url.pathname.startsWith('/recipe') ||
            url.pathname.startsWith('/add-recipe')
        )
    ) {
        return NextResponse.redirect(new URL('/auth/signup', request.url));
    }

    return NextResponse.next();
}