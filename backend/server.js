const express   = require("express");
const cors      = require("cors");
const path      = require("path");
const rateLimit = require("express-rate-limit");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app  = express();
const PORT = process.env.PORT || 5000;

// ✅ Login rate limiter — 5 attempts per 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max:      5,
  message: {
    success: false,
    message: "Too many login attempts. Please try again in 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders:   false,
});

// ✅ General rate limiter — 100 requests per 15 minutes
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max:      100,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "http://localhost:3004",
    "http://localhost:3005",
    "http://localhost:3006",
    "http://localhost:3007",
    "http://localhost:3008",
  ],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Apply general limiter to all routes
app.use(generalLimiter);

// ✅ Import routes
const authRoutes    = require("./routes/auth");
const bookingRoutes = require("./routes/bookings");
const contactRoutes = require("./routes/contacts");
const reviewRoutes  = require("./routes/reviews");
const serviceRoutes = require("./routes/services");

// ✅ Test route
app.get("/", (req, res) => {
  res.json({ success: true, message: "J & S Palvelut API is running!" });
});

// ✅ Apply login limiter to login route specifically
app.use("/api/auth/login", loginLimiter);

// ✅ Register routes
app.use("/api/auth",     authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/reviews",  reviewRoutes);
app.use("/api/services", serviceRoutes);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// ✅ Test database
const pool = require("./config/db");
pool.query("SELECT NOW()", (err) => {
  if (err) {
    console.error("❌ Database test failed:", err.message);
  } else {
    console.log("✅ Database query test passed!");
  }
});