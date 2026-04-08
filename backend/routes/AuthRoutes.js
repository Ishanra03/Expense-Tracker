const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserInfo,
  updateUserProfile,
} = require("../Controllers/AuthController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", authMiddleware, getUserInfo);
router.put("/user", authMiddleware, updateUserProfile);

module.exports = router;
