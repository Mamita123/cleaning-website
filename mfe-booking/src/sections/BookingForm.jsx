import React, { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import Calendar  from "../components/Calendar";
import TimeSlots from "../components/TimeSlots";
import API_URL from "../config";

export default function BookingForm({ onConfirm }) {
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [booking, setBooking] = useState({
    service: "", date: null, time: "",
    name: "", email: "", phone: "", address: "", notes: "",
  });
  const [errors, setErrors] = useState({});

  // ✅ Services using translations
  const services = [
    { value: "regular",   label: t.regularHome,    price: `${t.from} €49`,  duration: "2-3 h" },
    { value: "deep",      label: t.deepCleaning,   price: `${t.from} €99`,  duration: "4-6 h" },
    { value: "office",    label: t.officeCleaning, price: `${t.from} €79`,  duration: "2-4 h" },
    { value: "moveinout", label: t.moveInOut,      price: `${t.from} €129`, duration: "5-8 h" },
    { value: "eco",       label: t.ecoFriendly,    price: `${t.from} €59`,  duration: "2-3 h" },
    { value: "window",    label: t.windowCleaning, price: `${t.from} €39`,  duration: "1-2 h" },
  ];

  // ✅ Step labels
  const stepLabels = [t.stepService, t.stepDateTime, t.stepDetails, t.stepConfirm];

  const update = (field, value) => {
    setBooking(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 0 && !booking.service) newErrors.service = t.selectServiceErr;
    if (currentStep === 1) {
      if (!booking.date) newErrors.date = t.selectDateErr;
      if (!booking.time) newErrors.time = t.selectTimeErr;
    }
    if (currentStep === 2) {
      if (!booking.name.trim())    newErrors.name    = t.nameRequired;
      if (!booking.email.trim())   newErrors.email   = t.emailRequired;
      if (!booking.address.trim()) newErrors.address = t.addrRequired;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => { if (validateStep()) setCurrentStep(p => p + 1); };
  const prevStep = () => setCurrentStep(p => p - 1);

  const selectedService = services.find(s => s.value === booking.service);

  const handleSubmit = async () => {
    try {
      const formatted = {
        ...booking,
        date: booking.date?.toLocaleDateString(
          language === "fi" ? "fi-FI" : "en-GB",
          { weekday: "long", day: "numeric", month: "long", year: "numeric" }
        ),
      };

      const response = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    formatted.name,
          email:   formatted.email,
          phone:   formatted.phone,
          address: formatted.address,
          service: formatted.service,
          date:    formatted.date,
          time:    formatted.time,
          notes:   formatted.notes,
          amount:  selectedService?.price || "",
        }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      onConfirm(formatted);

    } catch (error) {
      alert("Booking failed: " + error.message);
    }
  };

  // ✅ Styles
  const inputStyle = {
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
  };

  const labelStyle = {
    fontSize: "13px",
    fontWeight: "600",
    color: "var(--text-primary)",
    display: "block",
    marginBottom: "6px",
  };

  return (
    <section style={{ padding: "48px 24px", backgroundColor: "var(--bg-primary)" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        {/* ✅ Step progress */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "36px",
          position: "relative",
        }}>
          <div style={{
            position: "absolute",
            top: "18px",
            left: "10%",
            right: "10%",
            height: "2px",
            backgroundColor: "var(--border-color)",
            zIndex: 0,
          }} />

          {stepLabels.map((label, index) => (
            <div key={index} style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              zIndex: 1,
              flex: 1,
            }}>
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "700",
                transition: "all 0.2s",
                backgroundColor: index < currentStep
                  ? "#14b8a6"
                  : index === currentStep
                  ? "var(--bg-card)"
                  : "var(--bg-primary)",
                color: index < currentStep
                  ? "white"
                  : index === currentStep
                  ? "#14b8a6"
                  : "var(--text-secondary)",
                border: index === currentStep
                  ? "2px solid #14b8a6"
                  : "2px solid var(--border-color)",
                boxShadow: index === currentStep
                  ? "0 0 0 4px #ccfbef"
                  : "none",
              }}>
                {index < currentStep ? "✓" : index + 1}
              </div>
              <span style={{
                fontSize: "11px",
                fontWeight: "600",
                color: index === currentStep
                  ? "#0d9488"
                  : "var(--text-secondary)",
                textAlign: "center",
              }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* ✅ Step content card */}
        <div style={{
          backgroundColor: "var(--bg-card)",
          borderRadius: "24px",
          padding: "36px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
          marginBottom: "24px",
          border: "1px solid var(--border-color)",
        }}>

          {/* ======================== */}
          {/* STEP 1 — Service        */}
          {/* ======================== */}
          {currentStep === 0 && (
            <div>
              <h2 style={{
                fontSize: "22px",
                fontWeight: "800",
                color: "var(--text-heading)",
                marginBottom: "8px",
              }}>
                {t.chooseServiceTitle}
              </h2>
              <p style={{
                fontSize: "14px",
                color: "var(--text-secondary)",
                marginBottom: "24px",
              }}>
                {t.chooseServiceDesc}
              </p>
              {errors.service && (
                <div style={{ color: "#ef4444", fontSize: "13px", marginBottom: "12px" }}>
                  {errors.service}
                </div>
              )}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "12px",
              }}>
                {services.map((service) => (
                  <div
                    key={service.value}
                    onClick={() => update("service", service.value)}
                    style={{
                      padding: "16px",
                      borderRadius: "14px",
                      border: booking.service === service.value
                        ? "2px solid #14b8a6"
                        : "1.5px solid var(--border-color)",
                      cursor: "pointer",
                      transition: "all 0.15s",
                      backgroundColor: booking.service === service.value
                        ? "var(--bg-primary)"
                        : "var(--bg-card)",
                    }}
                  >
                    <div style={{
                      fontWeight: "700",
                      fontSize: "14px",
                      color: "var(--text-primary)",
                      marginBottom: "6px",
                    }}>
                      {service.label}
                    </div>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "13px",
                    }}>
                      <span style={{ color: "#0d9488", fontWeight: "700" }}>
                        {service.price}
                      </span>
                      <span style={{ color: "var(--text-secondary)" }}>
                        {service.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================== */}
          {/* STEP 2 — Date & Time    */}
          {/* ======================== */}
          {currentStep === 1 && (
            <div>
              <h2 style={{
                fontSize: "22px",
                fontWeight: "800",
                color: "var(--text-heading)",
                marginBottom: "8px",
              }}>
                {t.pickDateTitle}
              </h2>
              <p style={{
                fontSize: "14px",
                color: "var(--text-secondary)",
                marginBottom: "24px",
              }}>
                {t.pickDateDesc}
              </p>
              <Calendar
                selectedDate={booking.date}
                onSelectDate={(date) => update("date", date)}
                t={t}
              />
              {errors.date && (
                <div style={{ color: "#ef4444", fontSize: "13px", margin: "8px 0" }}>
                  {errors.date}
                </div>
              )}
              {booking.date && (
                <div style={{ marginTop: "24px" }}>
                  <TimeSlots
                    selectedTime={booking.time}
                    onSelectTime={(time) => update("time", time)}
                    t={t}
                  />
                  {errors.time && (
                    <div style={{ color: "#ef4444", fontSize: "13px", marginTop: "8px" }}>
                      {errors.time}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ======================== */}
          {/* STEP 3 — Details        */}
          {/* ======================== */}
          {currentStep === 2 && (
            <div>
              <h2 style={{
                fontSize: "22px",
                fontWeight: "800",
                color: "var(--text-heading)",
                marginBottom: "8px",
              }}>
                {t.detailsTitle}
              </h2>
              <p style={{
                fontSize: "14px",
                color: "var(--text-secondary)",
                marginBottom: "24px",
              }}>
                {t.detailsDesc}
              </p>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
              }}>
                <div>
                  <label style={labelStyle}>
                    {t.fullName} <span style={{ color: "#ef4444" }}>{"*"}</span>
                  </label>
                  <input
                    type="text"
                    value={booking.name}
                    onChange={e => update("name", e.target.value)}
                    placeholder={t.namePlaceholder}
                    style={{
                      ...inputStyle,
                      border: errors.name
                        ? "1.5px solid #ef4444"
                        : "1.5px solid var(--input-border)",
                    }}
                  />
                  {errors.name && (
                    <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>
                      {errors.name}
                    </div>
                  )}
                </div>

                <div>
                  <label style={labelStyle}>
                    {t.emailAddr} <span style={{ color: "#ef4444" }}>{"*"}</span>
                  </label>
                  <input
                    type="email"
                    value={booking.email}
                    onChange={e => update("email", e.target.value)}
                    placeholder={t.emailPlaceholder}
                    style={{
                      ...inputStyle,
                      border: errors.email
                        ? "1.5px solid #ef4444"
                        : "1.5px solid var(--input-border)",
                    }}
                  />
                  {errors.email && (
                    <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ marginTop: "16px" }}>
                <label style={labelStyle}>{t.phoneOpt}</label>
                <input
                  type="tel"
                  value={booking.phone}
                  onChange={e => update("phone", e.target.value)}
                  placeholder={t.phonePlaceholder}
                  style={inputStyle}
                />
              </div>

              <div style={{ marginTop: "16px" }}>
                <label style={labelStyle}>
                  {t.cleaningAddress} <span style={{ color: "#ef4444" }}>{"*"}</span>
                </label>
                <input
                  type="text"
                  value={booking.address}
                  onChange={e => update("address", e.target.value)}
                  placeholder={t.addrPlaceholder}
                  style={{
                    ...inputStyle,
                    border: errors.address
                      ? "1.5px solid #ef4444"
                      : "1.5px solid var(--input-border)",
                  }}
                />
                {errors.address && (
                  <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>
                    {errors.address}
                  </div>
                )}
              </div>

              <div style={{ marginTop: "16px" }}>
                <label style={labelStyle}>{t.specialInstr}</label>
                <textarea
                  value={booking.notes}
                  onChange={e => update("notes", e.target.value)}
                  placeholder={t.notesPlaceholder}
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>
            </div>
          )}

          {/* ======================== */}
          {/* STEP 4 — Confirm        */}
          {/* ======================== */}
          {currentStep === 3 && (
            <div>
              <h2 style={{
                fontSize: "22px",
                fontWeight: "800",
                color: "var(--text-heading)",
                marginBottom: "8px",
              }}>
                {t.confirmTitle}
              </h2>
              <p style={{
                fontSize: "14px",
                color: "var(--text-secondary)",
                marginBottom: "24px",
              }}>
                {t.confirmDesc}
              </p>

              {/* ✅ Booking summary */}
              <div style={{
                backgroundColor: "var(--bg-primary)",
                borderRadius: "16px",
                padding: "20px 24px",
                marginBottom: "24px",
                border: "1px solid var(--border-color)",
              }}>
                {[
                  { label: t.service,  value: selectedService?.label },
                  { label: t.price,    value: selectedService?.price },
                  { label: t.duration, value: selectedService?.duration },
                  {
                    label: t.date,
                    value: booking.date?.toLocaleDateString(
                      language === "fi" ? "fi-FI" : "en-GB",
                      {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    ),
                  },
                  { label: t.time,    value: booking.time },
                  { label: t.name,    value: booking.name },
                  { label: t.email,   value: booking.email },
                  { label: t.address, value: booking.address },
                ].map((item) => (
                  <div key={item.label} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom: "1px solid var(--border-color)",
                    fontSize: "14px",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}>
                    <span style={{
                      color: "var(--text-secondary)",
                      fontWeight: "500",
                    }}>
                      {item.label}
                    </span>
                    <span style={{
                      color: "var(--text-primary)",
                      fontWeight: "600",
                      textAlign: "right",
                    }}>
                      {item.value || "—"}
                    </span>
                  </div>
                ))}
              </div>

              <p style={{
                fontSize: "12px",
                color: "var(--text-secondary)",
                textAlign: "center",
                lineHeight: "1.6",
              }}>
                {t.termsNotice}
              </p>
            </div>
          )}

        </div>

        {/* ✅ Navigation buttons */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "16px",
        }}>
          {currentStep > 0 ? (
            <button
              onClick={prevStep}
              style={{
                backgroundColor: "var(--bg-card)",
                color: "var(--text-primary)",
                fontSize: "15px",
                fontWeight: "600",
                padding: "14px 28px",
                borderRadius: "12px",
                border: "1.5px solid var(--border-color)",
                cursor: "pointer",
              }}
            >
              {"←"} {t.back}
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={currentStep === 3 ? handleSubmit : nextStep}
            style={{
              backgroundColor: "#14b8a6",
              color: "white",
              fontSize: "15px",
              fontWeight: "700",
              padding: "14px 32px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(20,184,166,0.3)",
              flex: currentStep === 0 ? 1 : "unset",
            }}
          >
            {currentStep === 3
              ? `✅ ${t.confirmBooking}`
              : `${t.continue} →`
            }
          </button>
        </div>

      </div>
    </section>
  );
}