import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";

if (!getApps().length) {
  initializeApp({
    credential: cert({
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
  
  const safeReminderId = reminderId ? String(reminderId) : null;

  const dataPayload = safeReminderId
    ? {
        reminderId: safeReminderId,
      }
    : undefined;

  const message = {
     token: fcmToken,
     notification: {
      title: title || "Reminder",
      body: body || "You have a reminder",
    },
      ...(dataPayload ? { data: dataPayload } : {}),

      webpush: {
     ...(safeReminderId
        ? {
            fcmOptions: {
              link: `/#/reminder/${safeReminderId}`,
            },
          }
        : {}),
      notification: {
        title: title || "Reminder",
        body: body || "You have a reminder",
         ...(dataPayload ? { data: dataPayload } : {}),
      },
    },
  };

  try {
    await getMessaging().send(message);
    console.log("✅ Push sent to:", fcmToken);
  } catch (err) {
    console.error("❌ Error sending push:", err);
  }
}
