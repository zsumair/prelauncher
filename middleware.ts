import { NextRequest, NextResponse } from 'next/server';



export const middleware = async (request: NextRequest) => {
    const authCookie = request.cookies.get('supabase-auth-token');
  if (request.nextUrl.pathname.startsWith('/profile') || request.nextUrl.pathname.startsWith('/submitapp')) {
    if (!authCookie) return NextResponse.redirect(new URL('/login', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup')) {
    if (authCookie) return NextResponse.redirect(new URL('/', request.url));
  }
};