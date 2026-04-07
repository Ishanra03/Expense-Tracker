import React from "react";

const Transactions = ({ transactions }) => {
  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Recent Transactions</h3>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t, i) => (
            <tr key={i}>
              <td>{t.type}</td>
              <td>{t.category}</td>
              <td>₹{t.amount}</td>
              <td>{t.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};