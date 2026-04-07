export const calculateSummary = (transactions = []) => {
  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  });

  return {
    income,
    expense,
    balance: income - expense,
  };
};

export const getRecentTransactions = (transactions = [], limit = 5) => {
  return [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
};

export const formatCurrency = (amount = 0) => {
  return `₹${amount.toLocaleString("en-IN")}`;
};