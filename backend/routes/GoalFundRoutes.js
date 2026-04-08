const express = require("express");
const router = express.Router();

const {
  addGoalFund,
  getGoalFunds,
  updateGoalFund,
  deleteGoalFund,
} = require("../Controllers/GoalFundController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, addGoalFund);
router.get("/", authMiddleware, getGoalFunds);
router.put("/:id", authMiddleware, updateGoalFund);
router.delete("/:id", authMiddleware, deleteGoalFund);

module.exports = router;
