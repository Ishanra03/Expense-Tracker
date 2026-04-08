const Expense = require("../Models/expense");

exports.addExpense = async (req, res) => {
  try {
    const { category, amount, date, rawDate, shortDate, note, icon } = req.body;

    if (!category || !amount) {
      return res.status(400).json({ message: "Category and amount are required" });
    }

    const expense = await Expense.create({
      userId: req.user.id,
      category,
      amount,
      date,
      rawDate,
      shortDate,
      note,
      icon,
    });

    res.status(201).json({ expense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExpense = await Expense.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense entry not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      req.body,
      { new: true },
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense entry not found" });
    }

    res.status(200).json({ expense: updatedExpense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
