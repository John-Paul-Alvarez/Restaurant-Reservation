import React, { useState, useContext } from "react";
import { LoginContext, UserTypeContext } from "./App"; 
import heroImage from "./assets/hero.jpg";
import "./StaffLogin.css";

const LoginStaff = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [, setLoggedIn] = useContext(LoginContext);
  const [, setUserType] = useContext(UserTypeContext);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate successful login
      localStorage.setItem("role", "staff");
      localStorage.setItem("username", formData.username);
      setLoggedIn(true);        
      setUserType("staff");     
      window.location.href = "/channel";
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="staff-login-page" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="staff-login-body">
        <div className="staff-login-container">
          <h2>👨‍🍳 Staff Portal</h2>
          <p className="staff-login-subtext">
            Sign in to manage bookings, view channels, and serve our guests.
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

            <button type="submit" className="staff-login-btn">
              Login
            </button>
          </form>

          <p className="staff-register-link">
            Don’t have a staff account? <a href="/staffregister">Register here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginStaff;
