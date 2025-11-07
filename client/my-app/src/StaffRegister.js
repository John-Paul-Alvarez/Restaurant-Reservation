import React, { useState } from "react";
import heroImage from "./assets/hero.jpg";
import "./StaffRegister.css";

const StaffRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
    additionalInfo: "",
  });

  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/staff/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setRegistered(true);
      } else {
        const data = await response.json();
        setError(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Error registering staff:", error);
      setError("Registration failed");
    }
  };

  if (registered) {
    return (
      <div
        className="staff-register-page"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="staff-register-body">
          <div className="staff-register-container">
            <p>Registration successful! Please log in below:</p>
            <button onClick={() => (window.location.href = "/loginstaff")}>
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="staff-register-page"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="staff-register-body">
        <div className="staff-register-container">
          <h2>👨‍🍳 Staff Registration</h2>
          <p className="staff-register-subtext">
            Join our dedicated team and help us create an unforgettable dining
            experience.
          </p>

          {error && <p className="error">{error}</p>}

<form onSubmit={handleSubmit}>
  <div className="staff-register-column">
    <label>Full Name</label>
    <input
      type="text"
      name="username"
      value={formData.username}
      onChange={handleChange}
      required
    />

    <label className="Password">Password</label>
    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      required
    />
  </div>

  <div className="staff-register-column">
    <label>Email Address</label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
    />

    <label className="Role">Role</label>
    <select
      name="role"
      value={formData.role}
      onChange={handleChange}
      required
    >
      <option value="">Select Role</option>
      <option value="manager">Manager</option>
      <option value="receptionist">Receptionist</option>
      <option value="chef">Chef</option>
      <option value="waiter">Waiter</option>
    </select>
  </div>

  <button type="submit" className="staff-register-btn">
    Register
  </button>
</form>


          <p className="staff-login-link">
            Already part of the team? <a href="/loginstaff">Log in here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaffRegister;
