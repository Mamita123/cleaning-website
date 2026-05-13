import React, { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import API_URL from "../config";

function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} style={{
          fontSize: "16px",
          color: star <= rating ? "#f59e0b" : "var(--border-color)",
        }}>
          {"★"}
        </span>
      ))}
    </div>
  );
}

function StarSelector({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          style={{
            fontSize: "32px",
            cursor: "pointer",
            color: star <= (hover || value) ? "#f59e0b" : "var(--border-color)",
            transition: "color 0.1s",
          }}
        >
          {"★"}
        </span>
      ))}
    </div>
  );
}

export default function ReviewsGrid() {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "", email: "", service: "", rating: 0, review: "",
  });
  const [formStatus, setFormStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_URL}/api/reviews`);
      const data = await res.json();
      if (data.success) {
        setReviews(data.data || []);
      }
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const serviceOptions = [
    { value: "home",       label: language === "fi" ? "Kotisiivous" : "Home Cleaning" },
    { value: "deep",       label: language === "fi" ? "Syvasiivous" : "Deep Cleaning" },
    { value: "office",     label: language === "fi" ? "Toimistosiivous" : "Office Cleaning" },
    { value: "moveinout",  label: language === "fi" ? "Muuttosiivous" : "Move In/Out" },
    { value: "window",     label: language === "fi" ? "Ikkunanpesu" : "Window Cleaning" },
    { value: "restaurant", label: language === "fi" ? "Ravintola ja baari" : "Restaurant & Bar" },
    { value: "store",      label: language === "fi" ? "Myymalasiivous" : "Store Cleaning" },
  ];

  const filters = [
    { key: "all",    label: t.allReviews },
    { key: "home",   label: t.homeCleaning },
    { key: "deep",   label: t.deepCleanFilter },
    { key: "office", label: t.officeFilter2 },
  ];

  const filtered = activeFilter === "all"
    ? reviews
    : reviews.filter(function(r) { return r.category === activeFilter; });

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim())
      newErrors.name = language === "fi" ? "Nimi on pakollinen" : "Name is required";
    if (!formData.email.trim())
      newErrors.email = language === "fi" ? "Sahkoposti on pakollinen" : "Email is required";
    if (!formData.service)
      newErrors.service = language === "fi" ? "Valitse palvelu" : "Please select a service";
    if (!formData.rating)
      newErrors.rating = language === "fi" ? "Valitse tahdet" : "Please select a rating";
    if (!formData.review.trim())
      newErrors.review = language === "fi" ? "Kirjoita arvostelu" : "Please write a review";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setFormStatus("loading");
    try {
      const res = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setFormStatus("success");
      setFormData({ name: "", email: "", service: "", rating: 0, review: "" });
      setErrors({});
    } catch {
      setFormStatus("error");
    }
  };

  const inputStyle = {
    width: "100%", padding: "12px 16px", borderRadius: "10px",
    border: "1.5px solid var(--input-border)",
    fontSize: "14px", color: "var(--text-primary)",
    backgroundColor: "var(--bg-primary)", outline: "none",
    fontFamily: "Inter, sans-serif", boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block", fontSize: "14px", fontWeight: "600",
    color: "var(--text-primary)", marginBottom: "6px",
  };

  return (
    <section style={{ backgroundColor: "var(--bg-primary)", padding: "72px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Filter tabs */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "10px",
          justifyContent: "center", marginBottom: "48px",
        }}>
          {filters.map(function(filter) {
            return (
              <button
                key={filter.key}
                onClick={function() { setActiveFilter(filter.key); }}
                style={{
                  padding: "10px 24px", borderRadius: "999px",
                  fontSize: "14px", fontWeight: "600",
                  border: "none", cursor: "pointer", transition: "all 0.15s",
                  backgroundColor: activeFilter === filter.key ? "#14b8a6" : "var(--bg-card)",
                  color: activeFilter === filter.key ? "white" : "var(--text-secondary)",
                  boxShadow: activeFilter === filter.key
                    ? "0 2px 8px rgba(20,184,166,0.35)"
                    : "0 1px 4px rgba(0,0,0,0.08)",
                }}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Reviews */}
        {loading ? (
          <div style={{
            textAlign: "center", padding: "48px",
            color: "var(--text-secondary)", fontSize: "16px",
          }}>
            {language === "fi" ? "Ladataan arvosteluja..." : "Loading reviews..."}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "64px 24px",
            backgroundColor: "var(--bg-card)", borderRadius: "20px",
            border: "1px solid var(--border-color)", marginBottom: "48px",
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "16px" }}>{"💬"}</div>
            <h3 style={{
              color: "var(--text-primary)", marginBottom: "8px",
              fontSize: "20px", fontWeight: "700",
            }}>
              {language === "fi" ? "Ei viela arvosteluja" : "No reviews yet"}
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
              {language === "fi"
                ? "Ole ensimmainen joka jattaa arvostelun!"
                : "Be the first to leave a review!"
              }
            </p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px", marginBottom: "48px",
          }}>
            {filtered.map(function(review) {
              return (
                <div key={review.id} style={{
                  backgroundColor: "var(--bg-card)", borderRadius: "20px",
                  padding: "28px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  border: "1px solid var(--border-color)",
                  display: "flex", flexDirection: "column", gap: "16px",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                  onMouseEnter={function(e) {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={function(e) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{
                        width: "48px", height: "48px", borderRadius: "50%",
                        backgroundColor: "#14b8a6",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "18px", fontWeight: "800", color: "white", flexShrink: 0,
                      }}>
                        {review.name ? review.name.charAt(0).toUpperCase() : "?"}
                      </div>
                      <div>
                        <div style={{ fontWeight: "700", fontSize: "15px", color: "var(--text-primary)" }}>
                          {review.name}
                        </div>
                        <div style={{ fontSize: "11px", color: "#0d9488", fontWeight: "600" }}>
                          {"✓ "}{t.verifiedCustomer}
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                      {review.created_at
                        ? new Date(review.created_at).toLocaleDateString()
                        : ""
                      }
                    </span>
                  </div>

                  <StarRating rating={review.rating} />

                  <p style={{
                    fontSize: "14px", color: "var(--text-secondary)",
                    lineHeight: "1.7", margin: 0, flex: 1,
                  }}>
                    {'"'}{review.review}{'"'}
                  </p>

                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    backgroundColor: "var(--bg-primary)", color: "#0f766e",
                    fontSize: "12px", fontWeight: "600",
                    padding: "4px 12px", borderRadius: "999px",
                    alignSelf: "flex-start", border: "1px solid var(--border-color)",
                  }}>
                    {"🧹 "}{review.service}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ✅ Write a Review Form */}
        <div style={{
          backgroundColor: "var(--bg-card)", borderRadius: "24px",
          padding: "40px 36px", border: "1px solid var(--border-color)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
          maxWidth: "680px", margin: "0 auto",
        }}>
          <h2 style={{
            fontSize: "24px", fontWeight: "800",
            color: "var(--text-heading)", marginBottom: "8px",
          }}>
            {language === "fi" ? "Jata arvostelu" : "Write a Review"}
          </h2>
          <p style={{
            fontSize: "14px", color: "var(--text-secondary)",
            marginBottom: "32px", lineHeight: "1.6",
          }}>
            {language === "fi"
              ? "Kokemuksesi auttaa muita asiakkaita. Kiitos palautteestasi!"
              : "Your experience helps other customers. Thank you for your feedback!"
            }
          </p>

          {formStatus === "success" && (
            <div style={{
              backgroundColor: "#f0fdf9", border: "1.5px solid #99f6e0",
              borderRadius: "12px", padding: "16px 20px", marginBottom: "24px",
              display: "flex", alignItems: "center", gap: "10px",
            }}>
              <span style={{ fontSize: "20px" }}>{"✅"}</span>
              <div>
                <div style={{ fontWeight: "700", color: "#0f766e", fontSize: "14px" }}>
                  {language === "fi" ? "Arvostelu lahetetty!" : "Review submitted!"}
                </div>
                <div style={{ color: "#0d9488", fontSize: "13px" }}>
                  {language === "fi"
                    ? "Arvostelusi tarkistetaan ennen julkaisua."
                    : "Your review will be checked before publishing."
                  }
                </div>
              </div>
            </div>
          )}

          {formStatus === "error" && (
            <div style={{
              backgroundColor: "#fef2f2", border: "1.5px solid #fecaca",
              borderRadius: "12px", padding: "16px 20px", marginBottom: "24px",
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

            {/* Name */}
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>
                {language === "fi" ? "Nimesi" : "Your Name"}
                <span style={{ color: "#ef4444", marginLeft: "4px" }}>{"*"}</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={function(e) { setFormData(function(p) { return {...p, name: e.target.value}; }); }}
                placeholder={language === "fi" ? "Etunimi Sukunimi" : "First Last Name"}
                style={{ ...inputStyle, border: errors.name ? "1.5px solid #ef4444" : "1.5px solid var(--input-border)" }}
              />
              {errors.name && <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{errors.name}</div>}
            </div>

            {/* Email */}
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>
                {language === "fi" ? "Sahkopostisi" : "Your Email"}
                <span style={{ color: "#ef4444", marginLeft: "4px" }}>{"*"}</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={function(e) { setFormData(function(p) { return {...p, email: e.target.value}; }); }}
                placeholder="your@email.com"
                style={{ ...inputStyle, border: errors.email ? "1.5px solid #ef4444" : "1.5px solid var(--input-border)" }}
              />
              {errors.email && <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{errors.email}</div>}
            </div>

            {/* Service */}
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>
                {language === "fi" ? "Palvelu" : "Service Used"}
                <span style={{ color: "#ef4444", marginLeft: "4px" }}>{"*"}</span>
              </label>
              <select
                value={formData.service}
                onChange={function(e) { setFormData(function(p) { return {...p, service: e.target.value}; }); }}
                style={{ ...inputStyle, border: errors.service ? "1.5px solid #ef4444" : "1.5px solid var(--input-border)" }}
              >
                <option value="">{language === "fi" ? "Valitse palvelu..." : "Select a service..."}</option>
                {serviceOptions.map(function(s) {
                  return <option key={s.value} value={s.label}>{s.label}</option>;
                })}
              </select>
              {errors.service && <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{errors.service}</div>}
            </div>

            {/* Star Rating */}
            <div style={{ marginBottom: "20px" }}>
              <label style={labelStyle}>
                {language === "fi" ? "Arvosana" : "Your Rating"}
                <span style={{ color: "#ef4444", marginLeft: "4px" }}>{"*"}</span>
              </label>
              <StarSelector
                value={formData.rating}
                onChange={function(val) { setFormData(function(p) { return {...p, rating: val}; }); }}
              />
              {errors.rating && <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{errors.rating}</div>}
            </div>

            {/* Review */}
            <div style={{ marginBottom: "24px" }}>
              <label style={labelStyle}>
                {language === "fi" ? "Arvostelusi" : "Your Review"}
                <span style={{ color: "#ef4444", marginLeft: "4px" }}>{"*"}</span>
              </label>
              <textarea
                value={formData.review}
                onChange={function(e) { setFormData(function(p) { return {...p, review: e.target.value}; }); }}
                placeholder={language === "fi"
                  ? "Kerro kokemuksestasi palvelustamme..."
                  : "Tell us about your experience with our service..."
                }
                rows={5}
                style={{ ...inputStyle, resize: "vertical", border: errors.review ? "1.5px solid #ef4444" : "1.5px solid var(--input-border)" }}
              />
              {errors.review && <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>{errors.review}</div>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={formStatus === "loading"}
              style={{
                width: "100%", backgroundColor: formStatus === "loading" ? "#5eead4" : "#14b8a6",
                color: "white", fontSize: "16px", fontWeight: "700",
                padding: "16px 24px", borderRadius: "12px", border: "none",
                cursor: formStatus === "loading" ? "not-allowed" : "pointer",
                boxShadow: "0 4px 12px rgba(20,184,166,0.3)",
              }}
            >
              {formStatus === "loading"
                ? (language === "fi" ? "Lahetetaan..." : "Submitting...")
                : (language === "fi" ? "Laheta arvostelu" : "Submit Review")
              }
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}
