import React from "react";
import card2 from "../../assets/images/card2.jpeg";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">

      {/* Left Section */}
      <div className="w-full md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-2xl font-semibold text-black mb-6">
          Expense Tracker
        </h2>
        {children}
      </div>

      {/* Right Section */}
      <div className="hidden md:block w-[40vw] bg-violet-50 overflow-hidden p-7 relative">

        {/* Decorative Shapes */}
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute top-7 -left-5"></div>

        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10"></div>

        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5"></div>

        {/* Floating Stats Card */}
        <div className="absolute top-16 left-10 right-10 z-20">
          <StatsInfoCard
           icon={<LuTrendingUpDown />}
           label="Track Your Income & Expenses"
           value={430000}    
           color="#7c3aed"
        />
        </div>

        {/* Image */}
        <img
          src={card2}
          alt="Card Preview"
          className="w-64 lg:w-[85%] absolute bottom-10 right-5 shadow-lg shadow-purple-400/20"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value = 0, color }) => {
  return (
    <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-lg shadow-purple-400/10 border border-gray-200/50">
      
      {/* Icon */}
      <div
        className="w-12 h-12 flex items-center justify-center text-[24px] text-white rounded-xl"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>

      {/* Text */}
      <div>
        <h6 className="text-sm text-gray-500 mb-1">
          {label}
        </h6>

        <span
          className="text-xl font-semibold"
          style={{ color: color }}
        >
          ₹{Number(value).toLocaleString("en-IN")}
        </span>
      </div>
    </div>
  );
};