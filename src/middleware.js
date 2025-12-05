// middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl;

 
 
  if (url.pathname.startsWith("/admin")) {
    if (!token) {
      
      
      return NextResponse.redirect(new URL("/auth?mode=register", req.url));
    }
    
    if (token.user.role !== "admin") {
      
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/admin/:path*"],
};
