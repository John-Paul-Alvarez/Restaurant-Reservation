import React, { useState } from "react";
import heroImage from "./assets/hero.jpg";
import "./CustomerLogin.css";

const LoginCustomer = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Example: replace this with your backend login call
      // const response = await fetch("/api/customer/login", {...})
      // if (response.ok) ...
      localStorage.setItem("role", "customer");
      window.location.pathname = "/booking";
    } catch (err) {
      setError("Login failed. Please try again.");
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
