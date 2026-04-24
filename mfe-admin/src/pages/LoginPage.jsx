import React, { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function LoginPage({ onLogin, onShowRegister }) {
  const { language } = useLanguage();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError(language === "fi"
        ? "Kayttajanimi ja salasana ovat pakollisia"
        : "Username and password are required"
      );
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.message);

      localStorage.setItem("adminToken", data.token);
      window.dispatchEvent(new Event("storage"));
      onLogin();

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1.5px solid #e5e7eb",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "Inter, sans-serif",
    backgroundColor: "white",
    color: "#1f2937",
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f0fdf9",
      padding: "24px",
    }}>
      <div style={{
        backgroundColor: "white",
        borderRadius: "24px",
        padding: "40px",
        maxWidth: "420px",
        width: "100%",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
      }}>

        {/* Logo + Title */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <svg
            width="52"
            height="52"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            style={{ margin: "0 auto 16px", display: "block" }}
          >
            <rect x="0" y="0" width="200" height="200" rx="36" fill="#134e4a"/>
            <rect x="144" y="8" width="44" height="44" rx="22" fill="#0d9488" opacity="0.5"/>
            <text
              x="100" y="110"
              fontFamily="ui-sans-serif,system-ui,sans-serif"
              fontSize="72"
              fontWeight="700"
              fill="white"
              textAnchor="middle"
            >
              J&amp;S
            </text>
            <text
              x="100" y="150"
              fontFamily="ui-sans-serif,system-ui,sans-serif"
              fontSize="22"
              fontWeight="600"
              fill="#5eead4"
              textAnchor="middle"
              letterSpacing="4"
            >
              PALVELUT
            </text>
          </svg>

          <h1 style={{
            fontSize: "22px",
            fontWeight: "800",
            color: "#134e4a",
            marginBottom: "6px",
          }}>
            {language === "fi" ? "Hallintapaneeli" : "Admin Panel"}
          </h1>
          <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
            {"🔒"} {language === "fi"
              ? "Vain valtuutetuille henkiloille"
              : "Authorized personnel only"
            }
          </p>
        </div>

        {/* Error message */}
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
            {"❌"} {error}
          </div>
        )}

        {/* Username */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{
            display: "block",
            fontSize: "13px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "6px",
          }}>
            {language === "fi" ? "Kayttajanimi" : "Username"}
          </label>
          <input
            type="text"
            value={username}
            onChange={e => { setUsername(e.target.value); setError(""); }}
            placeholder={language === "fi" ? "Kayttajanimesi" : "Your username"}
            style={inputStyle}
            onFocus={e => e.target.style.border = "1.5px solid #14b8a6"}
            onBlur={e => e.target.style.border = "1.5px solid #e5e7eb"}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{
            display: "block",
            fontSize: "13px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "6px",
          }}>
            {language === "fi" ? "Salasana" : "Password"}
          </label>
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(""); }}
            placeholder={language === "fi" ? "Salasanasi" : "Your password"}
            style={inputStyle}
            onFocus={e => e.target.style.border = "1.5px solid #14b8a6"}
            onBlur={e => e.target.style.border = "1.5px solid #e5e7eb"}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />
        </div>

        {/* Login button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            backgroundColor: loading ? "#5eead4" : "#14b8a6",
            color: "white",
            fontSize: "15px",
            fontWeight: "700",
            padding: "14px 24px",
            borderRadius: "12px",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 4px 12px rgba(20,184,166,0.3)",
            marginBottom: "12px",
          }}
        >
          {loading
            ? (language === "fi" ? "Kirjaudutaan..." : "Logging in...")
            : (language === "fi" ? "Kirjaudu sisaan" : "Login")
          }
        </button>

        {/* Register link */}
        <button
          onClick={onShowRegister}
          style={{
            width: "100%",
            backgroundColor: "transparent",
            color: "#0d9488",
            fontSize: "14px",
            fontWeight: "600",
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #99f6e0",
            cursor: "pointer",
          }}
        >
          {language === "fi"
            ? "Luo uusi yllapitajatili"
            : "Create new admin account"
          }
        </button>

      </div>
    </div>
  );
}


