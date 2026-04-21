import React, { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";

function FormField({ label, type = "text", name, value, onChange, placeholder, required, rows }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={{
        display: "block",
        fontSize: "14px",
        fontWeight: "600",
        color: "var(--text-primary)",
        marginBottom: "6px",
      }}>
        {label}
        {required && (
          <span style={{ color: "#ef4444", marginLeft: "4px" }}>{"*"}</span>
        )}
      </label>

      {rows ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          required={required}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: "10px",
            border: "1.5px solid var(--input-border)",
            fontSize: "14px",
            color: "var(--text-primary)",
            backgroundColor: "var(--bg-primary)",
            outline: "none",
            resize: "vertical",
            fontFamily: "Inter, sans-serif",
            transition: "border 0.15s",
            boxSizing: "border-box",
          }}
          onFocus={e => e.target.style.border = "1.5px solid #14b8a6"}
          onBlur={e => e.target.style.border = "1.5px solid var(--input-border)"}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: "10px",
            border: "1.5px solid var(--input-border)",
            fontSize: "14px",
            color: "var(--text-primary)",
            backgroundColor: "var(--bg-primary)",
            outline: "none",
            fontFamily: "Inter, sans-serif",
            transition: "border 0.15s",
            boxSizing: "border-box",
          }}
          onFocus={e => e.target.style.border = "1.5px solid #14b8a6"}
          onBlur={e => e.target.style.border = "1.5px solid var(--input-border)"}
        />
      )}
    </div>
  );
}

export default function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service: "", message: "",
  });
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim())    newErrors.name    = t.nameRequired;
    if (!formData.email.trim())   newErrors.email   = t.emailRequired;
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t.emailRequired;
    if (!formData.message.trim()) newErrors.message = t.yourMessage;
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStatus("loading");
    try {
      const response = await fetch("http://localhost:5000/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section style={{ padding: "72px 24px", backgroundColor: "var(--bg-primary)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "48px",
          alignItems: "start",
        }}>

          {/* ✅ Left — Form */}
          <div style={{
            backgroundColor: "var(--bg-card)",
            borderRadius: "24px",
            padding: "40px 36px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
            border: "1px solid var(--border-color)",
          }}>
            <h2 style={{
              fontSize: "24px",
              fontWeight: "800",
              color: "var(--text-heading)",
              marginBottom: "8px",
            }}>
              {t.sendMessage}
            </h2>
            <p style={{
              fontSize: "14px",
              color: "var(--text-secondary)",
              marginBottom: "32px",
              lineHeight: "1.6",
            }}>
              {t.formSubtitle}
            </p>

            {/* ✅ Success */}
            {status === "success" && (
              <div style={{
                backgroundColor: "#f0fdf9",
                border: "1.5px solid #99f6e0",
                borderRadius: "12px",
                padding: "16px 20px",
                marginBottom: "24px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}>
                <span style={{ fontSize: "20px" }}>✅</span>
                <div>
                  <div style={{ fontWeight: "700", color: "#0f766e", fontSize: "14px" }}>
                    {t.successMsg}
                  </div>
                  <div style={{ color: "#0d9488", fontSize: "13px" }}>
                    {t.successSub}
                  </div>
                </div>
              </div>
            )}

            {/* ✅ Error */}
            {status === "error" && (
              <div style={{
                backgroundColor: "#fef2f2",
                border: "1.5px solid #fecaca",
                borderRadius: "12px",
                padding: "16px 20px",
                marginBottom: "24px",
              }}>
                <div style={{ fontWeight: "600", color: "#dc2626", fontSize: "14px" }}>
                  {"❌"} {t.errorMsg}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>

              {/* ✅ Name + Email row */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
              }}>
                <div>
                  <FormField
                    label={t.fullName} name="name"
                    value={formData.name} onChange={handleChange}
                    placeholder={t.namePlaceholder} required
                  />
                  {errors.name && (
                    <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "-14px", marginBottom: "12px" }}>
                      {errors.name}
                    </div>
                  )}
                </div>
                <div>
                  <FormField
                    label={t.emailAddr} type="email" name="email"
                    value={formData.email} onChange={handleChange}
                    placeholder={t.emailPlaceholder} required
                  />
                  {errors.email && (
                    <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "-14px", marginBottom: "12px" }}>
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>

              {/* ✅ Phone */}
              <FormField
                label={t.phoneOpt} type="tel" name="phone"
                value={formData.phone} onChange={handleChange}
                placeholder={t.phonePlaceholder}
              />

              {/* ✅ Service selector */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "var(--text-primary)",
                  marginBottom: "6px",
                }}>
                  {t.serviceInterest}
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    border: "1.5px solid var(--input-border)",
                    fontSize: "14px",
                    color: "var(--text-primary)",
                    backgroundColor: "var(--bg-primary)",
                    outline: "none",
                    fontFamily: "Inter, sans-serif",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="">{t.selectService}</option>
                  <option value="regular">{t.homeClean}</option>
                  <option value="deep">{t.deepClean}</option>
                  <option value="office">{t.officeClean}</option>
                  <option value="moveinout">{t.moveInOut}</option>
                  <option value="eco">{t.ecoFriendly}</option>
                  <option value="window">{t.windowCleaning}</option>
                  <option value="other">{t.otherService}</option>
                </select>
              </div>

              {/* ✅ Message */}
              <FormField
                label={t.yourMessage} name="message"
                value={formData.message} onChange={handleChange}
                placeholder={t.notesPlaceholder} required rows={5}
              />
              {errors.message && (
                <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "-14px", marginBottom: "12px" }}>
                  {errors.message}
                </div>
              )}

              {/* ✅ Submit button */}
              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  width: "100%",
                  backgroundColor: status === "loading" ? "#5eead4" : "#14b8a6",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "700",
                  padding: "16px 24px",
                  borderRadius: "12px",
                  border: "none",
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                  boxShadow: "0 4px 12px rgba(20,184,166,0.3)",
                }}
              >
                {status === "loading"
                  ? `⏳ ${t.sending}`
                  : `📩 ${t.sendBtn}`
                }
              </button>
            </form>
          </div>

          {/* ✅ Right — Contact Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h2 style={{
              fontSize: "24px",
              fontWeight: "800",
              color: "var(--text-heading)",
            }}>
              {t.otherWays}
            </h2>

            {/* ✅ Contact cards */}
            {[
              {
                emoji: "📞",
                title: t.phone,
                detail: "045 181 2636",
                sub: t.workingHours,
              },
              {
                emoji: "📧",
                title: t.emailLabel,
                detail: "mahmudul.shapan7@gmail.com",
                sub: t.fastResponse,
              },
              {
                emoji: "📍",
                title: t.addressLabel,
                detail: "Kankarepolku 5 H 451, 00770 Helsinki",
                sub: "00770 Helsinki, Finland",
              },
              {
                emoji: "🕐",
                title: t.hoursLabel,
                detail: t.workingHours,
                sub: t.workingSat,
              },
            ].map((item) => (
              <div key={item.title} style={{
                backgroundColor: "var(--bg-card)",
                borderRadius: "16px",
                padding: "20px 24px",
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                border: "1px solid var(--border-color)",
              }}>
                <span style={{ fontSize: "1.75rem", flexShrink: 0 }}>
                  {item.emoji}
                </span>
                <div>
                  <div style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    color: "var(--text-secondary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: "4px",
                  }}>
                    {item.title}
                  </div>
                  <div style={{
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "var(--text-primary)",
                    marginBottom: "2px",
                  }}>
                    {item.detail}
                  </div>
                  <div style={{
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                  }}>
                    {item.sub}
                  </div>
                </div>
              </div>
            ))}

            {/* ✅ Fast response badge */}
            <div style={{
              backgroundColor: "#14b8a6",
              borderRadius: "16px",
              padding: "20px 24px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "8px" }}>⚡</div>
              <div style={{
                fontWeight: "700",
                color: "white",
                fontSize: "16px",
                marginBottom: "4px",
              }}>
                {t.fastResponse}
              </div>
              <div style={{ fontSize: "13px", color: "#ccfbef" }}>
                {t.fastDesc}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}