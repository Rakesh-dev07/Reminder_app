import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";
import { startScheduler } from "./utils/scheduler.js";

// Load .env file
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/reminders", reminderRoutes);

// Optional health check route
app.get("/", (req, res) => {
  res.send("🔥 Reminder App Backend Running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});

// MongoDB connection → THEN start scheduler
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✔ MongoDB Connected");
    startScheduler(); 
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
