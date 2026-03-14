// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const connectDB = require("./Configuration/db");
// const AuthRoutes = require("./routes/AuthRoutes");

// const app = express();

// // CORS middleware
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// app.use(express.json());

// connectDB();

// app.use("/api/v1/auth",AuthRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./Configuration/db");
const AuthRoutes = require("./routes/AuthRoutes");
const IncomeRoutes = require("./routes/IncomeRoutes");

const app = express();

// CORS middleware
app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
  })
);

app.use(express.json());

// CONNECT DATABASE
connectDB();


// TEST ROUTE (to check if server works)
// app.get("/test", (req, res) => {
//   res.send("Server working");
// });


// AUTH ROUTES
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/income", IncomeRoutes);

//Server Uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});