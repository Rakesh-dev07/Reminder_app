import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },

  username: {
    type: String,
    unique: true,
    required: true,
  },

  passwordHash: {
    type: String,
    default: null,
  },

  googleId: {
    type: String,
    default: null,
  },

  // 🔔 device token for push notifications
  fcmToken: {
    type: String,
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
