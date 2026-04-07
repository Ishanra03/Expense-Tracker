import React, { useState } from "react";

const Income = () => {
  const [form, setForm] = useState({
    source: "",
    amount: "",
    date: "",
    note: "",
  });

  const [incomeList, setIncomeList] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddIncome = () => {
    if (!form.source || !form.amount) return;

    setIncomeList([...incomeList, form]);

    setForm({
      source: "",
      amount: "",
      date: "",
      note: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Add Income</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          name="source"
          value={form.source}
          onChange={handleChange}
          type="text"
          placeholder="Source"
          className="p-2 border rounded"
        />

        <input
          name="amount"
          value={form.amount}
          onChange={handleChange}
          type="number"
          placeholder="Amount"
          className="p-2 border rounded"
        />

        <input
          name="date"
          value={form.date}
          onChange={handleChange}
          type="date"
          className="p-2 border rounded"
        />

        <input
          name="note"
          value={form.note}
          onChange={handleChange}
          type="text"
          placeholder="Note"
          className="p-2 border rounded"
        />
      </div>

      <button
        onClick={handleAddIncome}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Income
      </button>

      {/* ✅ SHOW DATA */}
      <div className="mt-6">
        {incomeList.map((item, index) => (
          <div
            key={index}
            className="p-3 border rounded mb-2 flex justify-between"
          >
            <span>{item.source}</span>
            <span>₹{item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Income;