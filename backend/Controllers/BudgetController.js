const Budget = require("../Models/budget");

exports.addBudget = async (req, res) => {
  try {
    const { title, category, amount, month } = req.body;

    if (!title || !category || !amount || !month) {
      return res.status(400).json({ message: "Title, category, amount and month are required" });
    }

    const budget = await Budget.create({
      userId: req.user.id,
      title,
      category,
      amount,
      month,
    });

    res.status(201).json({ budget });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBudget = async (req, res) => {
  try {
    const { id } = req.params;

    const budget = await Budget.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      req.body,
      { new: true },
    );

    if (!budget) {
      return res.status(404).json({ message: "Budget entry not found" });
    }

    res.status(200).json({ budget });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;

    const budget = await Budget.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!budget) {
      return res.status(404).json({ message: "Budget entry not found" });
    }

    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
