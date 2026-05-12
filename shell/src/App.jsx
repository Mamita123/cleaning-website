import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AppProvider } from "./context/AppContext";

// ✅ Error boundary class
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "48px", textAlign: "center" }}>
          <h2 style={{ color: "#dc2626" }}>Something went wrong</h2>
          <p style={{ color: "#6b7280" }}>
            {this.state.error && this.state.error.message}
          </p>
          <a href="/services" style={{ color: "#14b8a6" }}>
            Back to Services
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}

const HomeApp          = React.lazy(() => import("mfeHome/HomeApp"));
const ServicesApp      = React.lazy(() => import("mfeServices/ServicesApp"));
const ServiceDetailApp = React.lazy(() => import("mfeServices/ServiceDetailApp"));
const BookingApp       = React.lazy(() => import("mfeBooking/BookingApp"));
const AboutApp         = React.lazy(() => import("mfeAbout/AboutApp"));
const PricingApp       = React.lazy(() => import("mfePricing/PricingApp"));
const ReviewsApp       = React.lazy(() => import("mfeReviews/ReviewsApp"));
const ContactApp       = React.lazy(() => import("mfeContact/ContactApp"));
const AdminApp         = React.lazy(() => import("mfeAdmin/AdminApp"));

const Loading = () => (
  <div style={{ padding: "48px", textAlign: "center", color: "#0d9488" }}>
    Loading...
  </div>
);

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/js-admin-2024/*" element={<AdminApp />} />
            <Route path="*" element={
              <>
                <Navbar />
                <ErrorBoundary>
                  <Routes>
                    <Route path="/"                    element={<HomeApp />} />
                    <Route path="/services"            element={<ServicesApp />} />
                    <Route path="/services/:serviceId" element={<ServiceDetailApp />} />
                    <Route path="/booking"             element={<BookingApp />} />
                    <Route path="/about"               element={<AboutApp />} />
                    <Route path="/pricing"             element={<PricingApp />} />
                    <Route path="/reviews"             element={<ReviewsApp />} />
                    <Route path="/contact"             element={<ContactApp />} />
                  </Routes>
                </ErrorBoundary>
                <Footer />
              </>
            } />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppProvider>
  );
}