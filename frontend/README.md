ExpenseTracker (MERN Stack)
Overview

ExpenseTracker is a full-stack web application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js) that helps users efficiently track and manage their daily expenses. The application addresses the common challenge of monitoring personal or business spending by providing a structured platform to record transactions, create budgets, and analyze financial data in real time.

The system enables users to gain better financial insights, control unnecessary spending, and make informed financial decisions through an interactive dashboard and detailed reports.

🚀 Tech Stack

Frontend: React.js, Context API / Redux (for state management), Axios, Chart.js / Recharts

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ODM)

Authentication: JWT (JSON Web Token) & bcrypt for password hashing

Deployment: (Optional: Render / Vercel / Netlify / MongoDB Atlas)

🔐 Features
1) User Authentication & Authorization

Secure user registration and login system

Passwords hashed using bcrypt

Authentication handled using JWT tokens

Protected routes to ensure only authorized users can access their data

Input validation for email format and password strength

2) Expense Tracking & Categorization

Users can add, edit, and delete expenses

Expenses include details such as:

Title

Amount

Category (Food, Travel, Bills, Shopping, etc.)

Date

Real-time updates on expense records

Expenses stored securely in MongoDB

3) Budget Creation & Management

Users can create monthly or custom-date budgets

Allocate percentage or fixed amount for different categories

System validates that total allocation equals 100% (if percentage-based)

Edit and delete existing budgets

Track budget usage and remaining balance dynamically

4) Interactive User Dashboard

The dashboard provides a complete financial overview:

Total Income

Total Expenses

Remaining Balance

Budget Usage Percentage

Recent Transactions

Expense Breakdown by Category (Pie/Bar Charts)

Highlight of highest spending day/week

The dashboard uses visual charts for better financial analysis and decision-making.

5) Data Security & Validation

Server-side validation using Express middleware

Mongoose schema validation

Protected API routes

Error handling and proper HTTP status codes

📂 Project Structure
ExpenseTracker/
│
├── client/                 # React Frontend
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── App.js
│
├── server/                 # Node + Express Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
2️⃣ Backend Setup
cd server
npm install
npm run dev
3️⃣ Frontend Setup
cd client
npm install
npm start
4️⃣ Environment Variables (.env)

Create a .env file inside the server folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
📊 Future Enhancements

Recurring expenses

Export data to CSV/PDF

Email reminders for budget limits

Multi-user (family/team) expense tracking

Dark mode UI

🎯 Conclusion

The ExpenseTracker (MERN Stack) application provides a complete personal finance management solution. By integrating modern web technologies, secure authentication, real-time data handling, and interactive dashboards, the system empowers users to track spending patterns, manage budgets effectively, and maintain financial discipline.


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
