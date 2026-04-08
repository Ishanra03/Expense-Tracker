import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import DashboardCards from "../../components/DashboardCards";
import Transactions from "../../components/Transactions";
import Chart from "../../components/Chart";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div style={styles.container}>

      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.greeting}>
          Welcome, {user?.name || "User"} 👋
        </h2>
      </div>

      {/* Top Cards - Balance, Income, Expenses */}
      <DashboardCards />

      {/* Bottom Section */}
      <div style={styles.bottom}>

        {/* Recent Transactions */}
        <div style={styles.transactionsBox}>
          <h4 style={styles.sectionTitle}>Recent Transactions</h4>
          <Transactions />
        </div>

        {/* Financial Overview Chart */}
        <div style={styles.chartBox}>
          <h4 style={styles.sectionTitle}>Financial Overview</h4>
          <Chart />
        </div>

      </div>
    </div>
  );
};

export default Home;

const styles = {
  container: {
    padding: "10px",
  },

  header: {
    marginBottom: "24px",
  },

  greeting: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#111",
  },

  bottom: {
    display: "flex",
    gap: "20px",
    marginTop: "24px",
    flexWrap: "wrap",
  },

  transactionsBox: {
    flex: 2,
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    minWidth: "300px",
  },

  chartBox: {
    flex: 1,
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    minWidth: "250px",
  },

  sectionTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#111",
    marginBottom: "16px",
  },
};