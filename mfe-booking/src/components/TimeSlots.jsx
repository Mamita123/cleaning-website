import React from "react";

const slots = [
  { time: "08:00", label: "8:00 AM" },
  { time: "09:00", label: "9:00 AM" },
  { time: "10:00", label: "10:00 AM" },
  { time: "11:00", label: "11:00 AM" },
  { time: "12:00", label: "12:00 PM" },
  { time: "13:00", label: "1:00 PM" },
  { time: "14:00", label: "2:00 PM" },
  { time: "15:00", label: "3:00 PM" },
  { time: "16:00", label: "4:00 PM" },
];

const bookedSlots = ["10:00", "14:00"];

export default function TimeSlots({ selectedTime, onSelectTime }) {
  return (
    <div>
      <h3 style={{
        fontSize: "15px",
        fontWeight: "700",
        color: "var(--text-primary)",
        marginBottom: "12px",
      }}>
        Select a Time
      </h3>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "8px",
      }}>
        {slots.map((slot) => {
          const booked   = bookedSlots.includes(slot.time);
          const selected = selectedTime === slot.time;

          return (
            <button
              key={slot.time}
              onClick={() => !booked && onSelectTime(slot.time)}
              disabled={booked}
              style={{
                padding: "10px 8px",
                borderRadius: "10px",
                border: selected
                  ? "2px solid #14b8a6"
                  : "1.5px solid var(--border-color)",
                fontSize: "13px",
                fontWeight: "600",
                cursor: booked ? "not-allowed" : "pointer",
                transition: "all 0.15s",
                backgroundColor: selected
                  ? "#14b8a6"
                  : booked
                  ? "var(--bg-primary)"
                  : "var(--bg-card)",
                color: selected
                  ? "white"
                  : booked
                  ? "var(--text-secondary)"
                  : "var(--text-primary)",
                textDecoration: booked ? "line-through" : "none",
                opacity: booked ? 0.5 : 1,
              }}
            >
              {slot.label}
            </button>
          );
        })}
      </div>

      <div style={{
        display: "flex",
        gap: "16px",
        marginTop: "10px",
        fontSize: "11px",
        color: "var(--text-secondary)",
      }}>
        <span style={{ color: "#14b8a6" }}>⬤ Selected</span>
        <span>⬤ Available</span>
        <span>⬤ Booked</span>
      </div>
    </div>
  );
}