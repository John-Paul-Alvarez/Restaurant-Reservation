import React, { useState, useEffect, useContext } from "react";
import { LoginContext, UserTypeContext } from "../App";

const Booking = () => {
  const [loggedIn] = useContext(LoginContext);
  const [userType] = useContext(UserTypeContext);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    customer_id: "",
    reservation_date_time: "",
    party_size: "",
    reservation_status: "pending",
    username: "",
  });

  // ✅ Step 1: Ensure only customers access this page
  useEffect(() => {
    if (!loggedIn || userType !== "customer") {
      window.location.href = "/logincustomer";
    }
  }, [loggedIn, userType]);

  // ✅ Step 2: Get customer_id + username from localStorage
  useEffect(() => {
    const username = localStorage.getItem("username");
    let customer_id = localStorage.getItem("customer_id");

    // If missing (e.g., seed users), create one temporarily
    if (!customer_id) {
      const randomId = Math.floor(Math.random() * 1000000);
      localStorage.setItem("customer_id", randomId);
      customer_id = randomId;
      console.log("🆕 Generated random customer ID:", randomId);
    } else {
      console.log("✅ Using saved customer ID:", customer_id);
    }

    // Update formData
    setFormData((prev) => ({
      ...prev,
      username: username || "GuestUser",
      customer_id: customer_id.toString(),
    }));

    setLoading(false);
  }, []);

  // ✅ Handle input changes for date/time and party size
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Submit reservation
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🟢 Submitting reservation:", formData);

    try {
      const response = await fetch("/api/create-reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("🎉 Reservation created successfully!");
        setFormData({
          ...formData,
          reservation_date_time: "",
          party_size: "",
        });
      } else {
        const errData = await response.json();
        alert("⚠️ Error: " + (errData.error || "Failed to create reservation"));
      }
    } catch (error) {
      console.error("❌ Error creating reservation:", error);
      alert("Something went wrong while submitting reservation.");
    }
  };

  if (loading) {
    return <p>Loading your booking profile...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Make a Reservation</h2>
      <form onSubmit={handleSubmit}>
        {/* Hidden fields (system-provided) */}
        <input type="hidden" name="customer_id" value={formData.customer_id} />
        <input type="hidden" name="username" value={formData.username} />

        <label>
          Reservation Date and Time:
          <input
            type="datetime-local"
            name="reservation_date_time"
            value={formData.reservation_date_time}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Party Size:
          <input
            type="number"
            name="party_size"
            value={formData.party_size}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit">Submit Reservation</button>
      </form>

      <p style={{ marginTop: "10px", fontSize: "14px" }}>
        <strong>Current User:</strong> {formData.username} <br />
        <strong>Customer ID:</strong> {formData.customer_id}
      </p>
    </div>
  );
};

export default Booking;
