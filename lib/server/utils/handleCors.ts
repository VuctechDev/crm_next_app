import type { NextApiRequest, NextApiResponse } from "next";

const allowedOrigins = [
  "http://localhost:5173",
  "https://client.vuctechdev.online",
];

export const setHeaders = (
  res: NextApiResponse,
  origin: string
): NextApiResponse => {
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin); // Dynamically set the origin
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-CSRF-Token"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  return res;
};

export const handleRequestMismatch = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const origin = req.headers.origin ?? "";
  console.log(
    "handleRequestMismatch",
    req.headers.origin,
    allowedOrigins.includes(origin)
  );

  if (req.method === "OPTIONS") {
    // setHeaders(res, origin);
    res.status(200).end();
  } else {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  }
};
