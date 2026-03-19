import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAMPmIrHqEU8C9jLKyYYr8UezWmeuGHc3A",
  authDomain: "reminder-app-128d2.firebaseapp.com",
  projectId: "reminder-app-128d2",
  storageBucket: "reminder-app-128d2.firebasestorage.app",
  messagingSenderId: "988350928452",
  appId: "1:988350928452:web:30d24d01e04b81bd9cce11"
};
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { app, messaging };
