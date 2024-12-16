import { NextResponse } from "next/server";

const allowedOrigins = [
  "http://localhost:5173",
  "https://client.vuctechdev.online",
]; // List of allowed origins

export function middleware(req) {
  const origin = req.headers.get("origin");
  console.log("AAA: ", origin, req.nextUrl.href);

  // Check if the origin is allowed
  if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
    const response = NextResponse.next();

    response.headers.set(
      "Access-Control-Allow-Origin",
      allowedOrigins.includes("*") ? "*" : origin
    );
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-CSRF-Token, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version"
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");

    // Handle preflight requests
    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers: response.headers,
        status: 200,
      });
    }

    return response;
  }

  // If the origin is not allowed, return a 403 response
  return new Response("CORS policy not met", { status: 403 });
}

// Match all API routes
export const config = {
  matcher: "/api/:path*",
};
