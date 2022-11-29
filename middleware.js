import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  
  console.log(req.url)
  
  if (req.nextUrl.pathname.startsWith('/api/auth') || token) {
    return NextResponse.next();
  } 
  
  if(!token && !req.nextUrl.pathname.startsWith('/login') ){
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = {
  matcher: ['/', '/login'],
}