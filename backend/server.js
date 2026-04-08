require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./Configuration/db");

// Routes
const AuthRoutes = require("./routes/AuthRoutes");
const IncomeRoutes = require("./routes/IncomeRoutes");
const ExpenseRoutes = require("./routes/ExpenseRoutes");
const BudgetRoutes = require("./routes/BudgetRoutes");
const GoalFundRoutes = require("./routes/GoalFundRoutes");
const DashRoutes = require("./routes/DashRoutes");

const app = express();


// 🌐 CORS Setup
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// 📦 Middleware
app.use(express.json());


// 🗄️ Connect Database
connectDB();


// 🏠 Root Route (Test)
app.get("/", (req, res) => {
  res.send("Expense Tracker API is running...");
});


// 🔐 Routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/income", IncomeRoutes);
app.use("/api/v1/expense", ExpenseRoutes);
app.use("/api/v1/budget", BudgetRoutes);
app.use("/api/v1/goal-fund", GoalFundRoutes);
app.use("/api/v1/dashboard", DashRoutes);


// 📁 Static Folder (for uploaded images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ❌ Handle Unknown Routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});


// 🚀 Server Start
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
