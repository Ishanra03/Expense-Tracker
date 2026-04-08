const GoalFund = require("../Models/goalFund");

exports.addGoalFund = async (req, res) => {
  try {
    const { title, target, splitPercent, emoji } = req.body;

    if (!title || !target || !splitPercent) {
      return res.status(400).json({ message: "Title, target and split percent are required" });
    }

    const goalFund = await GoalFund.create({
      userId: req.user.id,
      title,
      target,
      splitPercent,
      emoji,
    });

    res.status(201).json({ goalFund });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGoalFunds = async (req, res) => {
  try {
    const goalFunds = await GoalFund.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(goalFunds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateGoalFund = async (req, res) => {
  try {
    const { id } = req.params;

    const goalFund = await GoalFund.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      req.body,
      { new: true },
    );

    if (!goalFund) {
      return res.status(404).json({ message: "Goal fund not found" });
    }

    res.status(200).json({ goalFund });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteGoalFund = async (req, res) => {
  try {
    const { id } = req.params;

    const goalFund = await GoalFund.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!goalFund) {
      return res.status(404).json({ message: "Goal fund not found" });
    }

    res.status(200).json({ message: "Goal fund deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
