# 🔔 Reminder App

A full-stack MERN application that allows users to create, manage, and receive real-time notifications for reminders using browser push notifications.

🌐 **Live Demo:** https://reminder-app-rho-eight.vercel.app  

👉 Sign in and create reminders to experience real-time push notifications.

**Demo Account:**  
Email: test@example.com  
Password: 123456  

<!-- ## 🚀 Live Demo https://reminder-app-rho-eight.vercel.app -->
---
<!-- ---

## 📸 Screenshots

### 🔐 Login Page

![Login](./screenshots/login.png)

### 🏠 Dashboard / Reminders

![Dashboard](./screenshots/dashboard.png)

### 📅 Calendar View

![Calendar](./screenshots/calendar.png)

### ➕ Add Reminder

![Add Reminder](./screenshots/add.png)

> 📌 Create a `screenshots/` folder in your project root and add images there.

--- -->

## 🚀 Features

* User authentication (Email/Password + Google OAuth)
* Create, edit, delete reminders
* Filter reminders by category and date
* Calendar-based reminder navigation
* Real-time browser push notifications (Firebase)
* Protected routes using JWT authentication

---

## 🛠 Tech Stack

### Frontend

* React (Hooks, Context API)
* React Router
* Tailwind CSS
* Vite

### Backend

* Node.js + Express
* MongoDB + Mongoose
* JWT Authentication
* bcrypt (password hashing)

### Notifications

* Firebase Cloud Messaging (FCM)
* Firebase Admin SDK

---

## ⚙️ Key Concepts Implemented

* Token-based authentication using JWT
* Secure password hashing with bcrypt
* RESTful API design
* Protected API routes
* Cron-based reminder dispatch system
* Push notification system using FCM
* Data normalization for reminders

---

## 📂 Project Structure
```text
Reminder_app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── Utils/
│   └── package.json
└── README.md
```

---

## 🧪 Run Locally

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

---

## 🌐 Environment Variables

### Backend (.env)

```env
MONGO_URI=
JWT_SECRET=
GOOGLE_CLIENT_ID=
PORT=5000
ALLOWED_ORIGINS=
CRON_SECRET=
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

### Frontend (.env)

```env
VITE_API_BASE_URL=
VITE_GOOGLE_CLIENT_ID=
VITE_FIREBASE_VAPID_KEY=
```

---

## 📌 Summary

This project demonstrates building a production-style full-stack application with authentication, API security, and real-time push notification integration.
