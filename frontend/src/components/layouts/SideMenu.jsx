import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LuLayoutDashboard,
  LuTarget,
  LuWalletMinimal,
  LuCircleDollarSign,
  LuSettings,
  LuLogOut,
} from "react-icons/lu";
import { useUser } from "../../context/UserContext";
import { saveUserProfileToServer } from "../../utils/userProfileApi";

const SideMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, updateUser, clearUser, clearFinanceData } = useUser();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: LuLayoutDashboard },
    { name: "Budget", path: "/budget", icon: LuTarget },
    { name: "Income", path: "/income", icon: LuWalletMinimal },
    { name: "Expense", path: "/expense", icon: LuCircleDollarSign },
  ];

  const displayName = user?.name || user?.fullName || "Mike William";
  const isSettingsActive =
    location.pathname === "/settings" || location.pathname === "/setting";

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (token && user) {
      try {
        const savedUser = await saveUserProfileToServer(user);
        updateUser(savedUser);
        localStorage.setItem("user", JSON.stringify(savedUser));
      } catch (error) {
        const message = String(error?.message || "").toLowerCase();
        const isAuthError =
          message.includes("invalid or expired token") ||
          message.includes("access denied") ||
          message.includes("no token provided");

        // If token is stale/expired, continue logout without blocking the user.
        if (!isAuthError) {
          console.warn("Profile sync failed during logout:", error?.message || error);
        }
      }
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("incomeEntries");
    localStorage.removeItem("expenseEntries");
    localStorage.removeItem("budgetEntries");
    clearFinanceData();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="flex h-full w-full flex-col border-r border-slate-200 bg-white p-3">
      <div className="mb-8 mt-3 flex flex-col items-center">
        <img
          src={user?.profilePic || "https://api.dicebear.com/9.x/adventurer/svg?seed=Mike"}
          alt="Profile"
          className="h-[86px] w-[86px] rounded-full bg-slate-100 object-cover"
        />
        <p className="mt-3 text-[29px] font-semibold text-slate-900">{displayName}</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-lg font-medium transition ${
                isActive
                  ? "bg-gradient-to-r from-violet-600 to-indigo-500 text-white"
                  : "text-slate-800 hover:bg-slate-100"
              }`}
            >
              <Icon className="text-xl" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2">
        <Link
          to="/setting"
          className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-lg font-medium transition ${
            isSettingsActive
              ? "bg-gradient-to-r from-violet-600 to-indigo-500 text-white"
              : "text-slate-900 hover:bg-slate-100"
          }`}
        >
          <LuSettings className="text-xl" />
          <span>Settings</span>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-lg font-medium text-slate-900 transition hover:bg-slate-100"
        >
          <LuLogOut className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
