import { Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";

const DashboardLayout = () => {
  return (
    <div className="h-screen bg-[#f6f6f8] flex flex-col">
      <header className="border-b border-slate-200 bg-white px-6 py-4 md:px-8 shrink-0">
        <h1 className="text-[34px] font-semibold text-slate-950 md:text-[36px]">Expense Tracker</h1>
      </header>

      <div className="flex flex-1 min-h-0">
        <aside className="hidden md:block md:w-60 md:shrink-0">
          <SideMenu />
        </aside>

        <main className="w-full flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
