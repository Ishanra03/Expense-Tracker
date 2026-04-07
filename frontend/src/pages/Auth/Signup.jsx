import React, { useState } from "react";
import { API_PATHS } from "../../utils/apiPaths";

const Signup = ({ setIsAuthenticated, setShowSignup }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(API_PATHS.REGISTER, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div style={styles.container}>
      {/* LEFT */}
      <div style={styles.left}>
        <div style={styles.card}>
          <h2>Create Account 🚀</h2>

          {error && <p style={styles.error}>{error}</p>}

          <form onSubmit={handleSignup} style={styles.form}>
            <input
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              style={styles.input}
              required
            />

            <input
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              style={styles.input}
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              style={styles.input}
              required
            />

            <button style={styles.button}>Sign Up</button>
          </form>

          <p>
            Already have an account?{" "}
            <span style={styles.link} onClick={() => setShowSignup(false)}>
              Login
            </span>
          </p>
        </div>
      </div>

      {/* RIGHT SAME AS LOGIN */}
      <div style={styles.right}>
        <div style={styles.overlay}>
          <h2>Track your Income & Expenses</h2>

          <div style={styles.statCard}>
            <p>Total Balance</p>
            <h3>₹4,30,000</h3>
          </div>

          <div style={styles.statCard}>
            <div style={styles.chartBars}>
              <div style={{ ...styles.bar, height: "40px" }}></div>
              <div style={{ ...styles.bar, height: "70px" }}></div>
              <div style={{ ...styles.bar, height: "50px" }}></div>
              <div style={{ ...styles.bar, height: "80px" }}></div>
            </div>
            <p style={{ marginTop: "10px" }}>Monthly Overview</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },

  left: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8fafc",
  },

  card: {
    width: "350px",
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
  },

  input: {
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  button: {
    padding: "12px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  error: {
    color: "red",
  },

  link: {
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: "bold",
  },

  right: {
    flex: 1,
    background: "linear-gradient(135deg, #6366f1, #2563eb)",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    textAlign: "center",
  },

  statCard: {
    background: "rgba(255,255,255,0.2)",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px",
  },

  chartBars: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginTop: "10px",
  },

  bar: {
    width: "10px",
    background: "#fff",
    borderRadius: "5px",
    animation: "grow 1s ease-in-out",
  },
};