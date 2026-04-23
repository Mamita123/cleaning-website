import React, { useState, useEffect } from "react";
import LoginPage     from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading,    setLoading]    = useState(true);

  // ✅ Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setIsLoggedIn(!!token);
    setLoading(false);
  }, []);

  // ✅ Listen for storage changes
  useEffect(() => {
    const handleStorage = () => {
      const token = localStorage.getItem("adminToken");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("storage", handleStorage);
    const interval = setInterval(handleStorage, 1000);

    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // ✅ Remove token
    localStorage.removeItem("adminToken");
    // ✅ Update state immediately
    setIsLoggedIn(false);
    // ✅ Notify shell navbar
    window.dispatchEvent(new Event("storage"));
    // ✅ Redirect to homepage
    window.location.href = "http://localhost:3000";
  };

  // ✅ Show nothing while checking token
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--bg-primary)",
        fontSize: "16px",
        color: "#0d9488",
      }}>
        ⏳ Loading...
      </div>
    );
  }

  return (
    <>
      {isLoggedIn
        ? <DashboardPage onLogout={handleLogout} />
        : <LoginPage onLogin={handleLogin} />
      }
    </>
  );
}