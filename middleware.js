// middleware.ts
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|images|fav.png).*)"],
};

export function middleware(request) {
  console.log(`Hello from middleware 👋`);
  if (/^\/admin(\/)?$/.test(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(`/admin/dashboard`, request.url));
  }
  if (/^\/products(\/)?$/.test(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(`/products/1`, request.url));
  }
  return NextResponse.next();
}
