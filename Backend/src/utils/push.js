import admin from "firebase-admin";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

// Load service account JSON
const serviceAccount = require("../../firebase-service-account.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function sendPushNotification(fcmToken, title, body) {
  if (!fcmToken) return;

  const message = {
    token: fcmToken,
    notification: {
      title,
      body,
    },
  };

  try {
    await admin.messaging().send(message);
    console.log("✅ Push sent to", fcmToken);
  } catch (err) {
    console.error("❌ Error sending push:", err);
  }
}
