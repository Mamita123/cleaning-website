const express     = require("express");
const router      = express.Router();
const { pool }    = require("../config/db");
const { protect } = require("../middleware/authMiddleware");

// ✅ POST /api/contacts — Save contact message (public)
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO contacts (name, email, phone, service, message)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, email, phone || "", service || "", message]
    );

    res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      data: result.rows[0],
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ GET /api/contacts — Get all messages (admin only)
router.get("/", protect, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM contacts ORDER BY created_at DESC"
    );
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;