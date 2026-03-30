import React from "react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  ...props
}) {
  const base = "font-semibold rounded-xl transition-all duration-200 active:scale-95 inline-flex items-center justify-center gap-2";

  const variants = {
    primary:   "bg-brand-500 hover:bg-brand-600 text-white shadow-md hover:shadow-lg",
    secondary: "border-2 border-brand-500 text-brand-600 hover:bg-brand-50",
    ghost:     "text-gray-600 hover:bg-gray-100",
  };

  const sizes = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}