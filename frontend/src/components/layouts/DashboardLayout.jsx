import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100">
        <Outlet /> {/* 🔥 THIS IS REQUIRED */}
      </div>
    </div>
  );
};

export default DashboardLayout;