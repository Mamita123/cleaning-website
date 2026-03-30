const express     = require("express");
const router      = express.Router();
const { pool }    = require("../config/db");
const { protect } = require("../middleware/authMiddleware");

// ✅ POST /api/reviews — Submit review (public)
router.post("/", async (req, res) => {
  try {
    const { name, email, rating, service, review } = req.body;

    if (!name || !email || !rating || !service || !review) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO reviews (name, email, rating, service, review, is_approved)
       VALUES ($1, $2, $3, $4, $5, FALSE)
       RETURNING *`,
      [name, email, rating, service, review]
    );

    res.status(201).json({
      success: true,
      message: "Review submitted! It will appear after approval.",
      data: result.rows[0],
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ GET /api/reviews — Get approved reviews (public)
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM reviews WHERE is_approved = TRUE ORDER BY created_at DESC"
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

// ✅ PUT /api/reviews/:id/approve — Approve review (admin only)
router.put("/:id/approve", protect, async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE reviews SET is_approved = TRUE WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    res.json({
      success: true,
      message: "Review approved",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ GET /api/reviews/all — Get ALL reviews including unapproved (admin only)
router.get("/all", protect, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM reviews ORDER BY created_at DESC"
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