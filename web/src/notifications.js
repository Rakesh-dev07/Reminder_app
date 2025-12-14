import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase";

// Put your public VAPID key here (from Firebase Cloud Messaging → Web push certificates)
const VAPID_PUBLIC_KEY = "BL7swfTqBXUIJqoj1eFRpBN4mp1ZVA2CMo0SNZO41IGI3k_edMh-qjmqITp7zTm0lbLKt_uc7qeej798JPb5RRw";

/**
 * Ask for notification permission, get FCM token, send to backend
 * Call this AFTER user logs in (when you have JWT token)
 */
export async function registerForNotifications(authToken) {
  if (!("Notification" in window)) {
    console.log("Notifications are not supported in this browser.");
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.log("Notification permission not granted:", permission);
    return;
  }

  try {
    const fcmToken = await getToken(messaging, {
      vapidKey: VAPID_PUBLIC_KEY,
    });

    if (!fcmToken) {
      console.log("No FCM token received (maybe permission denied).");
      return;
    }

    console.log("✅ FCM token:", fcmToken);

    // Send token to backend so we can send reminders to this device
    await fetch("http://localhost:5000/auth/fcm-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`, // JWT from login
      },
      body: JSON.stringify({ fcmToken }),
    });

    console.log("✅ FCM token saved on backend");
  } catch (err) {
    console.error("❌ Error getting FCM token:", err);
  }
}

/**
 * Listen to foreground messages (when app is open)
 * You can show a toast or alert here
 */
export function subscribeToForegroundMessages() {
  onMessage(messaging, (payload) => {
    console.log("📩 Foreground message:", payload);
    // later: show toast notification in UI
  });
}
