import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl shadow-card border border-gray-100
                     hover:shadow-lg transition-shadow duration-200 p-6 ${className}`}>
      {children}
    </div>
  );
}