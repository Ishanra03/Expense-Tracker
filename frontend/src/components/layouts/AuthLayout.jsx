import { Outlet } from "react-router-dom";
import { LuTrendingUpDown } from "react-icons/lu";

const barHeights = [120, 92, 88, 145, 18, 74, 103, 119, 94, 120];

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#f8f8fb] md:flex">
      <section className="w-full px-6 py-6 sm:px-10 md:w-3/5 md:px-10 lg:px-12">
        <h1 className="text-[34px] font-semibold text-slate-950 md:text-[36px]">
          Expense Tracker
        </h1>

        <div className="mt-10 md:mt-14">
          <Outlet />
        </div>
      </section>

      <section className="relative hidden overflow-hidden bg-[#edeaf8] md:block md:w-2/5">
        <div className="absolute -left-14 top-5 h-44 w-44 rounded-[36px] bg-gradient-to-b from-fuchsia-600 to-violet-600" />
        <div className="absolute -right-20 top-56 h-48 w-48 rounded-[36px] border-[15px] border-fuchsia-600" />
        <div className="absolute -left-14 bottom-4 h-44 w-44 rounded-[36px] bg-gradient-to-b from-violet-600 to-indigo-500" />

        <div className="relative h-full p-8 lg:p-10">
          <div className="mx-auto flex max-w-[540px] items-center gap-4 rounded-2xl bg-white px-4 py-3 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-xl text-white">
              <LuTrendingUpDown />
            </div>
            <div>
              <p className="text-sm text-slate-500">Track Your Income &amp; Expenses</p>
              <p className="text-[30px] font-bold leading-9 text-slate-900">₹4,30,000</p>
            </div>
          </div>

          <div className="mx-auto mt-44 max-w-[540px] rounded-2xl bg-white p-4 shadow-sm lg:mt-48">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <p className="text-3xl font-semibold text-slate-900">All Transactions</p>
                <p className="text-sm text-slate-500">2nd Jan to 21th Dec</p>
              </div>
              <button className="rounded-xl bg-violet-100 px-5 py-2 text-sm font-semibold text-violet-700">
                View More
              </button>
            </div>

            <div className="mt-3 flex h-[240px] items-end gap-5 px-4 pb-3">
              {barHeights.map((height, index) => (
                <div key={index} className="w-full rounded-lg bg-violet-300/70" style={{ height }}>
                  <div className="w-full rounded-lg bg-violet-600" style={{ height: Math.max(20, height - 55) }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthLayout;
