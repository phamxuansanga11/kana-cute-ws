import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export const createAccessToken = (user) => {
  return jwt.sign(
    {
      userName: user.userName,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );
};

export const createRefreshToken = (user) => {
  return jwt.sign(
    {
      userName: user.userName,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "365d" }
  );
};

export const checkExpiredToken = (token) => {
  const { exp } = jwtDecode(token);
  if (Date.now() >= exp * 1000) {
    return false;
  }
  return true;
};
