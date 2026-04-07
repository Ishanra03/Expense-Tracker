const express = require("express");
const router = express.Router();

// Controllers
const {
  addIncome,
  getIncome,
} = require("../Controllers/IncomeController");

// Middleware
const authMiddleware = require("../middleware/authMiddleware");


// 🔥 Test route (optional)
router.get("/test", (req, res) => {
  res.send("Income route working ✅");
});


// ➕ Add Income (Protected)
router.post("/add", authMiddleware, addIncome);


// 📊 Get All Income (Protected)
router.get("/", authMiddleware, getIncome);


module.exports = router;