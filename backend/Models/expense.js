const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: String, default: "" },
    rawDate: { type: String, default: "" },
    shortDate: { type: String, default: "" },
    note: { type: String, default: "" },
    icon: { type: String, default: "💳" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Expense", expenseSchema);
