import { decodeAccessToken } from "@/lib/server/services/jwt";
import { NextApiRequest, NextApiResponse } from "next";

export const authGuard = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "notAuthorizedException" });
    }
    const user = decodeAccessToken(token) as any;
    req.headers.userId = user?._id;
    req.headers.username = user?.username;
    console.log(`Received ${JSON.stringify(user)}`);
    next();
  } catch (err) {
    return res.status(401).json({ message: "notAuthorizedException" });
  }
};
