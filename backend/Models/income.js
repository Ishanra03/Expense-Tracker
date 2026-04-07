const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  source: String,
  amount: Number,
  date: String,
  note: String,
});

module.exports = mongoose.model("Income", incomeSchema);