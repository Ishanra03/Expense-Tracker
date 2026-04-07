import React from "react";
import { Link, useLocation } from "react-router-dom";

const SideMenu = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Income", path: "/income" },
    { name: "Expense", path: "/expense" },
  ];

  return (
    <div style={styles.sidebar}>
      <h3 style={styles.heading}>Menu</h3>

      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={item.name}
            to={item.path}
            style={{
              ...styles.link,
              background: isActive ? "#334155" : "transparent",
            }}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default SideMenu;

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    background: "#0f172a",
    color: "#fff",
    padding: "20px",
    position: "fixed",
    left: 0,
    top: 0,
  },

  heading: {
    marginBottom: "20px",
    fontSize: "18px",
  },

  link: {
    display: "block",
    padding: "12px",
    marginBottom: "10px",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "6px",
    transition: "0.3s",
  },
};