/*const jwt = require("jsonwebtoken");

// ✅ Middleware that protects admin-only routes
// Checks for a valid JWT token in the request header
const protect = (req, res, next) => {
  let token;

  // ✅ Check Authorization header for Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // ✅ Extract token from "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];

      // ✅ Verify token using our JWT secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Attach admin info to the request
      req.admin = decoded;

      // ✅ Continue to the next middleware or route
      next();

    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Not authorized — invalid token",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized — no token provided",
    });
  }
};

module.exports = { protect };*/

const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token failed",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }
};

// ✅ Export both ways so both imports work!
module.exports = protect;
module.exports.protect = protect;