import React, { useState } from "react";

// ✅ Import all sections
import BookingHero    from "./sections/BookingHero";
import BookingForm    from "./sections/BookingForm";
import BookingConfirm from "./sections/BookingConfirm";

// ✅ Shell loads this as: import("mfeBooking/BookingApp")
export default function App() {
  // ✅ Tracks confirmed booking data
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // ✅ Resets to show form again
  const handleReset = () => setConfirmedBooking(null);

  return (
    <main>
      {confirmedBooking ? (
        // ✅ Show confirmation screen after booking
        <BookingConfirm
          booking={confirmedBooking}
          onReset={handleReset}
        />
      ) : (
        // ✅ Show booking form
        <>
          <BookingHero />
          <BookingForm onConfirm={setConfirmedBooking} />
        </>
      )}
    </main>
  );
}