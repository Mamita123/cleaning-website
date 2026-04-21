import React, { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName:  "J & S Palvelut Oy",
    email:        "info@jspalvelut.fi",
    phone:        "+358 451 812 636",
    address:      "Kankarepolku 5 H 451, 00770 Helsinki",
    workingHours: "Mon–Fri: 8am–6pm, Sat: 9am–3pm",
    currency:     "€",
    language:     "English / Finnish",
  });

  const [passwords, setPasswords] = useState({
    current: "", newPass: "", confirm: "",
  });

  const [saved,   setSaved]   = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [pwError, setPwError] = useState("");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePasswordChange = () => {
    setPwError("");
    if (passwords.newPass !== passwords.confirm) {
      setPwError("New passwords do not match!");
      return;
    }
    if (passwords.newPass.length < 6) {
      setPwError("Password must be at least 6 characters");
      return;
    }
    setPwSaved(true);
    setPasswords({ current: "", newPass: "", confirm: "" });
    setTimeout(() => setPwSaved(false), 3000);
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1.5px solid var(--input-border)",
    fontSize: "14px",
    color: "var(--text-primary)",
    backgroundColor: "var(--bg-primary)",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "Inter, sans-serif",
  };

  const labelStyle = {
    fontSize: "13px",
    fontWeight: "600",
    color: "var(--text-primary)",
    display: "block",
    marginBottom: "6px",
  };

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{
          fontSize: "28px",
          fontWeight: "800",
          color: "var(--text-heading)",
          marginBottom: "4px",
        }}>
          {"⚙️"} {t.settingsTitle}
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
          {t.settingsDesc}
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "24px",
      }}>

        {/* ✅ Company settings */}
        <div style={{
          backgroundColor: "var(--bg-card)",
          borderRadius: "20px",
          padding: "28px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          border: "1px solid var(--border-color)",
        }}>
          <h2 style={{
            fontSize: "18px",
            fontWeight: "700",
            color: "var(--text-heading)",
            marginBottom: "20px",
          }}>
            🏢 Company Information
          </h2>

          {saved && (
            <div style={{
              backgroundColor: "#f0fdf9",
              border: "1px solid #99f6e0",
              borderRadius: "10px",
              padding: "10px 16px",
              marginBottom: "16px",
              fontSize: "13px",
              color: "#0f766e",
              fontWeight: "600",
            }}>
              ✅ Settings saved successfully!
            </div>
          )}

          {[
            { label: "Company Name", key: "companyName", type: "text" },
            { label: "Email",        key: "email",       type: "email" },
            { label: "Phone",        key: "phone",       type: "tel" },
            { label: "Address",      key: "address",     type: "text" },
            { label: "Working Hours", key: "workingHours", type: "text" },
          ].map(field => (
            <div key={field.key} style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>{field.label}</label>
              <input
                type={field.type}
                value={settings[field.key]}
                onChange={e => setSettings(p => ({
                  ...p, [field.key]: e.target.value
                }))}
                style={inputStyle}
              />
            </div>
          ))}

          <button
            onClick={handleSave}
            style={{
              width: "100%",
              backgroundColor: "#14b8a6",
              color: "white",
              fontSize: "14px",
              fontWeight: "700",
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(20,184,166,0.3)",
            }}
          >
            💾 Save Settings
          </button>
        </div>

        {/* ✅ Password change */}
        <div style={{
          backgroundColor: "var(--bg-card)",
          borderRadius: "20px",
          padding: "28px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          border: "1px solid var(--border-color)",
        }}>
          <h2 style={{
            fontSize: "18px",
            fontWeight: "700",
            color: "var(--text-heading)",
            marginBottom: "20px",
          }}>
            🔐 Change Password
          </h2>

          {pwSaved && (
            <div style={{
              backgroundColor: "#f0fdf9",
              border: "1px solid #99f6e0",
              borderRadius: "10px",
              padding: "10px 16px",
              marginBottom: "16px",
              fontSize: "13px",
              color: "#0f766e",
              fontWeight: "600",
            }}>
              ✅ Password changed successfully!
            </div>
          )}

          {pwError && (
            <div style={{
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "10px",
              padding: "10px 16px",
              marginBottom: "16px",
              fontSize: "13px",
              color: "#dc2626",
            }}>
              ❌ {pwError}
            </div>
          )}

          {[
            { label: "Current Password", key: "current" },
            { label: "New Password",     key: "newPass" },
            { label: "Confirm Password", key: "confirm" },
          ].map(field => (
            <div key={field.key} style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>{field.label}</label>
              <input
                type="password"
                value={passwords[field.key]}
                onChange={e => setPasswords(p => ({
                  ...p, [field.key]: e.target.value
                }))}
                placeholder="••••••••"
                style={inputStyle}
              />
            </div>
          ))}

          <button
            onClick={handlePasswordChange}
            style={{
              width: "100%",
              backgroundColor: "#134e4a",
              color: "white",
              fontSize: "14px",
              fontWeight: "700",
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
            }}
          >
            🔐 Change Password
          </button>
        </div>

        {/* ✅ System info */}
        <div style={{
          backgroundColor: "var(--bg-card)",
          borderRadius: "20px",
          padding: "28px",
          border: "1px solid var(--border-color)",
        }}>
          <h2 style={{
            fontSize: "18px",
            fontWeight: "700",
            color: "var(--text-heading)",
            marginBottom: "20px",
          }}>
            ℹ️ System Info
          </h2>
          {[
            { label: "Version",   value: "1.0.0" },
            { label: "Database",  value: "PostgreSQL (Neon)" },
            { label: "Frontend",  value: "React + Module Federation" },
            { label: "Backend",   value: "Node.js + Express" },
            { label: "Deployed",  value: "Local Development" },
          ].map(item => (
            <div key={item.label} style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid var(--border-color)",
              fontSize: "14px",
            }}>
              <span style={{ color: "var(--text-secondary)", fontWeight: "500" }}>
                {item.label}
              </span>
              <span style={{ color: "#0d9488", fontWeight: "600" }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}