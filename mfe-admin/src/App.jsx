import React, { useState, useEffect } from "react";
import LoginPage     from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

// ✅ Shell loads this as: import("mfeAdmin/AdminApp")
export default function App() {
  // ✅ Check if admin is already logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check localStorage for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) setIsLoggedIn(true);
  }, []);

  // ✅ Handle login
  const handleLogin = () => setIsLoggedIn(true);

  // ✅ Handle logout — clear token and go back to login
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
  };

  return (
    <>
      {isLoggedIn ? (
        // ✅ Show dashboard if logged in
        <DashboardPage onLogout={handleLogout} />
      ) : (
        // ✅ Show login if not authenticated
        <LoginPage onLogin={handleLogin} />
      )}
    </>
  );
}