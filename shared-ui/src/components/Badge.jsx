import React from "react";

export default function Badge({ label, color = "green" }) {
  const colors = {
    green:  "bg-brand-100 text-brand-700",
    blue:   "bg-blue-100 text-blue-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red:    "bg-red-100 text-red-700",
  };
  return (
    <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${colors[color]}`}>
      {label}
    </span>
  );
}