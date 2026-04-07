import React from "react";

const DashboardCards = ({ income, expense, balance }) => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3>Total Income</h3>
        <p>₹{income}</p>
      </div>

      <div style={styles.card}>
        <h3>Total Expense</h3>
        <p>₹{expense}</p>
      </div>

      <div style={styles.card}>
        <h3>Balance</h3>
        <p>₹{balance}</p>
      </div>
    </div>
  );
};

export default DashboardCards;

const styles = {
  container: {
    display: "flex",
    gap: "20px",
  },
  card: {
    flex: 1,
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
};