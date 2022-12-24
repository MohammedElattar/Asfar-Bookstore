// middleware.ts
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/", "/products/[1-50]"],
};

export function middleware(request) {
  const response = NextResponse.next();

  console.log(`Hello From Middleware 👋`, request.url);

  return response;
}
