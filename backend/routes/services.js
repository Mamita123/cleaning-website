const express     = require("express");
const router      = express.Router();
const { pool }    = require("../config/db");
const { protect } = require("../middleware/authMiddleware");

// ✅ GET /api/services — Get all active services (public)
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM services WHERE is_active = TRUE ORDER BY id"
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

// ✅ POST /api/services — Create service (admin only)
router.post("/", protect, async (req, res) => {
  try {
    const {
      title, description, price,
      duration, emoji, badge, category, includes
    } = req.body;

    const result = await pool.query(
      `INSERT INTO services
        (title, description, price, duration, emoji, badge, category, includes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        title, description, price, duration,
        emoji || "🧹", badge || "",
        category || "home",
        includes || [],
      ]
    );

    res.status(201).json({
      success: true,
      message: "Service created",
      data: result.rows[0],
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;