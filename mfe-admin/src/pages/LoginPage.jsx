import React, { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: "", password: "",
  });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        window.dispatchEvent(new Event("storage"));
        onLogin();
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch {
      setError("Cannot connect to server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "var(--bg-primary)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
    }}>
      <div style={{
        backgroundColor: "var(--bg-card)",
        borderRadius: "24px",
        padding: "48px 40px",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        border: "1px solid var(--border-color)",
      }}>

        {/* ✅ Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <span style={{ fontSize: "3rem" }}>🧹</span>
          <h1 style={{
            fontSize: "24px",
            fontWeight: "800",
            color: "var(--text-heading)",
            marginTop: "12px",
            marginBottom: "4px",
          }}>
            Admin Login
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
            J & S Palvelut Management Panel
          </p>
        </div>

        {/* ✅ Error */}
        {error && (
          <div style={{
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "10px",
            padding: "12px 16px",
            marginBottom: "20px",
            fontSize: "13px",
            color: "#dc2626",
          }}>
            ❌ {error}
          </div>
        )}

        {/* ✅ Form */}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{
              fontSize: "13px",
              fontWeight: "600",
              color: "var(--text-primary)",
              display: "block",
              marginBottom: "6px",
            }}>
              Username
            </label>
            <input
              type="text"
              value={credentials.username}
              onChange={e => setCredentials(p => ({
                ...p, username: e.target.value
              }))}
              placeholder="admin"
              required
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1.5px solid var(--input-border)",
                fontSize: "14px",
                color: "var(--text-primary)",
                backgroundColor: "var(--bg-primary)",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "Inter, sans-serif",
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{
              fontSize: "13px",
              fontWeight: "600",
              color: "var(--text-primary)",
              display: "block",
              marginBottom: "6px",
            }}>
              Password
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={e => setCredentials(p => ({
                ...p, password: e.target.value
              }))}
              placeholder="••••••••"
              required
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1.5px solid var(--input-border)",
                fontSize: "14px",
                color: "var(--text-primary)",
                backgroundColor: "var(--bg-primary)",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "Inter, sans-serif",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: loading ? "#5eead4" : "#14b8a6",
              color: "white",
              fontSize: "15px",
              fontWeight: "700",
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 12px rgba(20,184,166,0.3)",
            }}
          >
            {loading ? "⏳ Logging in..." : "🔐 Login to Dashboard"}
          </button>
        </form>

        {/* ✅ Demo hint */}
        <div style={{
          marginTop: "20px",
          padding: "12px 16px",
          backgroundColor: "var(--bg-primary)",
          borderRadius: "10px",
          fontSize: "12px",
          color: "var(--text-secondary)",
          textAlign: "center",
          border: "1px solid var(--border-color)",
        }}>
          Demo: <strong style={{ color: "var(--text-primary)" }}>admin</strong>
          {" / "}
          <strong style={{ color: "var(--text-primary)" }}>admin123</strong>
        </div>

      </div>
    </div>
  );
}