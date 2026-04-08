import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/layouts/DashboardLayout";
import AuthLayout from "./components/layouts/AuthLayout";
import Dashboard from "./pages/Dashboard";
import Budget from "./pages/Dashboard/Budget";
import Income from "./pages/Dashboard/income";
import Expense from "./pages/Dashboard/Expense";
import Settings from "./pages/Dashboard/Settings";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route
          path="/"
          element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<Dashboard />} />
          <Route path="budget" element={<Budget />} />
          <Route path="income" element={<Income />} />
          <Route path="expense" element={<Expense />} />
          <Route path="setting" element={<Settings />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
