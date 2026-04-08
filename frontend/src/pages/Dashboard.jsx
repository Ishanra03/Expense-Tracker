import { Link } from "react-router-dom";
import { useMemo } from "react";
import { LuArrowRight, LuBadgeIndianRupee, LuHandCoins, LuTarget, LuWalletMinimal } from "react-icons/lu";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useUser } from "../context/UserContext";

const formatCurrency = (value) => `₹${Number(value).toLocaleString("en-IN")}`;

const Dashboard = () => {
  const { incomeEntries, expenseEntries, budgetEntries } = useUser();

  const totalIncome = useMemo(
    () => incomeEntries.reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [incomeEntries],
  );

  const totalExpense = useMemo(
    () => expenseEntries.reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [expenseEntries],
  );

  const totalBudget = useMemo(
    () => budgetEntries.reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [budgetEntries],
  );

  const totalBalance = totalIncome - totalExpense;
  const budgetLeft = totalBudget - totalExpense;
  const budgetUsedPct = totalBudget > 0 ? Math.min(100, Math.round((totalExpense / totalBudget) * 100)) : 0;

  const statCards = [
    {
      key: "balance",
      title: "Total Balance",
      value: totalBalance,
      icon: LuWalletMinimal,
      iconBg: "bg-violet-600",
    },
    {
      key: "income",
      title: "Total Income",
      value: totalIncome,
      icon: LuBadgeIndianRupee,
      iconBg: "bg-orange-500",
    },
    {
      key: "expense",
      title: "Total Expenses",
      value: totalExpense,
      icon: LuHandCoins,
      iconBg: "bg-rose-500",
    },
    {
      key: "budget",
      title: "Total Budget",
      value: totalBudget,
      icon: LuTarget,
      iconBg: "bg-emerald-600",
    },
  ];

  const chartData = [
    { name: "Total Balance", value: Math.max(totalBalance, 0), color: "#6D47E6" },
    { name: "Total Expenses", value: totalExpense, color: "#F43F5E" },
    { name: "Total Income", value: totalIncome, color: "#FF7A00" },
  ];

  const recentTransactions = useMemo(() => {
    const incomeTx = incomeEntries.map((item) => ({
      id: `income-${item.id}`,
      title: item.source,
      date: item.date,
      amount: Number(item.amount),
      icon: item.icon || "💼",
      createdAt: item.createdAt || item.id || 0,
    }));

    const expenseTx = expenseEntries.map((item) => ({
      id: `expense-${item.id}`,
      title: item.category,
      date: item.date,
      amount: -Number(item.amount),
      icon: item.icon || "💳",
      createdAt: item.createdAt || item.id || 0,
    }));

    return [...incomeTx, ...expenseTx]
      .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
      .slice(0, 5);
  }, [incomeEntries, expenseEntries]);

  return (
    <div className="space-y-5">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.key}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_6px_20px_rgba(15,23,42,0.05)]"
            >
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl text-white ${card.iconBg}`}>
                  <Icon />
                </div>

                <div>
                  <p className="text-sm text-slate-500">{card.title}</p>
                  <p className="text-[30px] font-bold leading-9 text-slate-900">{formatCurrency(card.value)}</p>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_6px_20px_rgba(15,23,42,0.05)]">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-semibold text-slate-900">Budget Overview</h3>
            <p className="text-slate-500">Track monthly goals and see how much budget is left.</p>
          </div>
          <Link
            to="/budget"
            className="inline-flex items-center gap-2 rounded-xl bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700"
          >
            Open Budget
            <LuArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-slate-100 p-4">
            <p className="text-sm text-slate-500">Budget Entries</p>
            <p className="text-2xl font-bold text-slate-900">{budgetEntries.length}</p>
          </div>
          <div className="rounded-xl bg-emerald-50 p-4">
            <p className="text-sm text-emerald-700">Budget Left</p>
            <p className={`text-2xl font-bold ${budgetLeft < 0 ? "text-rose-600" : "text-emerald-700"}`}>
              {formatCurrency(budgetLeft)}
            </p>
          </div>
          <div className="rounded-xl bg-violet-50 p-4">
            <p className="text-sm text-violet-700">Used</p>
            <p className="text-2xl font-bold text-violet-700">{budgetUsedPct}%</p>
          </div>
        </div>

        <div className="mt-4 h-3 w-full rounded-full bg-slate-100">
          <div
            className={`h-3 rounded-full ${budgetUsedPct > 100 ? "bg-rose-500" : "bg-violet-600"}`}
            style={{ width: `${Math.min(100, budgetUsedPct)}%` }}
          />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.25fr_1fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_6px_20px_rgba(15,23,42,0.05)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-3xl font-semibold text-slate-900">Recent Transactions</h3>
            <button className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              See All
              <LuArrowRight />
            </button>
          </div>

          {recentTransactions.length ? (
            <div className="space-y-1">
              {recentTransactions.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-lg">
                      {item.icon}
                    </div>

                    <div>
                      <p className="text-lg font-semibold text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-500">{item.date}</p>
                    </div>
                  </div>

                  <p
                    className={`rounded-md px-3 py-1 text-sm font-semibold ${
                      item.amount > 0 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-500"
                    }`}
                  >
                    {item.amount > 0 ? "+" : "-"}
                    {formatCurrency(Math.abs(item.amount))}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">No transactions yet. Add income or expense to get started.</p>
          )}
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_6px_20px_rgba(15,23,42,0.05)]">
          <h3 className="text-3xl font-semibold text-slate-900">Financial Overview</h3>

          <div className="relative mx-auto mt-4 h-[300px] w-full max-w-[320px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  innerRadius={78}
                  outerRadius={108}
                  dataKey="value"
                  stroke="none"
                  paddingAngle={1}
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-sm text-slate-500">Total Balance</p>
              <p className="text-[36px] font-bold leading-10 text-slate-900">{formatCurrency(totalBalance)}</p>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-slate-700">
            {chartData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: entry.color }} />
                <span>{entry.name}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};

export default Dashboard;
