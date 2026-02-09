# Reminder App

A full-stack reminder application with an Express/MongoDB backend and a React + Vite frontend.

## Project Structure

- `Backend/` — Node.js/Express API server with MongoDB and JWT auth.
- `web/` — React + Vite client application.

## Prerequisites

- Node.js 18+ (or a compatible LTS version)
- npm
- MongoDB instance

## Environment Variables

### Backend (`Backend/.env`)

Create a `.env` file in `Backend/` with the following values:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_oauth_client_id
PORT=5000
```

### Frontend (`web/.env`)

Create a `.env` file in `web/` with the following values:

```
VITE_API_BASE_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

## Install Dependencies

From the repository root:

```
cd Backend
npm install

cd ../web
npm install
```

## Run the App

### Start the backend

```
cd Backend
npm start
```

The API will run on `http://localhost:5000` by default.

### Start the frontend

```
cd web
npm run dev
```

Vite will print the local dev server URL (typically `http://localhost:5173`).

## Notes

- The frontend uses Firebase Cloud Messaging; ensure the Firebase project configuration in `web/src/firebase.js` matches your project.
- Google Sign-In requires matching client IDs in both backend and frontend environment variables.
