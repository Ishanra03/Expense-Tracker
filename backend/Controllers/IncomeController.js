const Income = require("../Models/income");

exports.addIncome = async (req, res) => {
  try {
    const { source, amount, date, rawDate, shortDate, note, icon } = req.body;

    if (!source || !amount) {
      return res.status(400).json({ message: "Source and amount are required" });
    }

    const income = await Income.create({
      userId: req.user.id,
      source,
      amount,
      date,
      rawDate,
      shortDate,
      note,
      icon,
    });

    res.status(201).json({ income });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getIncome = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateIncome = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedIncome = await Income.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      req.body,
      { new: true },
    );

    if (!updatedIncome) {
      return res.status(404).json({ message: "Income entry not found" });
    }

    res.status(200).json({ income: updatedIncome });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedIncome = await Income.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!deletedIncome) {
      return res.status(404).json({ message: "Income entry not found" });
    }

    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
