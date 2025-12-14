import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// Load .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());          // allow frontend access
app.use(express.json());  // accept JSON body

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✔ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// ---------- ROUTES ----------
import authRoutes from "./routes/authRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";

app.use("/auth", authRoutes);
app.use("/reminders", reminderRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🔥 Reminder App Backend Running !");
});

// ---------- SCHEDULER ----------
import { startScheduler } from "./utils/scheduler.js";
startScheduler();

// ---------- START SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
