import React, { useState } from "react";

const DAYS   = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function Calendar({ selectedDate, onSelectDate }) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const getDays = () => {
    const year      = viewDate.getFullYear();
    const month     = viewDate.getMonth();
    const firstDay  = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));
    return days;
  };

  const isPast = (date) => {
    if (!date) return true;
    const d = new Date(date); d.setHours(0,0,0,0);
    const t = new Date(today); t.setHours(0,0,0,0);
    return d < t;
  };

  const isSunday   = (date) => date && date.getDay() === 0;
  const isSelected = (date) => date && selectedDate &&
    date.toDateString() === selectedDate.toDateString();
  const isToday    = (date) => date &&
    date.toDateString() === today.toDateString();

  const prevMonth = () =>
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const nextMonth = () =>
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));

  const days = getDays();

  return (
    <div style={{
      backgroundColor: "var(--bg-card)",
      borderRadius: "16px",
      padding: "20px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      border: "1px solid var(--border-color)",
    }}>
      {/* ✅ Calendar header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px",
      }}>
        <button
          onClick={prevMonth}
          style={{
            width: "32px", height: "32px",
            borderRadius: "8px",
            border: "1px solid var(--border-color)",
            backgroundColor: "var(--bg-primary)",
            cursor: "pointer",
            fontSize: "16px",
            color: "var(--text-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >‹</button>

        <span style={{
          fontSize: "15px",
          fontWeight: "700",
          color: "var(--text-primary)",
        }}>
          {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
        </span>

        <button
          onClick={nextMonth}
          style={{
            width: "32px", height: "32px",
            borderRadius: "8px",
            border: "1px solid var(--border-color)",
            backgroundColor: "var(--bg-primary)",
            cursor: "pointer",
            fontSize: "16px",
            color: "var(--text-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >›</button>
      </div>

      {/* ✅ Day headers */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "4px",
        marginBottom: "8px",
      }}>
        {DAYS.map(day => (
          <div key={day} style={{
            textAlign: "center",
            fontSize: "12px",
            fontWeight: "600",
            color: "var(--text-secondary)",
            padding: "4px 0",
          }}>
            {day}
          </div>
        ))}
      </div>

      {/* ✅ Day grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "4px",
      }}>
        {days.map((date, index) => {
          const disabled  = !date || isPast(date) || isSunday(date);
          const selected  = isSelected(date);
          const todayDate = isToday(date);

          return (
            <button
              key={index}
              onClick={() => !disabled && onSelectDate(date)}
              disabled={disabled}
              style={{
                height: "36px",
                borderRadius: "8px",
                border: "none",
                fontSize: "13px",
                fontWeight: selected ? "700" : "400",
                cursor: disabled ? "not-allowed" : "pointer",
                transition: "all 0.15s",
                backgroundColor: selected
                  ? "#14b8a6"
                  : todayDate
                  ? "var(--bg-primary)"
                  : "transparent",
                color: selected
                  ? "white"
                  : disabled
                  ? "var(--border-color)"
                  : todayDate
                  ? "#0d9488"
                  : "var(--text-primary)",
                outline: todayDate && !selected
                  ? "1.5px solid #14b8a6"
                  : "none",
              }}
            >
              {date ? date.getDate() : ""}
            </button>
          );
        })}
      </div>

      {/* ✅ Legend */}
      <div style={{
        display: "flex",
        gap: "16px",
        marginTop: "12px",
        fontSize: "11px",
        color: "var(--text-secondary)",
      }}>
        <span>⬤ Today</span>
        <span style={{ color: "#14b8a6" }}>⬤ Selected</span>
        <span>✕ Unavailable</span>
      </div>
    </div>
  );
}