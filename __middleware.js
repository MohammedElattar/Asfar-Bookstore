// middleware.ts
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  //   console.log(`cookies =>`, request.cookies);
  return NextResponse.next();
}
