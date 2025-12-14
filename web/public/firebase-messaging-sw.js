/* eslint-disable no-undef */

// Use compat build in the service worker
importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js");

// Same config as in src/firebase.js
firebase.initializeApp({
  apiKey: "AIzaSyAMPmIrHqEU8C9jLKyYYr8UezWmeuGHc3A",
  authDomain: "reminder-app-128d2.firebaseapp.com",
  projectId: "reminder-app-128d2",
  storageBucket: "reminder-app-128d2.firebasestorage.app",
  messagingSenderId: "988350928452",
  appId: "1:988350928452:web:30d24d01e04b81bd9cce11"
});

const messaging = firebase.messaging();

// Called when a message arrives while app is CLOSED or in BACKGROUND
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);

  const notificationTitle = payload.notification?.title || "Reminder";
  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: "/favicon.ico", // later we can use custom icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
