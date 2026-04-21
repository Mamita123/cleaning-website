import React, { useState } from "react";
import Calendar  from "../components/Calendar";
import TimeSlots from "../components/TimeSlots";

const services = [
  { value: "regular",   label: "Regular Home Cleaning",  price: "€49",  duration: "2–3 hrs" },
  { value: "deep",      label: "Deep Cleaning",           price: "€99",  duration: "4–6 hrs" },
  { value: "office",    label: "Office Cleaning",         price: "€79",  duration: "2–4 hrs" },
  { value: "moveinout", label: "Move In / Move Out",      price: "€129", duration: "5–8 hrs" },
  { value: "eco",       label: "Eco-Friendly Cleaning",   price: "€59",  duration: "2–3 hrs" },
  { value: "window",    label: "Window Cleaning",         price: "€39",  duration: "1–2 hrs" },
];

const STEPS = ["Service", "Date & Time", "Your Details", "Confirm"];

export default function BookingForm({ onConfirm }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [booking, setBooking] = useState({
    service: "", date: null, time: "",
    name: "", email: "", phone: "", address: "", notes: "",
  });
  const [errors, setErrors] = useState({});

  const update = (field, value) => {
    setBooking(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 0 && !booking.service) newErrors.service = "Please select a service";
    if (currentStep === 1) {
      if (!booking.date) newErrors.date = "Please select a date";
      if (!booking.time) newErrors.time = "Please select a time";
    }
    if (currentStep === 2) {
      if (!booking.name.trim())    newErrors.name    = "Name is required";
      if (!booking.email.trim())   newErrors.email   = "Email is required";
      if (!booking.address.trim()) newErrors.address = "Address is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => { if (validateStep()) setCurrentStep(p => p + 1); };
  const prevStep = () => setCurrentStep(p => p - 1);

  const handleSubmit = async () => {
    try {
      const formatted = {
        ...booking,
        date: booking.date?.toLocaleDateString("en-GB", {
          weekday: "long", day: "numeric",
          month: "long", year: "numeric",
        }),
      };
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formatted.name, email: formatted.email,
          phone: formatted.phone, address: formatted.address,
          service: formatted.service, date: formatted.date,
          time: formatted.time, notes: formatted.notes,
          amount: selectedService?.price || "",
        }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      onConfirm(formatted);
    } catch (error) {
      alert("Booking failed: " + error.message);
    }
  };

  const selectedService = services.find(s => s.value === booking.service);

  // ✅ Input style using CSS variables
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

        {/* ✅ Step progress indicator */}
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

          {STEPS.map((step, index) => (
            <div key={step} style={{
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
                {step}
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
          {/* STEP 1 — Service */}
          {/* ======================== */}
          {currentStep === 0 && (
            <div>
              <h2 style={{
                fontSize: "22px", fontWeight: "800",
                color: "var(--text-heading)", marginBottom: "8px",
              }}>
                Choose a Service
              </h2>
              <p style={{
                fontSize: "14px", color: "var(--text-secondary)", marginBottom: "24px",
              }}>
                Select the cleaning service that best fits your needs.
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
                        ? "var(--bg-primary)" : "var(--bg-card)",
                    }}
                  >
                    <div style={{
                      fontWeight: "700", fontSize: "14px",
                      color: "var(--text-primary)", marginBottom: "6px",
                    }}>
                      {service.label}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                      <span style={{ color: "#0d9488", fontWeight: "700" }}>{service.price}</span>
                      <span style={{ color: "var(--text-secondary)" }}>{service.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================== */}
          {/* STEP 2 — Date & Time */}
          {/* ======================== */}
          {currentStep === 1 && (
            <div>
              <h2 style={{
                fontSize: "22px", fontWeight: "800",
                color: "var(--text-heading)", marginBottom: "8px",
              }}>
                Pick a Date & Time
              </h2>
              <p style={{
                fontSize: "14px", color: "var(--text-secondary)", marginBottom: "24px",
              }}>
                Select your preferred date and time slot. Sundays are unavailable.
              </p>
              <Calendar
                selectedDate={booking.date}
                onSelectDate={(date) => update("date", date)}
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

          {/* ========================== */}
          {/* STEP 3 — Details */}
          {/* ========================== */}
          {currentStep === 2 && (
            <div>
              <h2 style={{
                fontSize: "22px", fontWeight: "800",
                color: "var(--text-heading)", marginBottom: "8px",
              }}>
                Your Details
              </h2>
              <p style={{
                fontSize: "14px", color: "var(--text-secondary)", marginBottom: "24px",
              }}>
                Tell us where to clean and how to reach you.
              </p>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
              }}>
                <div>
                  <label style={labelStyle}>
                    Full Name <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="text" value={booking.name}
                    onChange={e => update("name", e.target.value)}
                    placeholder="Your full name"
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
                    Email <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="email" value={booking.email}
                    onChange={e => update("email", e.target.value)}
                    placeholder="your@email.com"
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
                <label style={labelStyle}>Phone Number (optional)</label>
                <input
                  type="tel" value={booking.phone}
                  onChange={e => update("phone", e.target.value)}
                  placeholder="+358 xx xxx xxxx"
                  style={inputStyle}
                />
              </div>

              <div style={{ marginTop: "16px" }}>
                <label style={labelStyle}>
                  Cleaning Address <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text" value={booking.address}
                  onChange={e => update("address", e.target.value)}
                  placeholder="Street address, city, postcode"
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
                <label style={labelStyle}>Special Instructions (optional)</label>
                <textarea
                  value={booking.notes}
                  onChange={e => update("notes", e.target.value)}
                  placeholder="Any special requests, allergies, access instructions..."
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>
            </div>
          )}

          {/* ======================== */}
          {/* STEP 4 — Confirm */}
          {/* ======================== */}
          {currentStep === 3 && (
            <div>
              <h2 style={{
                fontSize: "22px", fontWeight: "800",
                color: "var(--text-heading)", marginBottom: "8px",
              }}>
                Confirm Your Booking
              </h2>
              <p style={{
                fontSize: "14px", color: "var(--text-secondary)", marginBottom: "24px",
              }}>
                Please review your booking details before confirming.
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
                  { label: "Service",  value: selectedService?.label },
                  { label: "Price",    value: selectedService?.price },
                  { label: "Duration", value: selectedService?.duration },
                  {
                    label: "Date",
                    value: booking.date?.toLocaleDateString("en-GB", {
                      weekday: "long", day: "numeric",
                      month: "long", year: "numeric",
                    }),
                  },
                  { label: "Time",    value: booking.time },
                  { label: "Name",    value: booking.name },
                  { label: "Email",   value: booking.email },
                  { label: "Address", value: booking.address },
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
                By confirming you agree to our terms of service.
                You can cancel or reschedule up to 24 hours before your booking.
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
              ← Back
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
            {currentStep === 3 ? "✅ Confirm Booking" : "Continue →"}
          </button>
        </div>

      </div>
    </section>
  );
}