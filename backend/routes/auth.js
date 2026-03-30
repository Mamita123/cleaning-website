const express = require("express");
const bcrypt  = require("bcryptjs");
const jwt     = require("jsonwebtoken");
const router  = express.Router();

// ✅ Admin credentials — will move to database later
const ADMIN_USERNAME      = "admin";
const ADMIN_PASSWORD_HASH = bcrypt.hashSync("admin123", 10);

// ✅ POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // ✅ Check username
    if (username !== ADMIN_USERNAME) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // ✅ Check password
    const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { username: ADMIN_USERNAME, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({ success: true, token });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;