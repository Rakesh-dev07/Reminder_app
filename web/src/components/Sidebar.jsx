import React from "react";
import { FiHome, FiUser, FiSettings, FiLogOut, FiX } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, onClose, user, logout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { name: "Profile", icon: <FiUser />, path: "/profile" },
    { name: "Settings", icon: <FiSettings />, path: "/settings" },
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

          {/* User */}
          <div className="mt-4 border-b pb-4">
            <p className="text-sm text-slate-500">Logged in as</p>
            <p className="font-semibold">
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