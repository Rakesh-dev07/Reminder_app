import React from "react";
import {
  FiHome,
  FiClock,
  FiList,
  FiLogOut,
  FiX,
} from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, onClose, user, logout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Generate initials for avatar fallback
  const getInitials = () => {
    if (user?.username) return user.username.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  const menuItems = [
    { name: "Home", icon: <FiHome />, path: "/" },
    {
      name: "Upcoming Reminders",
      icon: <FiClock />,
      path: "/upcoming",
    },
    {
      name: "All Reminders",
      icon: <FiList />,
      path: "/all",
    },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-slate-900 shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex flex-col h-full">
          
          {/* Close */}
          <button onClick={onClose} className="self-end text-xl">
            <FiX />
          </button>

          {/* Avatar + User */}
          <div className="mt-4 flex flex-col items-center border-b pb-4">
            <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-semibold">
              {getInitials()}
            </div>
            <p className="mt-2 font-medium">
              {user?.username || user?.email}
            </p>
          </div>

          {/* Navigation */}
          <div className="mt-4 flex-1 space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    onClose();
                  }}
                  className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;