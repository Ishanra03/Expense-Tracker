import { useEffect, useState } from "react";
import { API_PATHS } from "../utils/apiPaths";
import { getAuthHeaders } from "../utils/auth";
import { UserContext } from "./UserContext";

const parseStoredValue = (key, fallback) => {
  const value = localStorage.getItem(key);
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const mapDoc = (doc) => {
  const { _id, __v, ...rest } = doc || {};
  return {
    id: _id || doc?.id,
    ...rest,
  };
};

const requestWithAuth = async (url, method = "GET", body) => {
  const options = {
    method,
    headers: getAuthHeaders(),
  };

  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || "Request failed");
  }

  return result;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => parseStoredValue("user", null));
  const [incomeEntries, setIncomeEntries] = useState([]);
  const [expenseEntries, setExpenseEntries] = useState([]);
  const [budgetEntries, setBudgetEntries] = useState([]);
  const [goalFundEntries, setGoalFundEntries] = useState([]);

  const updateUser = (data) => {
    setUser(data);
  };

  const fetchFinanceData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return {
        income: [],
        expense: [],
        budget: [],
        goalFund: [],
      };
    }

    const [incomeRes, expenseRes, budgetRes, goalRes] = await Promise.all([
      requestWithAuth(API_PATHS.GET_INCOME),
      requestWithAuth(API_PATHS.GET_EXPENSE),
      requestWithAuth(API_PATHS.GET_BUDGET),
      requestWithAuth(API_PATHS.GET_GOAL_FUND),
    ]);

    return {
      income: (incomeRes || []).map(mapDoc),
      expense: (expenseRes || []).map(mapDoc),
      budget: (budgetRes || []).map(mapDoc),
      goalFund: (goalRes || []).map(mapDoc),
    };
  };

  const addIncomeEntry = async (entry) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIncomeEntries((prev) => [entry, ...prev]);
      return;
    }

    const result = await requestWithAuth(API_PATHS.ADD_INCOME, "POST", entry);
    setIncomeEntries((prev) => [mapDoc(result.income), ...prev]);
  };

  const updateIncomeEntry = async (updatedEntry) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIncomeEntries((prev) =>
        prev.map((entry) => (entry.id === updatedEntry.id ? { ...entry, ...updatedEntry } : entry)),
      );
      return;
    }

    const result = await requestWithAuth(
      API_PATHS.UPDATE_INCOME(updatedEntry.id),
      "PUT",
      updatedEntry,
    );

    setIncomeEntries((prev) =>
      prev.map((entry) => (entry.id === updatedEntry.id ? mapDoc(result.income) : entry)),
    );
  };

  const deleteIncomeEntry = async (entryId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIncomeEntries((prev) => prev.filter((entry) => entry.id !== entryId));
      return;
    }

    await requestWithAuth(API_PATHS.DELETE_INCOME(entryId), "DELETE");
    setIncomeEntries((prev) => prev.filter((entry) => entry.id !== entryId));
  };

  const addExpenseEntry = async (entry) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setExpenseEntries((prev) => [entry, ...prev]);
      return;
    }

    const result = await requestWithAuth(API_PATHS.ADD_EXPENSE, "POST", entry);
    setExpenseEntries((prev) => [mapDoc(result.expense), ...prev]);
  };

  const updateExpenseEntry = async (updatedEntry) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setExpenseEntries((prev) =>
        prev.map((entry) => (entry.id === updatedEntry.id ? { ...entry, ...updatedEntry } : entry)),
      );
      return;
    }

    const result = await requestWithAuth(
      API_PATHS.UPDATE_EXPENSE(updatedEntry.id),
      "PUT",
      updatedEntry,
    );

    setExpenseEntries((prev) =>
      prev.map((entry) => (entry.id === updatedEntry.id ? mapDoc(result.expense) : entry)),
    );
  };

  const deleteExpenseEntry = async (entryId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setExpenseEntries((prev) => prev.filter((entry) => entry.id !== entryId));
      return;
    }

    await requestWithAuth(API_PATHS.DELETE_EXPENSE(entryId), "DELETE");
    setExpenseEntries((prev) => prev.filter((entry) => entry.id !== entryId));
  };

  const addBudgetEntry = async (entry) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setBudgetEntries((prev) => [entry, ...prev]);
      return;
    }

    const result = await requestWithAuth(API_PATHS.ADD_BUDGET, "POST", entry);
    setBudgetEntries((prev) => [mapDoc(result.budget), ...prev]);
  };

  const updateBudgetEntry = async (updatedEntry) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setBudgetEntries((prev) =>
        prev.map((entry) => (entry.id === updatedEntry.id ? { ...entry, ...updatedEntry } : entry)),
      );
      return;
    }

    const result = await requestWithAuth(
      API_PATHS.UPDATE_BUDGET(updatedEntry.id),
      "PUT",
      updatedEntry,
    );

    setBudgetEntries((prev) =>
      prev.map((entry) => (entry.id === updatedEntry.id ? mapDoc(result.budget) : entry)),
    );
  };

  const deleteBudgetEntry = async (entryId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setBudgetEntries((prev) => prev.filter((entry) => entry.id !== entryId));
      return;
    }

    await requestWithAuth(API_PATHS.DELETE_BUDGET(entryId), "DELETE");
    setBudgetEntries((prev) => prev.filter((entry) => entry.id !== entryId));
  };

  const addGoalFundEntry = async (entry) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setGoalFundEntries((prev) => [entry, ...prev]);
      return;
    }

    const result = await requestWithAuth(API_PATHS.ADD_GOAL_FUND, "POST", entry);
    setGoalFundEntries((prev) => [mapDoc(result.goalFund), ...prev]);
  };

  const updateGoalFundEntry = async (updatedEntry) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setGoalFundEntries((prev) =>
        prev.map((entry) => (entry.id === updatedEntry.id ? { ...entry, ...updatedEntry } : entry)),
      );
      return;
    }

    const result = await requestWithAuth(
      API_PATHS.UPDATE_GOAL_FUND(updatedEntry.id),
      "PUT",
      updatedEntry,
    );

    setGoalFundEntries((prev) =>
      prev.map((entry) => (entry.id === updatedEntry.id ? mapDoc(result.goalFund) : entry)),
    );
  };

  const deleteGoalFundEntry = async (entryId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setGoalFundEntries((prev) => prev.filter((entry) => entry.id !== entryId));
      return;
    }

    await requestWithAuth(API_PATHS.DELETE_GOAL_FUND(entryId), "DELETE");
    setGoalFundEntries((prev) => prev.filter((entry) => entry.id !== entryId));
  };

  const clearFinanceData = () => {
    setIncomeEntries([]);
    setExpenseEntries([]);
    setBudgetEntries([]);
    setGoalFundEntries([]);
  };

  const clearUser = () => {
    setUser(null);
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    let isMounted = true;

    fetchFinanceData()
      .then((data) => {
        if (!isMounted) return;
        setIncomeEntries(data.income);
        setExpenseEntries(data.expense);
        setBudgetEntries(data.budget);
        setGoalFundEntries(data.goalFund);
      })
      .catch((error) => {
        console.warn("Failed to load finance data:", error?.message || error);
      });

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
        incomeEntries,
        expenseEntries,
        budgetEntries,
        goalFundEntries,
        addIncomeEntry,
        updateIncomeEntry,
        deleteIncomeEntry,
        addExpenseEntry,
        updateExpenseEntry,
        deleteExpenseEntry,
        addBudgetEntry,
        updateBudgetEntry,
        deleteBudgetEntry,
        addGoalFundEntry,
        updateGoalFundEntry,
        deleteGoalFundEntry,
        clearFinanceData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
