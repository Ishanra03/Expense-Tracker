import { useMemo, useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { LuPencil, LuPlus, LuTrash2, LuX } from "react-icons/lu";
import { useUser } from "../../context/UserContext";

const formatCurrency = (value) => `₹${Number(value).toLocaleString("en-IN")}`;

const normalize = (value) => String(value || "").trim().toLowerCase();

const monthKeyFromDateEntry = (entry) => {
  if (entry?.rawDate && /^\d{4}-\d{2}-\d{2}$/.test(entry.rawDate)) {
    return entry.rawDate.slice(0, 7);
  }

  const parsed = new Date(entry?.date || "");
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  return `${parsed.getFullYear()}-${month}`;
};

const monthLabel = (monthKey) => {
  if (!monthKey) return "Unknown";
  const parsed = new Date(`${monthKey}-01`);
  if (Number.isNaN(parsed.getTime())) return monthKey;
  return parsed.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const daysInMonth = (monthKey) => {
  const [year, month] = monthKey.split("-").map(Number);
  if (!year || !month) return 30;
  return new Date(year, month, 0).getDate();
};

const isCurrentMonth = (monthKey) => {
  const now = new Date();
  const nowMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  return nowMonth === monthKey;
};

const currentMonthKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};

const PLAN_COLORS = ["#6D47E6", "#FF7A00", "#22C55E", "#F43F5E", "#14B8A6", "#A855F7"];

const Budget = () => {
  const {
    budgetEntries,
    expenseEntries,
    incomeEntries,
    goalFundEntries,
    addBudgetEntry,
    updateBudgetEntry,
    deleteBudgetEntry,
    addGoalFundEntry,
    updateGoalFundEntry,
    deleteGoalFundEntry,
  } = useUser();

  const [selectedMonth, setSelectedMonth] = useState(currentMonthKey());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudgetId, setEditingBudgetId] = useState(null);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    category: "",
    amount: "",
    month: currentMonthKey(),
  });
  const [goalForm, setGoalForm] = useState({
    title: "",
    target: "",
    splitPercent: "",
    emoji: "🎯",
  });

  const monthBudgets = useMemo(
    () => budgetEntries.filter((entry) => entry.month === selectedMonth),
    [budgetEntries, selectedMonth],
  );

  const monthExpenses = useMemo(
    () => expenseEntries.filter((entry) => monthKeyFromDateEntry(entry) === selectedMonth),
    [expenseEntries, selectedMonth],
  );

  const monthIncome = useMemo(
    () => incomeEntries.filter((entry) => monthKeyFromDateEntry(entry) === selectedMonth),
    [incomeEntries, selectedMonth],
  );

  const expenseCategoryOptions = useMemo(
    () =>
      Array.from(
        new Set(
          expenseEntries
            .map((entry) => String(entry.category || "").trim())
            .filter(Boolean),
        ),
      ),
    [expenseEntries],
  );

  const totalPlanned = useMemo(
    () => monthBudgets.reduce((sum, entry) => sum + Number(entry.amount || 0), 0),
    [monthBudgets],
  );

  const totalSpent = useMemo(
    () => monthExpenses.reduce((sum, entry) => sum + Number(entry.amount || 0), 0),
    [monthExpenses],
  );

  const totalIncomeForMonth = useMemo(
    () => monthIncome.reduce((sum, entry) => sum + Number(entry.amount || 0), 0),
    [monthIncome],
  );

  const categorySpentMap = useMemo(() => {
    const map = {};
    monthExpenses.forEach((entry) => {
      const key = normalize(entry.category);
      map[key] = (map[key] || 0) + Number(entry.amount || 0);
    });
    return map;
  }, [monthExpenses]);

  const planData = useMemo(() => {
    if (!monthBudgets.length || totalPlanned <= 0) {
      return [];
    }

    return monthBudgets.map((entry, index) => ({
      name: entry.title,
      category: entry.category || entry.title,
      value: Number(entry.amount || 0),
      percent: Math.round((Number(entry.amount || 0) / totalPlanned) * 100),
      color: PLAN_COLORS[index % PLAN_COLORS.length],
    }));
  }, [monthBudgets, totalPlanned]);

  const progressRows = useMemo(
    () =>
      monthBudgets.map((entry) => {
        const planned = Number(entry.amount || 0);
        const trackingCategory = normalize(entry.category || entry.title);
        const spent = categorySpentMap[trackingCategory] || 0;
        const pct = planned > 0 ? Math.round((spent / planned) * 100) : 0;

        let colorClass = "bg-emerald-500";
        let status = "On Track";

        if (pct >= 100) {
          colorClass = "bg-rose-500";
          status = "Overspending";
        } else if (pct >= 70) {
          colorClass = "bg-amber-500";
          status = "Watch";
        }

        return {
          id: entry.id,
          title: entry.title,
          category: entry.category || entry.title,
          planned,
          spent,
          pct,
          status,
          colorClass,
        };
      }),
    [monthBudgets, categorySpentMap],
  );

  const comparisonRows = useMemo(() => {
    const monthSet = new Set();

    budgetEntries.forEach((entry) => {
      if (entry.month) monthSet.add(entry.month);
    });

    expenseEntries.forEach((entry) => {
      const key = monthKeyFromDateEntry(entry);
      if (key) monthSet.add(key);
    });

    const sortedMonths = Array.from(monthSet).sort((a, b) => b.localeCompare(a));

    return sortedMonths.map((month) => {
      const planned = budgetEntries
        .filter((entry) => entry.month === month)
        .reduce((sum, entry) => sum + Number(entry.amount || 0), 0);

      const actual = expenseEntries
        .filter((entry) => monthKeyFromDateEntry(entry) === month)
        .reduce((sum, entry) => sum + Number(entry.amount || 0), 0);

      const variancePct = planned > 0 ? ((actual - planned) / planned) * 100 : 0;

      return {
        month,
        monthText: monthLabel(month),
        planned,
        actual,
        variancePct,
      };
    });
  }, [budgetEntries, expenseEntries]);

  const rewardData = useMemo(() => {
    const savings = totalIncomeForMonth - totalSpent;
    const safeSavings = Math.max(0, savings);
    const daysPassed = isCurrentMonth(selectedMonth)
      ? new Date().getDate()
      : daysInMonth(selectedMonth);
    const dailySavings = daysPassed > 0 ? safeSavings / daysPassed : 0;

    return goalFundEntries.map((goal) => {
      const splitPercent = Number(goal.splitPercent || 0);
      const saved = safeSavings * (splitPercent / 100);
      const progressPct = goal.target > 0 ? Math.min(100, Math.round((saved / goal.target) * 100)) : 0;
      const remaining = Math.max(0, goal.target - saved);
      const daysToGoal = dailySavings > 0 ? Math.ceil(remaining / dailySavings) : null;

      return {
        ...goal,
        saved,
        remaining,
        progressPct,
        daysToGoal,
      };
    });
  }, [goalFundEntries, selectedMonth, totalIncomeForMonth, totalSpent]);

  const openCreateModal = () => {
    setEditingBudgetId(null);
    setForm({ title: "", category: "", amount: "", month: selectedMonth });
    setIsModalOpen(true);
  };

  const openEditModal = (entry) => {
    setEditingBudgetId(entry.id);
    setForm({
      title: entry.title,
      category: entry.category || entry.title,
      amount: String(entry.amount),
      month: entry.month,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingBudgetId(null);
    setForm({ title: "", category: "", amount: "", month: selectedMonth });
    setIsModalOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openCreateGoalModal = () => {
    setEditingGoalId(null);
    setGoalForm({ title: "", target: "", splitPercent: "", emoji: "🎯" });
    setIsGoalModalOpen(true);
  };

  const openEditGoalModal = (goal) => {
    setEditingGoalId(goal.id);
    setGoalForm({
      title: goal.title || "",
      target: String(goal.target || ""),
      splitPercent: String(goal.splitPercent || ""),
      emoji: goal.emoji || "🎯",
    });
    setIsGoalModalOpen(true);
  };

  const closeGoalModal = () => {
    setEditingGoalId(null);
    setGoalForm({ title: "", target: "", splitPercent: "", emoji: "🎯" });
    setIsGoalModalOpen(false);
  };

  const handleGoalChange = (event) => {
    const { name, value } = event.target;
    setGoalForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.category.trim() || !form.amount || !form.month) {
      return;
    }

    const payload = {
      title: form.title.trim(),
      category: form.category.trim(),
      amount: Number(form.amount),
      month: form.month,
      updatedAt: Date.now(),
    };

    try {
      if (editingBudgetId) {
        await updateBudgetEntry({ id: editingBudgetId, ...payload });
      } else {
        await addBudgetEntry({ id: Date.now(), createdAt: Date.now(), ...payload });
      }
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoalSubmit = async (event) => {
    event.preventDefault();

    if (!goalForm.title.trim() || !goalForm.target || !goalForm.splitPercent) {
      return;
    }

    const payload = {
      title: goalForm.title.trim(),
      target: Number(goalForm.target),
      splitPercent: Number(goalForm.splitPercent),
      emoji: goalForm.emoji || "🎯",
    };

    try {
      if (editingGoalId) {
        await updateGoalFundEntry({ id: editingGoalId, ...payload });
      } else {
        await addGoalFundEntry({ id: `goal-${Date.now()}`, ...payload });
      }
      closeGoalModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_6px_20px_rgba(15,23,42,0.05)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">Budget Intelligence</h2>
            <p className="text-slate-500">Plan, track progress, compare months, and grow your goal fund.</p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="month"
              value={selectedMonth}
              onChange={(event) => setSelectedMonth(event.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 outline-none"
            />
            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-100 px-4 py-2 text-lg font-semibold text-violet-700"
            >
              <LuPlus />
              Add Budget
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_6px_20px_rgba(15,23,42,0.05)]">
          <h3 className="text-2xl font-semibold text-slate-900">The Plan (Doughnut Chart)</h3>
          <p className="mt-1 text-slate-500">This shows your planned split for {monthLabel(selectedMonth)}.</p>

          {planData.length ? (
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[1fr_220px]">
              <div className="h-[260px] w-full">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={planData} dataKey="value" innerRadius={70} outerRadius={102} paddingAngle={2}>
                      {planData.map((slice) => (
                        <Cell key={slice.name} fill={slice.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2">
                {planData.map((slice) => (
                  <div key={slice.name} className="rounded-lg bg-slate-50 p-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: slice.color }} />
                      <p className="font-medium text-slate-800">{slice.name}</p>
                    </div>
                    <p className="text-sm text-slate-500">
                      {slice.category} · {slice.percent}% · {formatCurrency(slice.value)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-4 text-slate-500">Add budget categories for this month to see your plan chart.</p>
          )}
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_6px_20px_rgba(15,23,42,0.05)]">
          <h3 className="text-2xl font-semibold text-slate-900">The Progress (Status Bars)</h3>
          <p className="mt-1 text-slate-500">Bars fill up as you spend. Green is healthy, red means fast spending.</p>

          {progressRows.length ? (
            <div className="mt-4 space-y-3">
              {progressRows.map((row) => (
                <div key={row.id} className="rounded-xl border border-slate-100 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-semibold text-slate-900">{row.title} ({row.category})</p>
                    <p className="text-sm text-slate-500">
                      {formatCurrency(row.spent)} / {formatCurrency(row.planned)}
                    </p>
                  </div>

                  <div className="h-3 w-full rounded-full bg-slate-100">
                    <div
                      className={`h-3 rounded-full ${row.colorClass}`}
                      style={{ width: `${Math.min(100, row.pct)}%` }}
                    />
                  </div>

                  <p className="mt-2 text-sm font-medium text-slate-600">{row.pct}% used · {row.status}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-slate-500">No budget categories available for this month.</p>
          )}
        </article>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_6px_20px_rgba(15,23,42,0.05)]">
          <h3 className="text-2xl font-semibold text-slate-900">The Comparison (Table)</h3>
          <p className="mt-1 text-slate-500">Variance % compares planned budget vs actual spending month by month.</p>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
                  <th className="py-2">Month</th>
                  <th className="py-2">Planned</th>
                  <th className="py-2">Actual</th>
                  <th className="py-2">Variance %</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.length ? (
                  comparisonRows.map((row) => {
                    const positiveVariance = row.variancePct > 0;
                    return (
                      <tr key={row.month} className="border-b border-slate-100 text-sm">
                        <td className="py-2 font-medium text-slate-800">{row.monthText}</td>
                        <td className="py-2 text-slate-700">{formatCurrency(row.planned)}</td>
                        <td className="py-2 text-slate-700">{formatCurrency(row.actual)}</td>
                        <td className={`py-2 font-semibold ${positiveVariance ? "text-rose-600" : "text-emerald-600"}`}>
                          {row.variancePct.toFixed(1)}%
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="py-3 text-slate-500">No comparison data yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_6px_20px_rgba(15,23,42,0.05)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900">The Rewards (Goal Fund)</h3>
              <p className="mt-1 text-slate-500">Your daily savings for {monthLabel(selectedMonth)} push these goals forward.</p>
            </div>
            <button
              type="button"
              onClick={openCreateGoalModal}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700"
            >
              <LuPlus />
              Add Goal
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {rewardData.length ? (
              rewardData.map((goal) => (
                <div key={goal.id} className="rounded-xl border border-slate-100 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-semibold text-slate-900">
                      {goal.emoji} {goal.title}
                    </p>
                    <p className="text-sm text-slate-500">{goal.progressPct}%</p>
                  </div>

                  <div className="h-3 w-full rounded-full bg-slate-100">
                    <div className="h-3 rounded-full bg-violet-600" style={{ width: `${goal.progressPct}%` }} />
                  </div>

                  <div className="mt-2 flex flex-wrap justify-between gap-2 text-sm text-slate-600">
                    <span>Saved: {formatCurrency(goal.saved)}</span>
                    <span>Target: {formatCurrency(goal.target)}</span>
                    <span>
                      {goal.daysToGoal === null
                        ? "Add income to estimate completion"
                        : `${goal.daysToGoal} days to reach`}
                    </span>
                  </div>

                  <div className="mt-3 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => openEditGoalModal(goal)}
                      className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700"
                    >
                      <LuPencil />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await deleteGoalFundEntry(goal.id);
                        } catch (error) {
                          console.error(error);
                        }
                      }}
                      className="inline-flex items-center gap-1 rounded-md bg-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-600"
                    >
                      <LuTrash2 />
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500">No goals yet. Add one to start tracking rewards.</p>
            )}
          </div>
        </article>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_6px_20px_rgba(15,23,42,0.05)]">
        <h3 className="text-2xl font-semibold text-slate-900">Budget Categories</h3>
        <p className="mt-1 text-slate-500">Manage plan categories for {monthLabel(selectedMonth)}.</p>

        {monthBudgets.length ? (
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {monthBudgets.map((entry) => (
              <div key={entry.id} className="rounded-xl border border-slate-100 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{entry.title}</p>
                    <p className="text-sm text-slate-500">Tracks: {entry.category || entry.title}</p>
                    <p className="text-sm text-slate-500">Month: {entry.month}</p>
                  </div>
                  <p className="rounded-md bg-violet-50 px-3 py-1 text-sm font-semibold text-violet-700">
                    {formatCurrency(entry.amount)}
                  </p>
                </div>

                <div className="mt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(entry)}
                    className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700"
                  >
                    <LuPencil />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await deleteBudgetEntry(entry.id);
                      } catch (error) {
                        console.error(error);
                      }
                    }}
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
          <p className="mt-4 text-slate-500">No budget categories for this month yet.</p>
        )}
      </section>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 p-4">
          <div className="w-full max-w-xl rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h4 className="text-2xl font-semibold text-slate-900">{editingBudgetId ? "Edit Budget" : "Add Budget"}</h4>
              <button type="button" onClick={closeModal} className="text-2xl text-slate-500">
                <LuX />
              </button>
            </div>

            <form className="space-y-4 px-5 py-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium text-slate-700">Budget Name</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Rent, Food, Travel"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Track Expense Category</label>
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  list="expense-categories"
                  placeholder="Food, Rent, Travel"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 outline-none"
                />
                <datalist id="expense-categories">
                  {expenseCategoryOptions.map((category) => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Budget Amount</label>
                <input
                  name="amount"
                  type="number"
                  value={form.amount}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Month</label>
                <input
                  name="month"
                  type="month"
                  value={form.month}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 outline-none"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" className="rounded-lg bg-violet-600 px-5 py-2 font-semibold text-white hover:bg-violet-700">
                  {editingBudgetId ? "Save Changes" : "Add Budget"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {isGoalModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 p-4">
          <div className="w-full max-w-xl rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h4 className="text-2xl font-semibold text-slate-900">{editingGoalId ? "Edit Goal Fund" : "Add Goal Fund"}</h4>
              <button type="button" onClick={closeGoalModal} className="text-2xl text-slate-500">
                <LuX />
              </button>
            </div>

            <form className="space-y-4 px-5 py-4" onSubmit={handleGoalSubmit}>
              <div>
                <label className="text-sm font-medium text-slate-700">Goal Name</label>
                <input
                  name="title"
                  value={goalForm.title}
                  onChange={handleGoalChange}
                  placeholder="New Laptop, Trip Fund"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Target Amount</label>
                <input
                  name="target"
                  type="number"
                  min="1"
                  value={goalForm.target}
                  onChange={handleGoalChange}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Savings Split %</label>
                <input
                  name="splitPercent"
                  type="number"
                  min="1"
                  max="100"
                  value={goalForm.splitPercent}
                  onChange={handleGoalChange}
                  placeholder="e.g. 40"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Emoji</label>
                <input
                  name="emoji"
                  value={goalForm.emoji}
                  onChange={handleGoalChange}
                  placeholder="🎯"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 outline-none"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" className="rounded-lg bg-violet-600 px-5 py-2 font-semibold text-white hover:bg-violet-700">
                  {editingGoalId ? "Save Goal" : "Add Goal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Budget;
