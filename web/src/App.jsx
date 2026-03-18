import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Home from "./pages/Home";
import ReminderDetails from "./pages/ReminderDetails";
import UpcomingReminders from "./pages/UpcomingReminders";
import AllReminders from "./pages/AllReminders";

// 🔐 Protected Route
function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        Loading...
      </div>
    );
  }

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* Home (MAIN PAGE) */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          {/* Other pages */}
          <Route
            path="/upcoming"
            element={
              <PrivateRoute>
                <UpcomingReminders />
              </PrivateRoute>
            }
          />

          <Route
            path="/all"
            element={
              <PrivateRoute>
                <AllReminders />
              </PrivateRoute>
            }
          />

          <Route
            path="/reminder/:id"
            element={
              <PrivateRoute>
                <ReminderDetails />
              </PrivateRoute>
            }
          />

          {/* Public */}
          <Route path="/login" element={<Login />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}