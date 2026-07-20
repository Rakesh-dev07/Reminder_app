# 🔔 Reminder App

A production-ready full-stack MERN Reminder application that helps users create, manage, and receive reminders with AI-powered natural language input, recurring reminders, browser push notifications, and an interactive calendar.

Built with **React**, **Node.js**, **Express**, **MongoDB**, **Firebase Cloud Messaging (FCM)**, and **JWT Authentication**.

🌐 **Live Demo:** https://reminder-app-rho-eight.vercel.app

👉 Sign in and create reminders to experience real-time browser push notifications.

### Demo Account

Email: `test@example.com`

Password: `123456`

---

# ✨ Features

## 🔐 Authentication

- Email & Password Authentication
- Google OAuth Login
- JWT Authentication
- Protected Routes

---

## 🤖 AI Natural Language Reminder

Create reminders using natural language instead of filling the form manually.

Examples:

- Remind me tomorrow at 9 AM to call Mom
- Every Monday, Wednesday and Friday at 6 AM go to the gym
- Pay rent on the 1st of every month
- Study every day at 8 PM
- First Friday of every month submit report

### AI Workflow

- Parse natural language into structured reminder data
- Understand relative dates such as:
  - Today
  - Tomorrow
  - Next Monday
  - This Friday
- Shows AI confidence score
- Preview parsed reminder
- Review & edit before saving
- Human confirmation before reminder creation

---

## 📅 Reminder Management

- Create reminders
- Edit reminders
- Delete reminders
- Reminder Details page
- Categories
  - Work
  - Personal
  - Study
  - Other
- Date filtering
- Category filtering
- Interactive Calendar

---

## 🔁 Recurring Reminders

Supports:

- One-time reminders
- Daily reminders
- Weekly reminders
- Monthly reminders
- Yearly reminders
- Custom repeat intervals
- Multiple weekday selection
- End by date
- End after number of occurrences
- Never ending reminders

---

## 🔔 Notifications

- Browser Push Notifications
- Firebase Cloud Messaging (FCM)
- Background reminder delivery
- Automatic recurring reminder scheduling

---

## 🎨 User Experience

- Responsive Desktop Layout
- Tablet Optimized Layout
- Mobile Optimized Layout
- Light Theme
- Dark Theme
- AI Quick Add
- Review Reminder Modal
- Sticky Action Footer
- Mobile Collapsible Reminder Form
- Interactive Calendar
- Modern UI

---
<!--

# 📸 Screenshots

## Login

![Login](./screenshots/login.png)

---

## Dashboard

![Dashboard](./screenshots/dashboard-dark.png)

---

## AI Quick Add

![AI Quick Add](./screenshots/ai-preview.png)

---

## Review Reminder

![Review](./screenshots/review-modal.png)

---

## Mobile Layout

![Mobile](./screenshots/mobile.png)
---
-->

# 🏗 Application Architecture

```text
                 React + Vite
                       │
                       │
                REST API (Express)
                       │
                       │
                  MongoDB Database
                       │
        ┌──────────────┴──────────────┐
        │                             │
  Scheduler (node-cron)       AI Reminder Parser
        │                             │
        └──────────────┬──────────────┘
                       │
            Firebase Cloud Messaging
                       │
                       │
          Browser Push Notifications
```

---

# 🛠 Tech Stack

## Frontend

- React
- React Router
- Tailwind CSS
- Vite
- Context API
- Custom Hooks

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- node-cron

## AI

- OpenRouter API
- NVIDIA Nemotron (Free Model)

## Notifications

- Firebase Cloud Messaging
- Firebase Admin SDK

---

# ⚙️ Key Concepts Implemented

- JWT Authentication
- Google OAuth
- Protected Routes
- REST API Design
- Modular Backend Architecture
- Reusable React Components
- Custom React Hooks
- AI-powered Natural Language Parsing
- Human-in-the-loop AI Workflow
- Browser Push Notifications
- Cron-based Reminder Scheduler
- Responsive UI Design
- Theme Management
- Recurring Reminder Engine

---

# 📂 Project Structure

```text
Reminder App
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── scheduler
│   │   ├── services
│   │   └── utils
│   └── package.json
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   ├── services
│   │   ├── utils
│   │   └── assets
│   └── package.json
│
└── README.md
```

---

# 🚀 Run Locally

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend

```bash
cd backend
npm install
npm run dev
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🌐 Environment Variables

## Backend (.env)

```env
MONGO_URI=

JWT_SECRET=

PORT=5000

GOOGLE_CLIENT_ID=

ALLOWED_ORIGINS=

CRON_SECRET=

OPENROUTER_API_KEY=

OPENROUTER_MODEL=

FIREBASE_PROJECT_ID=

FIREBASE_CLIENT_EMAIL=

FIREBASE_PRIVATE_KEY=
```

---

## Frontend (.env)

```env
VITE_API_BASE_URL=

VITE_GOOGLE_CLIENT_ID=

VITE_FIREBASE_VAPID_KEY=
```

---

# 🚀 Future Improvements

- Voice Reminder Input
- AI Reminder Suggestions
- Reminder Analytics Dashboard
- Reminder Sharing
- Email Notifications
- SMS Notifications
- Offline Support (PWA)
- Multiple Calendar Support
- Reminder History
- Timezone-aware Scheduling

---

# 📌 What I Learned

This project helped strengthen my understanding of:

- Building production-style MERN applications
- Authentication using JWT & Google OAuth
- Designing reusable React components
- Creating custom React hooks
- Responsive UI design
- AI integration with structured JSON responses
- Building a recurring scheduling engine
- Background processing with node-cron
- Browser Push Notifications using Firebase Cloud Messaging
- REST API design
- State management in React
- Theme management (Light/Dark Mode)

---

# 👨‍💻 Author

**Rakesh Yadav**

- GitHub: https://github.com/Rakesh-dev07
- LinkedIn: https://www.linkedin.com/in/contact-rakesh-yadav
- Portfolio: https://portfolio-red-three-22.vercel.app

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.