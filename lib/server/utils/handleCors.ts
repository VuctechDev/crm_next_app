import type { NextApiRequest, NextApiResponse } from "next";

export const handleRequestMismatch = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "OPTIONS") {
    res.status(200).end();
  } else {
    res.status(405).json({ error: `Method '${req.method}' not allowed` });
  }
};
