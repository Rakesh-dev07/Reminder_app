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

firebase.messaging();

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const reminderId = event.notification?.data?.reminderId;

  if (!reminderId) {
    return;
  }

  const urlToOpen = new URL(`/reminder/${reminderId}`, self.location.origin).href;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
         if ("focus" in client) {
          client.navigate(urlToOpen);
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
