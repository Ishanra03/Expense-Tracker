const Income = require("../Models/income");

// ➕ Add Income
exports.addIncome = async (req, res) => {
  try {
    const { source, amount, date, note } = req.body;

    if (!source || !amount) {
      return res.status(400).json({ message: "Source and amount are required" });
    }

    const income = new Income({
      source,
      amount,
      date,
      note,
    });

    await income.save();

    res.status(201).json({
      message: "Income added successfully",
      income,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📊 Get All Income
exports.getIncome = async (req, res) => {
  try {
    const incomes = await Income.find().sort({ date: -1 });

    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};