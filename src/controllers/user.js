import UserModel from "../models/userModel.js";
import {
  checkExpiredToken,
  createAccessToken,
  createRefreshToken,
} from "../utils/index.js";
import jwt from "jsonwebtoken";

const userController = {
  login: async (req, res) => {
    const { userName, password } = req.body;
    try {
      if (!userName || !password) {
        res.status(400).json({
          message: "userName, password is not define",
        });
      }

      const user = await UserModel.findOne({ userName: userName });

      if (!user)
        res.status(404).json({
          message: `Not found user with userName = ${userName}`,
        });

      if (user.password !== password) {
        res.status(401).json({
          message: "password invalid",
        });
      } else {
        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);
        res.status(200).json({
          message: "Login successfully!",
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      }
    } catch (error) {
      console.log("error:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await UserModel.findOne({ userName: "sang.pham" });
      res.status(200).json({
        user,
      });
    } catch (error) {
      console.log("error:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  refreshToken: async (req, res) => {
    const { refreshToken } = req.body;
    try {
      if (!refreshToken) {
        res.status(400).json({
          message: "refresh token not null",
        });
      }
      const isRefreshTokenValid = checkExpiredToken(refreshToken);
      if (!isRefreshTokenValid) {
        res.status(403).json({
          message: "refresh token is expired",
        });
      }
      jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
          res.status(404).json({
            message: "refresh token invalid",
          });
        }
        const newAccessToken = createAccessToken(user);
        res.status(200).json({
          accessToken: newAccessToken,
        });
      });
    } catch (error) {
      console.log("refreshToken error:", error);
    }
  },
};

export default userController;
