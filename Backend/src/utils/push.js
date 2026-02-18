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

export async function sendPushNotification(
  fcmToken,
  title,
  body,
  reminderId
) {
  if (!fcmToken) return;
  
  const safeReminderId = reminderId?.toString();

  const message = {
     token: fcmToken,
     notification: {
      title: title || "Reminder",
      body: body || "You have a reminder",
    },
     data: {
      reminderId: safeReminderId,
    },

      webpush: {
      fcmOptions: {
        link: `/reminder/${safeReminderId}`,
      },
      notification: {
        title: title || "Reminder",
        body: body || "You have a reminder",
        data: {
          reminderId: safeReminderId,
        },
      },
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
