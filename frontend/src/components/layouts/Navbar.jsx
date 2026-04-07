import React from "react";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={styles.navbar}>
      <h2 style={styles.logo}>💰 Expense Tracker</h2>

      <button style={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;

const styles = {
  navbar: {
    height: "60px",
    backgroundColor: "#1e293b",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  logo: {
    margin: 0,
    fontSize: "20px",
  },
  logoutBtn: {
    padding: "8px 15px",
    backgroundColor: "#ef4444",
    border: "none",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
  },
};