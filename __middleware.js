// middleware.ts
import { NextResponse } from "next/server";
import { apiHttp } from "./utils/utils";

export function middleware(request) {
  const response = NextResponse.next();

  const { cookies } = request;
  console.log(`Middleware Cookies =>`, cookies);

  return response;
}
