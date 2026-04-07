import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menu = [
    { name: "Income", path: "/income" },
    { name: "Expense", path: "/expense" },
  ];

  return (
    <div className="w-64 h-full bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-6">Expense Tracker</h2>

      {menu.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`block p-2 rounded mb-2 ${
            location.pathname === item.path
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-200"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;