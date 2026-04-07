const Expense = require("../Models/expense");

// ➕ Add Expense
exports.addExpense = async (req, res) => {
  try {
    const { category, amount, date, note } = req.body;

    // Basic validation
    if (!category || !amount) {
      return res.status(400).json({ message: "Category and amount are required" });
    }

    const expense = new Expense({
      category,
      amount,
      date,
      note,
    });

    await expense.save();

    res.status(201).json({
      message: "Expense added successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 📊 Get All Expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ❌ Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    await Expense.findByIdAndDelete(id);

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✏️ Update Expense
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Expense updated successfully",
      updatedExpense,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};