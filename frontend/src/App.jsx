import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Dashboard/Home";
import Expense from "./pages/Dashboard/Expense";
import Income from "./pages/Dashboard/income";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

       <Route path="/dashboard" element={<Home />} />
       <Route path="/Expense" element={<Expense />} />
       <Route path="/income" element={<Income />} />
      </Routes>
    </Router>
  );
};

export default App;
const Root = () => {
  // Check if token exist in localStorage or not 
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirect to dashboard if authenticated, otherwise to Login
   return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};