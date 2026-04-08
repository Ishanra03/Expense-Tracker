import { useMemo, useState } from "react";
import { LuDownload, LuPencil, LuPlus, LuTrash2, LuX } from "react-icons/lu";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useUser } from "../../context/UserContext";
import { downloadExcel } from "../../utils/excelExport";

const formatCurrency = (value) => `₹${Number(value).toLocaleString("en-IN")}`;

const toInputDate = (entry) => {
  if (entry.rawDate) {
    return entry.rawDate;
  }

  const parsed = new Date(entry.date);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return parsed.toISOString().slice(0, 10);
};

const Income = () => {
  const { incomeEntries, addIncomeEntry, updateIncomeEntry, deleteIncomeEntry } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIncomeId, setEditingIncomeId] = useState(null);
  const [form, setForm] = useState({
    source: "",
    amount: "",
    date: "",
  });

  const chartData = useMemo(() => {
    if (!incomeEntries.length) {
      return [{ label: "No Data", amount: 0, tone: "light" }];
    }

    return incomeEntries.slice(0, 10).map((item, index) => ({
      label: item.shortDate,
      amount: Number(item.amount),
      tone: index % 2 === 0 ? "dark" : "light",
    }));
  }, [incomeEntries]);

  const openCreateModal = () => {
    setEditingIncomeId(null);
    setForm({ source: "", amount: "", date: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (entry) => {
    setEditingIncomeId(entry.id);
    setForm({
      source: entry.source,
      amount: String(entry.amount),
      date: toInputDate(entry),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (entryId) => {
    try {
      await deleteIncomeEntry(entryId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingIncomeId(null);
    setForm({ source: "", amount: "", date: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.source.trim() || !form.amount || !form.date) {
      return;
    }

    const dateObj = new Date(form.date);
    const formattedDate = dateObj.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const day = dateObj.getDate();
    const month = dateObj.toLocaleDateString("en-GB", { month: "short" });

    const entryPayload = {
      source: form.source.trim(),
      amount: Number(form.amount),
      date: formattedDate,
      rawDate: form.date,
      shortDate: `${day} ${month}`,
      icon: "💼",
    };

    try {
      if (editingIncomeId) {
        await updateIncomeEntry({
          id: editingIncomeId,
          ...entryPayload,
        });
      } else {
        await addIncomeEntry({
          id: Date.now(),
          ...entryPayload,
          createdAt: Date.now(),
        });
      }
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = () => {
    if (!incomeEntries.length) {
      return;
    }

    const rows = incomeEntries.map((item) => ({
      Source: item.source,
      Amount: Number(item.amount),
      Date: item.date,
    }));

    downloadExcel({
      rows,
      sheetName: "Income",
      fileName: `income-report-${new Date().toISOString().slice(0, 10)}.xlsx`,
    });
  };

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_6px_20px_rgba(15,23,42,0.05)]">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">Income Overview</h2>
            <p className="text-lg text-slate-500">Track your earnings over time and analyze your income trends.</p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-100 px-4 py-2 text-lg font-semibold text-violet-700"
          >
            <LuPlus />
            Add Income
          </button>
        </div>

        <div className="h-[305px] w-full">
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
              <Tooltip formatter={(value) => formatCurrency(value)} cursor={{ fill: "rgba(167, 139, 250, 0.1)" }} />
              <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${entry.label}-${index}`} fill={entry.tone === "dark" ? "#6D47E6" : "#B9A9E8"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_6px_20px_rgba(15,23,42,0.05)]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-3xl font-semibold text-slate-900">Income Sources</h3>
          <button
            type="button"
            onClick={handleDownload}
            disabled={!incomeEntries.length}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LuDownload />
            Download
          </button>
        </div>

        {incomeEntries.length ? (
          <div className="grid gap-3 md:grid-cols-2">
            {incomeEntries.slice(0, 8).map((item) => (
              <div key={item.id} className="rounded-xl border border-slate-100 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-lg">{item.icon}</div>
                    <div>
                      <p className="text-lg font-semibold text-slate-900">{item.source}</p>
                      <p className="text-sm text-slate-500">{item.date}</p>
                    </div>
                  </div>

                  <p className="rounded-md bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">+ {formatCurrency(item.amount)}</p>
                </div>

                <div className="mt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(item)}
                    className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700"
                  >
                    <LuPencil />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="inline-flex items-center gap-1 rounded-md bg-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-600"
                  >
                    <LuTrash2 />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500">No income added yet.</p>
        )}
      </section>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h4 className="text-3xl font-semibold text-slate-900">{editingIncomeId ? "Edit Income" : "Add Income"}</h4>
              <button type="button" onClick={closeModal} className="text-2xl text-slate-500">
                <LuX />
              </button>
            </div>

            <form className="space-y-4 px-5 py-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium text-slate-700">Income Source</label>
                <input
                  name="source"
                  value={form.source}
                  onChange={handleChange}
                  placeholder="Freelance, Salary, etc"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Amount</label>
                <input
                  name="amount"
                  type="number"
                  value={form.amount}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Date</label>
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 outline-none"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" className="rounded-lg bg-violet-600 px-5 py-2 font-semibold text-white hover:bg-violet-700">
                  {editingIncomeId ? "Save Changes" : "Add Income"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Income;
