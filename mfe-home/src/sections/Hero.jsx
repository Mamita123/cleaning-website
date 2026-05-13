import React, { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import API_URL from "../config";

export default function Hero() {
  const { t, language } = useLanguage();
  const [showQuote, setShowQuote] = useState(false);
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({
    serviceType: "",
    preferredDate: "",
    squareMeters: "",
    city: "",
    address: "",
    postalCode: "",
    additionalInfo: "",
    paymentMethod: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    hearAboutUs: "",
    consentSMS: false,
    consentEmail: false,
  });

  React.useEffect(function() {
  if (showQuote) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  return function() {
    document.body.style.overflow = "";
  };
}, [showQuote]);

  const handleChange = function(e) {
    setFormData(function(p) { return {...p, [e.target.name]: e.target.value}; });
  };

  const handleSubmit = async function(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const message = [
        "Service: " + formData.serviceType,
        "Date: " + formData.preferredDate,
        "Size: " + formData.squareMeters + " m2",
        "City: " + formData.city,
        "Address: " + formData.address,
        "Postal: " + formData.postalCode,
        "Payment: " + formData.paymentMethod,
        "Info: " + formData.additionalInfo,
        "Heard from: " + formData.hearAboutUs,
        "SMS consent: " + (formData.consentSMS ? "Yes" : "No"),
        "Email consent: " + (formData.consentEmail ? "Yes" : "No"),
      ].join("\n");

      const res = await fetch(`${API_URL}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.firstName + " " + formData.lastName,
          email: formData.email,
          phone: formData.phone,
          service: formData.serviceType,
          message: message,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setStatus("success");
      setFormData({
        serviceType: "", preferredDate: "", squareMeters: "",
        city: "", address: "", postalCode: "", additionalInfo: "",
        paymentMethod: "", firstName: "", lastName: "", phone: "",
        email: "", hearAboutUs: "", consentSMS: false, consentEmail: false,
      });
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: "8px",
    border: "1.5px solid #e5e7eb", fontSize: "14px",
    color: "#111827", backgroundColor: "white", outline: "none",
    fontFamily: "Inter, sans-serif", boxSizing: "border-box",
    marginTop: "6px",
  };

  const labelStyle = {
    display: "block", fontSize: "14px",
    fontWeight: "600", color: "#111827",
  };

  const serviceOptions = [
    language === "fi" ? "Kotisiivous" : "Home Cleaning",
    language === "fi" ? "Syvasiivous" : "Deep Cleaning",
    language === "fi" ? "Toimistosiivous" : "Office Cleaning",
    language === "fi" ? "Muuttosiivous" : "Move In/Out",
    language === "fi" ? "Ikkunanpesu" : "Window Cleaning",
    language === "fi" ? "Ravintola ja baari" : "Restaurant & Bar",
    language === "fi" ? "Myymalasiivous" : "Store Cleaning",
  ];

  return (
    <>
      {/* ✅ Hero Section */}
      <section style={{
        backgroundColor: "var(--bg-primary)",
        padding: "80px 24px",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
      }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto", width: "100%",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: "48px",
        }}>
          <div style={{ textAlign: "center", maxWidth: "720px" }}>

            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              backgroundColor: "#ccfbef", color: "#0f766e",
              padding: "6px 16px", borderRadius: "999px",
              fontSize: "14px", fontWeight: "600", marginBottom: "12px",
            }}>
              <span>{t.heroBadge}</span>
            </div>

            {/* 24/7 badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              backgroundColor: "rgba(20,184,166,0.1)", color: "#0f766e",
              padding: "6px 16px", borderRadius: "999px",
              fontSize: "14px", fontWeight: "600", marginBottom: "24px",
              border: "1px solid rgba(20,184,166,0.3)", marginLeft: "8px",
            }}>
              {"🟢 "}{language === "fi"
                ? "Auki 24/7 — Varaa milloin tahansa!"
                : "Open 24/7 — Book anytime!"
              }
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: "800",
              color: "var(--text-heading)", lineHeight: "1.15", marginBottom: "24px",
            }}>
              {t.heroTitle1}{" "}
              <span style={{ color: "#14b8a6" }}>{t.heroTitle2}</span>
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "var(--text-secondary)",
              lineHeight: "1.7", marginBottom: "40px",
              maxWidth: "600px", margin: "0 auto 40px",
            }}>
              {t.heroSubtitle}
            </p>

            {/* ✅ CTA Buttons */}
            <div style={{
              display: "flex", flexWrap: "wrap",
              gap: "16px", justifyContent: "center",
            }}>
              {/* Book a Cleaning */}
              <a href="/booking" style={{
                backgroundColor: "#14b8a6", color: "white",
                padding: "16px 32px", borderRadius: "12px",
                fontSize: "16px", fontWeight: "700",
                textDecoration: "none",
                boxShadow: "0 4px 15px rgba(20,184,166,0.4)",
                display: "inline-block",
              }}>
                {"📅 "}{t.bookCleaning}
              </a>

              {/* View Services */}
              <a href="/services" style={{
                backgroundColor: "var(--bg-card)", color: "#0d9488",
                padding: "16px 32px", borderRadius: "12px",
                fontSize: "16px", fontWeight: "700",
                textDecoration: "none", border: "2px solid #0d9488",
                display: "inline-block",
              }}>
                {"🔍 "}{t.viewServices}
              </a>

              {/* ✅ Pyydä tarjous — same color as Book Now */}
              <button
                onClick={function() { setShowQuote(true); setStatus("idle"); }}
                style={{
                  backgroundColor: "#14b8a6",
                  color: "white",
                  padding: "16px 32px",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "700",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(20,184,166,0.4)",
                }}
              >
                {"📋 "}{language === "fi" ? "Pyydä tarjous" : "Request a Quote"}
              </button>
            </div>

          </div>

          {/* Service cards */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px", width: "100%", maxWidth: "480px",
          }}>
            {[
              { emoji: "🏠", label: t.homeClean },
              { emoji: "🏢", label: t.officeClean },
              { emoji: "🛁", label: t.deepClean },
              { emoji: "🌿", label: t.ecoFriendly },
            ].map(function(card) {
              return (
                <div key={card.label} style={{
                  backgroundColor: "var(--bg-card)", borderRadius: "16px",
                  padding: "24px 16px", textAlign: "center",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  border: "1px solid var(--border-color)",
                }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>{card.emoji}</div>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)" }}>
                    {card.label}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ✅ Quote Form — CENTER POPUP */}
      {showQuote && (
        <>
         

          {/* Center popup */}
          <div style={{
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "560px",
  maxHeight: "95vh",
  overflowY: "auto",
  backgroundColor: "white",
  borderRadius: "20px",
  zIndex: 99999,
  boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
}}>

            {/* Header */}
            <div style={{
              backgroundColor: "#134e4a", padding: "24px 32px",
              borderRadius: "20px 20px 0 0",
              display: "flex", justifyContent: "space-between",
              alignItems: "center", position: "sticky", top: 0, zIndex: 1,
            }}>
              <h2 style={{
                color: "white", fontSize: "18px",
                fontWeight: "800", margin: 0,
              }}>
                {language === "fi"
                  ? "Pyydä tarjous siivouspalveluista"
                  : "Request a Cleaning Quote"
                }
              </h2>
              <button
                onClick={function() { setShowQuote(false); }}
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  border: "2px solid rgba(255,255,255,0.4)",
                  color: "white", width: "36px", height: "36px",
                  borderRadius: "8px", cursor: "pointer",
                  fontSize: "16px", fontWeight: "700",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                {"✕"}
              </button>
            </div>

            <div style={{ padding: "32px" }}>

              {/* Intro */}
              <p style={{
                fontSize: "14px", color: "#4b5563",
                lineHeight: "1.7", marginBottom: "24px",
              }}>
                {language === "fi"
                  ? "Tayta yhteystiedot ja kerro hieman siivoustarpeistasi. Otamme sinuun yhteytta mahdollisimman pian."
                  : "Fill in your contact details and tell us about your cleaning needs. We will get back to you as soon as possible."
                }
              </p>

              {/* Success */}
              {status === "success" && (
                <div style={{
                  backgroundColor: "#f0fdf9", border: "1.5px solid #99f6e0",
                  borderRadius: "12px", padding: "16px", marginBottom: "24px",
                  display: "flex", alignItems: "center", gap: "10px",
                }}>
                  <span style={{ fontSize: "20px" }}>{"✅"}</span>
                  <div>
                    <div style={{ fontWeight: "700", color: "#0f766e", fontSize: "14px" }}>
                      {language === "fi" ? "Tarjouspyynto lahetetty!" : "Quote request sent!"}
                    </div>
                    <div style={{ color: "#0d9488", fontSize: "13px" }}>
                      {language === "fi"
                        ? "Otamme sinuun yhteytta pian."
                        : "We will contact you soon."
                      }
                    </div>
                  </div>
                </div>
              )}

              {/* Error */}
              {status === "error" && (
                <div style={{
                  backgroundColor: "#fef2f2", border: "1.5px solid #fecaca",
                  borderRadius: "12px", padding: "16px", marginBottom: "24px",
                }}>
                  <div style={{ fontWeight: "600", color: "#dc2626", fontSize: "14px" }}>
                    {"❌ "}{language === "fi"
                      ? "Jotain meni pieleen. Yrita uudelleen."
                      : "Something went wrong. Please try again."
                    }
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>

                {/* Service type */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={labelStyle}>
                    {language === "fi" ? "Siivouksen tyyppi" : "Service Type"}
                    <span style={{ color: "#ef4444" }}>{"*"}</span>
                  </label>
                  <select name="serviceType" value={formData.serviceType}
                    onChange={handleChange} style={inputStyle}>
                    <option value="">{language === "fi" ? "-- Valitse --" : "-- Select --"}</option>
                    {serviceOptions.map(function(s) {
                      return <option key={s} value={s}>{s}</option>;
                    })}
                  </select>
                </div>

                {/* Preferred date */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={labelStyle}>
                    {language === "fi" ? "Toivottu kayntiajankohta" : "Preferred Visit Date"}
                    <span style={{ color: "#ef4444" }}>{"*"}</span>
                  </label>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>
                    {language === "fi" ? "(paivamaara ja aikavali)" : "(date and time range)"}
                  </div>
                  <input type="text" name="preferredDate" value={formData.preferredDate}
                    onChange={handleChange} style={inputStyle}
                    placeholder={language === "fi" ? "esim. 20.5.2026 klo 10-14" : "e.g. 20.5.2026 10:00-14:00"}
                  />
                </div>

                {/* Square meters */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={labelStyle}>
                    {language === "fi" ? "Siivottavien nelioiden maara" : "Area to clean (m2)"}
                    <span style={{ color: "#ef4444" }}>{"*"}</span>
                  </label>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>
                    {language === "fi"
                      ? "Ei hataa vaikket muistaisi tarkkaa maaraa. Taydenna tahan noin arviosi."
                      : "No worries if you don't know the exact size. An estimate is fine."
                    }
                  </div>
                  <input type="text" name="squareMeters" value={formData.squareMeters}
                    onChange={handleChange} style={inputStyle}
                    placeholder={language === "fi" ? "esim. 75 m2" : "e.g. 75 m2"}
                  />
                </div>

                {/* City */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={labelStyle}>
                    {language === "fi" ? "Paikkakunta tai kaupunki" : "City or Town"}
                    <span style={{ color: "#ef4444" }}>{"*"}</span>
                  </label>
                  <input type="text" name="city" value={formData.city}
                    onChange={handleChange} style={inputStyle}
                    placeholder={language === "fi" ? "esim. Helsinki" : "e.g. Helsinki"}
                  />
                </div>

                {/* Address */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={labelStyle}>
                    {language === "fi" ? "Katuosoite" : "Street Address"}
                    <span style={{ color: "#ef4444" }}>{"*"}</span>
                  </label>
                  <input type="text" name="address" value={formData.address}
                    onChange={handleChange} style={inputStyle}
                    placeholder={language === "fi" ? "Katuosoite" : "Street address"}
                  />
                </div>

                {/* Postal code */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={labelStyle}>
                    {language === "fi" ? "Postinumero" : "Postal Code"}
                    <span style={{ color: "#ef4444" }}>{"*"}</span>
                  </label>
                  <input type="text" name="postalCode" value={formData.postalCode}
                    onChange={handleChange} style={inputStyle} placeholder="00100"
                  />
                </div>

                {/* Additional info */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={labelStyle}>
                    {language === "fi" ? "Lisatietoja" : "Additional Information"}
                  </label>
                  <textarea name="additionalInfo" value={formData.additionalInfo}
                    onChange={handleChange} rows={4}
                    style={{...inputStyle, resize: "vertical"}}
                    placeholder={language === "fi"
                      ? "Erityistoiveet, allergiat, lisatiedot..."
                      : "Special requests, allergies, other details..."
                    }
                  />
                </div>

                {/* ✅ Maksutapa — after Lisatietoja */}
                <div style={{ marginBottom: "24px" }}>
                  <label style={labelStyle}>
                    {language === "fi" ? "Maksutapa" : "Payment Method"}
                    <span style={{ color: "#ef4444" }}>{"*"}</span>
                  </label>
                  <select name="paymentMethod" value={formData.paymentMethod}
                    onChange={handleChange} style={inputStyle}>
                    <option value="">{language === "fi" ? "-- Valitse --" : "-- Select --"}</option>
                    <option value="card">{language === "fi" ? "Korttimaksu" : "Card Payment"}</option>
                    <option value="invoice">{language === "fi" ? "Verkkolasku" : "E-Invoice"}</option>
                    <option value="mobilepay">MobilePay</option>
                    <option value="online">{language === "fi" ? "Verkkopankki" : "Online Bank"}</option>
                    <option value="cash">{language === "fi" ? "Kateinen" : "Cash"}</option>
                  </select>
                </div>

                {/* Contact info heading */}
                <h3 style={{
                  fontSize: "18px", fontWeight: "800", color: "#111827",
                  marginBottom: "20px",
                  borderTop: "1px solid #e5e7eb", paddingTop: "24px",
                }}>
                  {language === "fi" ? "Yhteystiedot" : "Contact Details"}
                </h3>

                {/* First + Last name */}
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  gap: "16px", marginBottom: "20px",
                }}>
                  <div>
                    <label style={labelStyle}>
                      {language === "fi" ? "Etunimi" : "First Name"}
                      <span style={{ color: "#ef4444" }}>{"*"}</span>
                    </label>
                    <input type="text" name="firstName" value={formData.firstName}
                      onChange={handleChange} style={inputStyle} required />
                  </div>
                  <div>
                    <label style={labelStyle}>
                      {language === "fi" ? "Sukunimi" : "Last Name"}
                      <span style={{ color: "#ef4444" }}>{"*"}</span>
                    </label>
                    <input type="text" name="lastName" value={formData.lastName}
                      onChange={handleChange} style={inputStyle} required />
                  </div>
                </div>

                {/* Phone */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={labelStyle}>
                    {language === "fi" ? "Puhelinnumero" : "Phone Number"}
                    <span style={{ color: "#ef4444" }}>{"*"}</span>
                  </label>
                  <input type="tel" name="phone" value={formData.phone}
                    onChange={handleChange} style={inputStyle}
                    placeholder="+358 xx xxx xxxx" required />
                </div>

                {/* Email */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={labelStyle}>
                    {language === "fi" ? "Sahkoposti" : "Email"}
                    <span style={{ color: "#ef4444" }}>{"*"}</span>
                  </label>
                  <input type="email" name="email" value={formData.email}
                    onChange={handleChange} style={inputStyle}
                    placeholder="email@example.com" required />
                </div>

                {/* How did you hear */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={labelStyle}>
                    {language === "fi" ? "Mista sait tiedon meista?" : "How did you hear about us?"}
                    <span style={{ color: "#ef4444" }}>{"*"}</span>
                  </label>
                  <select name="hearAboutUs" value={formData.hearAboutUs}
                    onChange={handleChange} style={inputStyle}>
                    <option value="">{language === "fi" ? "Valitse" : "Select"}</option>
                    <option value="google">Google</option>
                    <option value="friend">{language === "fi" ? "Ystava tai tuttu" : "Friend or acquaintance"}</option>
                    <option value="social">{language === "fi" ? "Sosiaalinen media" : "Social media"}</option>
                    <option value="other">{language === "fi" ? "Muu" : "Other"}</option>
                  </select>
                </div>

                {/* Marketing consent */}
                <div style={{
                  marginBottom: "32px", padding: "16px",
                  backgroundColor: "#f9fafb", borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                }}>
                  <div style={{
                    fontWeight: "700", fontSize: "14px",
                    color: "#111827", marginBottom: "8px",
                  }}>
                    {language === "fi"
                      ? "Suostumus markkinointiviestintaan"
                      : "Marketing consent"
                    }
                  </div>
                  <p style={{
                    fontSize: "13px", color: "#6b7280",
                    lineHeight: "1.6", marginBottom: "12px",
                  }}>
                    {language === "fi"
                      ? "J & S Palvelut voi kayttaa yhteystietojani lahettaakseen minulle tekstiviestitse tai sahkopostitse tiedotteita ja tarjouksia palveluista."
                      : "J & S Palvelut may use my contact details to send me notifications and offers about their services."
                    }
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                      <input type="checkbox" name="consentSMS"
                        checked={formData.consentSMS}
                        onChange={function(e) {
                          setFormData(function(p) { return {...p, consentSMS: e.target.checked}; });
                        }}
                        style={{ width: "16px", height: "16px", cursor: "pointer" }}
                      />
                      <span style={{ fontSize: "14px", color: "#374151" }}>
                        {language === "fi" ? "Tekstiviesti" : "Text message"}
                      </span>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                      <input type="checkbox" name="consentEmail"
                        checked={formData.consentEmail}
                        onChange={function(e) {
                          setFormData(function(p) { return {...p, consentEmail: e.target.checked}; });
                        }}
                        style={{ width: "16px", height: "16px", cursor: "pointer" }}
                      />
                      <span style={{ fontSize: "14px", color: "#374151" }}>
                        {language === "fi" ? "Sahkoposti" : "Email"}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    width: "100%",
                    backgroundColor: status === "loading" ? "#5eead4" : "#14b8a6",
                    color: "white", fontSize: "16px", fontWeight: "700",
                    padding: "16px", borderRadius: "12px", border: "none",
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    boxShadow: "0 4px 12px rgba(20,184,166,0.3)",
                    marginBottom: "16px",
                  }}
                >
                  {status === "loading"
                    ? (language === "fi" ? "Lahetetaan..." : "Sending...")
                    : (language === "fi" ? "Laheta tarjouspyynto" : "Send Quote Request")
                  }
                </button>

              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
