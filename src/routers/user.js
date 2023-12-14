import express from "express";
import userController from "../controllers/user.js";
import middlewareController from "../middleware/index.js";

const router = express.Router();

router.post("/login", userController.login);

router.get(
  "/user",
  middlewareController.verifyAccessToken,
  userController.getUser
);

router.post("/refresh-token", userController.refreshToken);

export default router;
