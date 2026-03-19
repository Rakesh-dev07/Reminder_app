import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateUsername } from "../utils/generateUsername.js";
import { verifyGoogleToken } from "../config/googleAuth.js";

/**
 * Generate a JWT token
 */
function createToken(userId) {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" } // Token valid for 7 days
  );
}

/**
 * -------------------------
 *  REGISTER (email+password)
 * -------------------------
 */
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // check if already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // generate auto username
    let username = generateUsername(email);

    // ensure unique username
    while (await User.findOne({ username })) {
      username = generateUsername(email);
    }

    // create user
    const newUser = await User.create({
      email,
      passwordHash,
      username,
    });

    // create JWT token
    const token = createToken(newUser._id);

    res.json({
      message: "User registered successfully",
      token,
      userId: newUser._id,
      username: newUser.username,
      email: newUser.email,
    });

  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error registering user" });
  }
};


/**
 * -------------------------
 *  LOGIN (email+password)
 * -------------------------
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // compare password
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // create token
    const token = createToken(user._id);

    res.json({
      message: "Login successful",
      token,
      userId: user._id,
      username: user.username,
      email: user.email,
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error logging in" });
  }
};


/**
 * -------------------------
 *  GOOGLE LOGIN
 * -------------------------
 */
export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body; // from frontend Google API

    if (!token) {
      return res.status(400).json({ message: "Token required" });
    }

    // verify Google token
    const data = await verifyGoogleToken(token);

    const email = data.email;
    const googleId = data.sub;

    // check existing
    let user = await User.findOne({ email });

    // new user from google
    if (!user) {
      let username = generateUsername(email);

      // ensure unique
      while (await User.findOne({ username })) {
        username = generateUsername(email);
      }

      user = await User.create({
        email,
        googleId,
        username,
      });
    }

    // token
    const authToken = createToken(user._id);

    res.json({
      message: "Google login successful",
      token: authToken,
      userId: user._id,
      username: user.username,
      email: user.email,
    });

  } catch (err) {
    console.error("Google login error:", err);
    res.status(401).json({ message: "Invalid Google login" });
  }
};


/**
 * -------------------------
 *  SAVE FCM TOKEN
 * -------------------------
 * Stores the push notification token for user device
 * so we can send reminders later
 */
export const saveFcmToken = async (req, res) => {
  try {
    const { fcmToken } = req.body;

    if (!fcmToken) {
      return res.status(400).json({ message: "FCM token required" });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { fcmToken },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "FCM token saved" });

  } catch (err) {
    console.error("Token save error:", err);
    res.status(500).json({ message: "Error saving FCM token" });
  }
};
