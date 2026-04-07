import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Income from "./pages/Dashboard/income";
import Expense from "./pages/Dashboard/Expense";

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout wrapper */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="income" element={<Income />} />
          <Route path="expense" element={<Expense />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;