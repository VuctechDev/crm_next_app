import { NextResponse } from "next/server";
import { initState } from "./db/local";

export function middleware(request: any) {
  console.log("OPA");
  if (process.env.NODE_ENV === "development") {
    initState();
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/",
  
};
