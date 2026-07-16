process.env.TZ = "Asia/Kolkata";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import "./utils/push.js";
import authRoutes from "./routes/authRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";
import cronRoutes from "./routes/cronRoutes.js";
import { startScheduler } from "./scheduler/index.js";
import aiRoutes from "./routes/aiRoutes.js";

// Load .env file
dotenv.config();

const app = express();
const defaultAllowedOrigins = ["https://reminder-app-rho-eight.vercel.app"];

const allowedOrigins = [
  ...new Set(
    (process.env.ALLOWED_ORIGINS || "")
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean)
      .concat(defaultAllowedOrigins),
  ),
];

const isLocalOrigin = (origin) => {
  try {
    const { hostname, protocol } = new URL(origin);

    return (
      (hostname === "localhost" || hostname === "127.0.0.1") &&
      (protocol === "http:" || protocol === "https:")
    );
  } catch {
    return false;
  }
};
// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || isLocalOrigin(origin) || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true,
  }),
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/cron", cronRoutes);
app.use("/api/ai", aiRoutes);

// Optional health check route
app.get("/", (req, res) => {
  res.send("🔥 Reminder App Backend Running!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});

// MongoDB connection → THEN start scheduler
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✔ MongoDB Connected");
    // Start scheduler only after MongoDB is connected
    startScheduler();
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
