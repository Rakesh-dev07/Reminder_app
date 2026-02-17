import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

export async function sendPushNotification(fcmToken, title, body) {
  if (!fcmToken) return;

  const message = {
    token: fcmToken,
    // 🔥 REQUIRED for Web Push
    data: {
  title: String(title),
  body: String(body),
},

  };

  try {
    await admin.messaging().send(message);
    console.log("✅ Push sent to:", fcmToken);
  } catch (err) {
    console.error("❌ Error sending push:", err);
  }
}


export default admin;
