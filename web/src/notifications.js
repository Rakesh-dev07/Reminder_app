import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase";

/**
 * REQUIRED ENV VARIABLES
 * These must be set in Vercel Environment Variables
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const VAPID_PUBLIC_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

// Fail fast if env vars are missing (this is GOOD practice)
if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined");
}

if (!VAPID_PUBLIC_KEY) {
  throw new Error("VITE_FIREBASE_VAPID_KEY is not defined");
}

/**
 * Ask for notification permission, get FCM token, send to backend
 * Call this AFTER user logs in (when you have JWT token)
 */
export async function registerForNotifications(authToken) {
  if (!("Notification" in window)) {
    console.log("🔕 Notifications are not supported in this browser.");
    return;
  }

  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("🔕 Notification permission not granted:", permission);
      return;
    }

    const fcmToken = await getToken(messaging, {
      vapidKey: VAPID_PUBLIC_KEY,
    });

    if (!fcmToken) {
      console.log("⚠️ No FCM token received.");
      return;
    }

    console.log("✅ FCM token received");

    // Send FCM token to backend (authenticated)
    await fetch(`${API_BASE_URL}/auth/fcm-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ fcmToken }),
    });

    console.log("✅ FCM token saved on backend");
  } catch (err) {
    console.error("❌ Error registering notifications:", err);
  }
}

/**
 * Listen for foreground messages (when app is open)
 */
export function subscribeToForegroundMessages() {
  onMessage(messaging, (payload) => {
    console.log("📩 Foreground message:", payload);

    const title =
      payload.data?.title ||
      payload.notification?.title ||
      "Reminder";

    const body =
      payload.data?.body ||
      payload.notification?.body ||
      "";

    new Notification(title, { body });
  });
}

