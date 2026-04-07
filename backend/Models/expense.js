const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  category: String,
  amount: Number,
  date: String,
  note: String,
});

module.exports = mongoose.model("Expense", expenseSchema);