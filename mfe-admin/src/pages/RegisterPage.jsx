import React, { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import API_URL from "../config";

export default function RegisterPage({ onBackToLogin }) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    username:  "",
    email:     "",
    password:  "",
    confirm:   "",
    secretKey: "",
  });
  const [status,  setStatus]  = useState("idle");
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState(false);

  const update = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleRegister = async () => {
    if (!formData.username.trim()) {
      setError(language === "fi" ? "Kayttajanimi on pakollinen" : "Username is required");
      return;
    }
    if (!formData.email.trim()) {
      setError(language === "fi" ? "Sahkoposti on pakollinen" : "Email is required");
      return;
    }
    if (formData.password.length < 6) {
      setError(language === "fi"
        ? "Salasanan on oltava vahintaan 6 merkkia"
        : "Password must be at least 6 characters"
      );
      return;
    }
    if (formData.password !== formData.confirm) {
      setError(language === "fi" ? "Salasanat eivat tasmaa" : "Passwords do not match");
      return;
    }
    if (!formData.secretKey.trim()) {
      setError(language === "fi"
        ? "Rekisteroinnin avain on pakollinen"
        : "Registration key is required"
      );
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username:  formData.username,
          email:     formData.email,
          password:  formData.password,
          secretKey: formData.secretKey,
        }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      setSuccess(true);

    } catch (err) {
      setError(err.message);
    } finally {
      setStatus("idle");
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
    marginBottom: "16px",
  };

  const labelStyle = {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "6px",
  };

  // ✅ Success screen
  if (success) {
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
          padding: "48px 40px",
          maxWidth: "420px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        }}>
          <div style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "#f0fdf9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.5rem",
            margin: "0 auto 24px",
            border: "3px solid #99f6e0",
          }}>
            {"✅"}
          </div>
          <h2 style={{
            fontSize: "22px",
            fontWeight: "800",
            color: "#134e4a",
            marginBottom: "12px",
          }}>
            {language === "fi"
              ? "Tili luotu onnistuneesti!"
              : "Account created successfully!"
            }
          </h2>
          <p style={{
            fontSize: "14px",
            color: "#6b7280",
            marginBottom: "28px",
            lineHeight: "1.6",
          }}>
            {language === "fi"
              ? "Voit nyt kirjautua sisaan omilla tunnuksillasi."
              : "You can now login with your own credentials."
            }
          </p>
          <button
            onClick={onBackToLogin}
            style={{
              width: "100%",
              backgroundColor: "#14b8a6",
              color: "white",
              fontSize: "15px",
              fontWeight: "700",
              padding: "14px 32px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(20,184,166,0.3)",
            }}
          >
            {language === "fi" ? "Kirjaudu sisaan" : "Go to Login"}
          </button>
        </div>
      </div>
    );
  }

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
        maxWidth: "440px",
        width: "100%",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
      }}>

        {/* ✅ Logo + Title */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <svg width="52" height="52" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ margin: "0 auto 12px" }}>
            <rect x="0" y="0" width="200" height="200" rx="36" fill="#134e4a"/>
            <rect x="144" y="8" width="44" height="44" rx="22" fill="#0d9488" opacity="0.5"/>
            <text x="100" y="110" fontFamily="ui-sans-serif" fontSize="72" fontWeight="700" fill="white" textAnchor="middle">J&amp;S</text>
            <text x="100" y="150" fontFamily="ui-sans-serif" fontSize="22" fontWeight="600" fill="#5eead4" textAnchor="middle" letterSpacing="4">PALVELUT</text>
          </svg>
          <h1 style={{
            fontSize: "22px",
            fontWeight: "800",
            color: "#134e4a",
            marginBottom: "6px",
          }}>
            {language === "fi" ? "Luo yllapitajatili" : "Create Admin Account"}
          </h1>
          <p style={{ fontSize: "13px", color: "#6b7280" }}>
            {language === "fi"
              ? "Rekisteroi oma tili hallintapaneeliin"
              : "Register your own admin account"
            }
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
            {"❌"} {error}
          </div>
        )}

        {/* ✅ Username */}
        <label style={labelStyle}>
          {language === "fi" ? "Kayttajanimi" : "Username"}
          <span style={{ color: "#ef4444", marginLeft: "4px" }}>{"*"}</span>
        </label>
        <input
          type="text"
          value={formData.username}
          onChange={e => update("username", e.target.value)}
          placeholder={language === "fi" ? "esim. jamanta" : "e.g. jamanta"}
          style={inputStyle}
        />

        {/* ✅ Email */}
        <label style={labelStyle}>
          {language === "fi" ? "Sahkoposti" : "Email"}
          <span style={{ color: "#ef4444", marginLeft: "4px" }}>{"*"}</span>
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={e => update("email", e.target.value)}
          placeholder="your@email.com"
          style={inputStyle}
        />

        {/* ✅ Password */}
        <label style={labelStyle}>
          {language === "fi" ? "Salasana" : "Password"}
          <span style={{ color: "#ef4444", marginLeft: "4px" }}>{"*"}</span>
        </label>
        <input
          type="password"
          value={formData.password}
          onChange={e => update("password", e.target.value)}
          placeholder={language === "fi" ? "Vahintaan 6 merkkia" : "At least 6 characters"}
          style={inputStyle}
        />

        {/* ✅ Confirm password */}
        <label style={labelStyle}>
          {language === "fi" ? "Vahvista salasana" : "Confirm Password"}
          <span style={{ color: "#ef4444", marginLeft: "4px" }}>{"*"}</span>
        </label>
        <input
          type="password"
          value={formData.confirm}
          onChange={e => update("confirm", e.target.value)}
          placeholder={language === "fi" ? "Toista salasana" : "Repeat password"}
          style={inputStyle}
        />

        {/* ✅ Secret key */}
        <label style={labelStyle}>
          {language === "fi" ? "Rekisteroinnin avain" : "Registration Key"}
          <span style={{ color: "#ef4444", marginLeft: "4px" }}>{"*"}</span>
        </label>
        <input
          type="password"
          value={formData.secretKey}
          onChange={e => update("secretKey", e.target.value)}
          placeholder={language === "fi" ? "Syota salainen avain" : "Enter secret key"}
          style={inputStyle}
        />
        <p style={{
          fontSize: "12px",
          color: "#6b7280",
          marginTop: "-10px",
          marginBottom: "20px",
        }}>
          {language === "fi"
            ? "Pyydä rekisteröintiavain kehittäjältä."
            : "Ask the developer for the registration key."
          }
        </p>

        {/* ✅ Register button */}
        <button
          onClick={handleRegister}
          disabled={status === "loading"}
          style={{
            width: "100%",
            backgroundColor: status === "loading" ? "#5eead4" : "#14b8a6",
            color: "white",
            fontSize: "15px",
            fontWeight: "700",
            padding: "14px 24px",
            borderRadius: "12px",
            border: "none",
            cursor: status === "loading" ? "not-allowed" : "pointer",
            boxShadow: "0 4px 12px rgba(20,184,166,0.3)",
            marginBottom: "12px",
          }}
        >
          {status === "loading"
            ? (language === "fi" ? "⏳ Luodaan..." : "⏳ Creating...")
            : (language === "fi" ? "✅ Luo tili" : "✅ Create Account")
          }
        </button>

        {/* ✅ Back to login */}
        <button
          onClick={onBackToLogin}
          style={{
            width: "100%",
            backgroundColor: "transparent",
            color: "#6b7280",
            fontSize: "14px",
            fontWeight: "500",
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            cursor: "pointer",
          }}
        >
          {language === "fi" ? "← Takaisin kirjautumiseen" : "← Back to Login"}
        </button>

      </div>
    </div>
  );
}