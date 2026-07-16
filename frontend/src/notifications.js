import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase";

const resolveApiBaseUrl = () => {
  const envBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

   if (envBaseUrl) {
    return envBaseUrl.replace(/\/$/, "");
  }

  if (typeof window !== "undefined") {
    const { hostname, origin } = window.location;

    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return "http://localhost:3000";
    }

    return origin.replace(/\/$/, "");
  }

  throw new Error("Unable to resolve API base URL");
};

const API_BASE_URL = resolveApiBaseUrl();
const VAPID_PUBLIC_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

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

    const title = payload?.data?.title || "Reminder";
    const body = payload?.data?.body || "You have a reminder";

    if (Notification.permission === "granted") {
      new Notification(title, {
        body,
        icon: "/favicon.ico",
        badge: "/favicon.ico",
      });
    }
  });
}


