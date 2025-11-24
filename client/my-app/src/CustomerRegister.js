import React, { useState } from "react";
import heroImage from "./assets/hero.jpg";
import "./CustomerRegister.css";

const CustomerRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    additionalInfo: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/customer/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        //  Parse the response and save login info
        const data = await response.json();
        localStorage.setItem("role", "customer");
        localStorage.setItem("username", formData.username);
        localStorage.setItem("customer_id", data.customer_id); //  save it
        window.location.href = "/booking"; //  redirect to booking
      } else {
        const data = await response.json();
        setError(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setError("Registration failed");
    }
  };

  return (
    <div
      className="register-page"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="register-body">
        <div className="register-container">
          <h2>🍷 Create Your Account</h2>
          <p className="register-subtext">
            Join our community and reserve your next dining experience
            effortlessly.
          </p>

          {error && <p className="error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
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

            {/* <label>Special Requests (Optional)</label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
            /> */}

            <button type="submit" className="register-btn">
              Sign Up
            </button>
          </form>

          <p className="login-link">
            Already have an account?{" "}
            <a href="/logincustomer">Log in here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegister;
