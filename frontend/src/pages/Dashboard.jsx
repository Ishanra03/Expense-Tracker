import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/layouts/DashboardLayout";
import DashboardCards from "../components/DashboardCards";
import Chart from "../components/Chart";
import Transactions from "../components/Transactions";
import { API_PATHS } from "../utils/apiPaths";
import { getAuthHeaders } from "../utils/auth";

const Dashboard = () => {
  const [data, setData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    transactions: [],
  });

  const fetchDashboard = async () => {
    try {
      const res = await fetch(API_PATHS.DASHBOARD, {
        headers: getAuthHeaders(),
      });

      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <DashboardLayout>
      <DashboardCards
        income={data.totalIncome}
        expense={data.totalExpense}
        balance={data.balance}
      />

      <Chart
        income={data.totalIncome}
        expense={data.totalExpense}
      />

      <Transactions transactions={data.transactions || []} />
    </DashboardLayout>
  );
};

export default Dashboard;