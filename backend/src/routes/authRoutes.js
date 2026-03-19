import express from "express";
import {
  registerUser,
  loginUser,
  googleAuth,
  saveFcmToken,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// auth
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleAuth);

// save device FCM token
router.post("/fcm-token", authMiddleware, saveFcmToken);

export default router;
