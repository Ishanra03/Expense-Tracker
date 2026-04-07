const express = require("express");
const router = express.Router();

const Expense = require("../Models/expense");
const Income = require("../Models/income");

const authMiddleware = require("../middleware/authMiddleware");

// 📊 Dashboard API
router.get("/", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find();
    const incomes = await Income.find();

    const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const totalIncome = incomes.reduce((acc, curr) => acc + curr.amount, 0);

    const balance = totalIncome - totalExpense;

    res.status(200).json({
      totalIncome,
      totalExpense,
      balance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;