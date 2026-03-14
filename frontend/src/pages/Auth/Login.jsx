import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/input/input";
import { validateEmail } from "../../utils/Helper.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter valid email");
      return;
    }

    if (!password) {
      setError("Please enter valid password");
      return;
    }

    setError("");
    navigate("/dashboard");
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
          Welcome Back 👋
        </h3>

        <p className="text-sm text-slate-600 mt-2 mb-8">
          Please enter your details to log in.
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="dev@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Enter your password"
            type="password"
          />

          {error && (
            <p className="text-red-500 text-xs pb-2.5">
              {error}
            </p>
          )}

          <p className="text-[13px] text-slate-700 mt-3">
            Don't have an account?{" "}
            <Link
              className="font-medium text-primary underline"
              to="/signup"
            >
              Sign Up
            </Link>
          </p>

          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;