

// const jwt = require("jsonwebtoken");
// const User = require("../Models/user");

// const protect = async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {

//       token = req.headers.authorization.split(" ")[1];

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded.id).select("-password");

//       next();

//     } catch (error) {
//       return res.status(401).json({ message: "Not authorized" });
//     }
//   }

//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }
// };

// module.exports = { protect };

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // 1️⃣ Get token from header
    const authHeader = req.headers.authorization;

    // 2️⃣ Check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    // 3️⃣ Extract token
    const token = authHeader.split(" ")[1];

    // 4️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5️⃣ Attach user info to request
    req.user = decoded;

    // 6️⃣ Continue to next middleware/controller
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;