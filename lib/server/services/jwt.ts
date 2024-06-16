import jwt, { Secret } from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_SECRET as Secret;
const REFRESH_SECRET = process.env.REFRESH_SECRET as Secret;

export const generateAccessToken = (user: any) => {
  const json = JSON.parse(JSON.stringify(user));

  return jwt.sign(
    {
      _id: json?._id,
      username: json?.username,
      organization: json?.organization,
    },
    ACCESS_SECRET,
    {
      expiresIn: "30s",
    }
  );
};

export const generateRefreshToken = (user: any) => {
  const json = JSON.parse(JSON.stringify(user));
  return jwt.sign(
    {
      _id: json?._id,
      username: json?.username,
      organization: json?.organization,
    },
    REFRESH_SECRET,
    {
      expiresIn: "24h",
    }
  );
};

export const decodeAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_SECRET);
};

export const validateRefreshToken = async (token: string) => {
  return jwt.verify(token, REFRESH_SECRET, (err: any, user: any) => {
    if (err) {
      throw new Error(err);
    }
    return {
      accessToken: generateAccessToken({
        _id: user?._id,
        username: user?.username,
        organization: user?.organization,
      }),
      refreshToken: generateRefreshToken({
        _id: user?._id,
        username: user?.username,
        organization: user?.organization,
      }),
    };
  });
};
