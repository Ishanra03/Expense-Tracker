const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserInfo, // ✅ correct name
} = require("../Controllers/AuthController");

const authMiddleware = require("../middleware/authMiddleware");

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", authMiddleware, getUserInfo); // ✅ FIXED

module.exports = router;