const express = require("express");
const router = express.Router();

// Controllers
const {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
} = require("../Controllers/ExpenseController");

// Middleware
const authMiddleware = require("../middleware/authMiddleware");


// 🔥 Test route (optional - for debugging)
router.get("/test", (req, res) => {
  res.send("Expense route working ✅");
});


// ➕ Add Expense (Protected)
router.post("/add", authMiddleware, addExpense);


// 📊 Get All Expenses (Protected)
router.get("/", authMiddleware, getExpenses);


// ❌ Delete Expense (Protected)
router.delete("/:id", authMiddleware, deleteExpense);


// ✏️ Update Expense (Protected)
router.put("/:id", authMiddleware, updateExpense);


module.exports = router;