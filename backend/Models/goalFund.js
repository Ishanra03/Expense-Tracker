const mongoose = require("mongoose");

const goalFundSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true },
    target: { type: Number, required: true },
    splitPercent: { type: Number, required: true },
    emoji: { type: String, default: "🎯" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("GoalFund", goalFundSchema);
