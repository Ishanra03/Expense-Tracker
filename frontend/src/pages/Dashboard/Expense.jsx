import React, { useState } from "react";

const Expense = () => {
  const [form, setForm] = useState({
    category: "",
    amount: "",
    date: "",
    note: "",
  });

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Add Expense</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Category"
          className="p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Amount"
          className="p-2 border rounded"
        />

        <input type="date" className="p-2 border rounded" />

        <input
          type="text"
          placeholder="Note"
          className="p-2 border rounded"
        />
      </div>

      <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
        Add Expense
      </button>
    </div>
  );
};

export default Expense;