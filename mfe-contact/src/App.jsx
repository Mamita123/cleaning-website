import React from "react";

// ✅ Import all sections of the Contact page
import ContactHero from "./sections/ContactHero";
import ContactForm from "./sections/ContactForm";
import ContactInfo from "./sections/ContactInfo";

// ✅ Shell loads this as: import("mfeContact/ContactApp")
export default function App() {
  return (
    <main>
      <ContactHero />  {/* Top banner */}
      <ContactForm />  {/* Form + contact info cards */}
      <ContactInfo />  {/* Map + service areas */}
    </main>
  );
}