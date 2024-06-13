import jwt, { Secret } from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_SECRET as Secret;
const REFRESH_SECRET = process.env.REFRESH_SECRET as Secret;

export const generateAccessToken = (user: any) => {
  const auth = JSON.parse(JSON.stringify(user))
  return jwt.sign(auth, ACCESS_SECRET, {
    expiresIn: "10s",
  });
};

export const generateRefreshToken = (user: any) => {
  const auth = JSON.parse(JSON.stringify(user))
  return jwt.sign(auth, REFRESH_SECRET, {
    expiresIn: "24h",
  });
};

// export const validateAccessToken = (token: string) => {
//   jwt.verify(token, ACCESS_SECRET, (err: any, user) => {
//     if (err) {
//       throw new Error(err);
//     }

//     const accessToken = generateAccessToken({
//       id: user.id,
//       username: user.username,
//     });
//     const refreshToken = generateRefreshToken({
//       id: user.id,
//       username: user.username,
//     });

//     return {
//       accessToken,
//       refreshToken,
//     };
//   });
// };

export const validateRefreshToken = async (token: string) => {
  return jwt.verify(token, REFRESH_SECRET, (err: any, user: any) => {
    if (err) {
      throw new Error(err);
    }
    return {
      accessToken: generateAccessToken({
        id: user?.id,
        username: user?.username,
      }),
      refreshToken: generateRefreshToken({
        id: user?.id,
        username: user?.username,
      }),
    };
  });
};
