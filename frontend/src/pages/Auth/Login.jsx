import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input/input";
import { validateEmail } from "../../utils/Helper";
import { useUser } from "../../context/UserContext";
import { API_PATHS } from "../../utils/apiPaths";
import { mapBackendUserToClient } from "../../utils/userProfileApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { updateUser } = useUser();

  const handleLogin = async (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!validateEmail(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    try {
      const response = await fetch(API_PATHS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Login failed");
      }

      const userData = mapBackendUserToClient(result);

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(userData));
      updateUser(userData);
      setError("");
      navigate("/");
    } catch (err) {
      setError(err.message || "Unable to login. Please try again.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-[700px] py-4">
      <h2 className="text-[46px] font-semibold text-slate-950">Welcome Back</h2>
      <p className="mt-2 text-lg text-slate-600">Please enter your details to log in</p>

      <form className="mt-8 space-y-1" onSubmit={handleLogin}>
        <Input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="text"
        />

        <Input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
        />

        {error ? <p className="pt-1 text-sm text-red-500">{error}</p> : null}

        <button type="submit" className="btn-primary mt-3 uppercase tracking-wide">
          Login
        </button>

        <p className="pt-2 text-[15px] text-slate-700">
          Don&apos;t have an account?{" "}
          <Link className="font-semibold text-primary underline" to="/signup">
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
