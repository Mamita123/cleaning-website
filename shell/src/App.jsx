import React, { Suspense , lazy} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ✅ Add this import at the top of App.jsx
const HomeApp = lazy(() => import("mfeHome/HomeApp"));

// ✅ Load Services MFE from port 3002
const ServicesApp = lazy(() => import("mfeServices/ServicesApp"));

// ✅ Add with other lazy imports at the top
const PricingApp = lazy(() => import("mfePricing/PricingApp"));

const AboutApp = lazy(() => import("mfeAbout/AboutApp"));

//Reviews
const ReviewsApp = lazy(() => import("mfeReviews/ReviewsApp"));


//Contacts
const ContactApp = lazy(() => import("mfeContact/ContactApp"));

//Booking
const BookingApp = lazy(() => import("mfeBooking/BookingApp"));

//Admin
const AdminApp = lazy(() => import("mfeAdmin/AdminApp"));


// ✅ Placeholder shown while we build each MFE one by one
const Placeholder = ({ name }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center px-4">
      <div className="text-6xl mb-4">🚧</div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-700">
        {name} Page
      </h1>
      <p className="text-gray-500 mt-2 text-sm md:text-base">
        Coming soon — building this next!
      </p>
    </div>
  </div>
);

// ✅ Loading screen shown while MFEs are being fetched
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <p className="text-brand-500 font-medium text-lg">Loading...</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
     {/* ✅ Wrapper div — this was missing! */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}>
      {/* ✅ Navbar lives in shell — stays on every page */}
      <Navbar />

      {/* ✅ Each route loads its own MFE — placeholders for now */}
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/"         element={<HomeApp/>} />
            <Route path="/services" element={<ServicesApp/>} />
            <Route path="/booking"  element={<BookingApp />} />
            <Route path="/about"    element={<AboutApp/>} />
            <Route path="/pricing"  element={<PricingApp />} />
            <Route path="/reviews"  element={<ReviewsApp/>} />
            <Route path="/contact"  element={<ContactApp />} />
            <Route path="/admin"    element={<AdminApp />} />
          </Routes>
        </Suspense>
      </main>
         {/* ✅ Footer — hidden on admin page */}
        <Routes>
          <Route path="/admin" element={null} />
          <Route path="*"      element={<Footer />} />
        </Routes>

      </div>{/* ✅ closes wrapper div */}
    </BrowserRouter>
  );
}

