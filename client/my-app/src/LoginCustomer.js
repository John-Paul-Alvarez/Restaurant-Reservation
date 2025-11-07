import React, { useState, useContext } from "react";
import { LoginContext, UserTypeContext } from "./App"; // ✅ already correct
import heroImage from "./assets/hero.jpg";
import "./CustomerLogin.css";

const LoginCustomer = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [, setLoggedIn] = useContext(LoginContext);
  const [, setUserType] = useContext(UserTypeContext);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Call backend API
      const response = await fetch("/api/customer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      // ✅ Parse JSON and store everything
      const data = await response.json();
      localStorage.setItem("role", "customer");
      localStorage.setItem("username", formData.username);
      localStorage.setItem("customer_id", data.customer_id); // ✅ save it

      // ✅ Update context
      setLoggedIn(true);
      setUserType("customer");

      // ✅ Redirect to booking
      window.location.href = "/booking";
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="login-page" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="login-body">
        <div className="login-container">
          <h2>🍷 Welcome Back</h2>
          <p className="login-subtext">
            Sign in to continue your dining journey with us.
          </p>

          {error && <p className="error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <p className="register-link">
            Don’t have an account? <a href="/customerregister">Sign up here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginCustomer;
