const express        = require("express");
const router         = express.Router();
const { pool }       = require("../config/db");
const { protect }    = require("../middleware/authMiddleware");

// ✅ POST /api/bookings — Create new booking (public)
router.post("/", async (req, res) => {
  try {
    const {
      name, email, phone, address,
      service, date, time, notes, amount
    } = req.body;

    // ✅ Validate required fields
    if (!name || !email || !service || !date || !time || !address) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
      });
    }

    // ✅ Insert booking into PostgreSQL
    const result = await pool.query(
      `INSERT INTO bookings
        (name, email, phone, address, service, date, time, notes, amount, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending')
       RETURNING *`,
      [name, email, phone || "", address, service, date, time, notes || "", amount || ""]
    );

    res.status(201).json({
      success: true,
      message: "Booking created successfully!",
      data: result.rows[0],
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ GET /api/bookings — Get all bookings (admin only)
router.get("/", protect, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM bookings ORDER BY created_at DESC"
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

// ✅ PUT /api/bookings/:id/status — Update booking status (admin only)
router.put("/:id/status", protect, async (req, res) => {
  try {
    const { status } = req.body;

    const result = await pool.query(
      `UPDATE bookings
       SET status = $1, updated_at = NOW()
       WHERE id = $2
       RETURNING *`,
      [status, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      message: "Booking status updated",
      data: result.rows[0],
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ DELETE /api/bookings/:id — Delete booking (admin only)
router.delete("/:id", protect, async (req, res) => {
  try {
    await pool.query("DELETE FROM bookings WHERE id = $1", [req.params.id]);
    res.json({ success: true, message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;