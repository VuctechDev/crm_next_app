import { initState } from "@/db/local";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

export const localInit = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  initState();
  next();
};
