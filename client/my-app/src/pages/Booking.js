import React, { useState, useEffect, useContext } from "react";
import { LoginContext, UserTypeContext } from "../App";
import bgImg from "../assets/restaurant-bg.jpg";
import "./booking.css";

const Booking = () => {
  const [loggedIn] = useContext(LoginContext);
  const [userType] = useContext(UserTypeContext);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);


  const [formData, setFormData] = useState({
    customer_id: "",
    reservation_date_time: "",
    party_size: "2",
    reservation_status: "pending",
    username: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Derived validation state
  const isFormValid =
    formData.reservation_date_time.trim() !== "" &&
    parseInt(formData.party_size, 10) > 0;

  // stepper logic
  const handlePartyChange = (delta) => {
    setFormData((prev) => {
      const current = parseInt(prev.party_size || "1", 10);
      const next = Math.max(1, current + delta);
      return { ...prev, party_size: String(next) };
    });
  };

  // Only allow logged-in customers
  useEffect(() => {
    if (!loggedIn || userType !== "customer") {
      window.location.href = "/logincustomer";
    }
  }, [loggedIn, userType]);

  // Load username + customer_id
  useEffect(() => {
    const username = localStorage.getItem("username") || "";
    let customer_id = localStorage.getItem("customer_id");

    if (!customer_id) {
      const randomId = Math.floor(Math.random() * 1_000_000);
      customer_id = String(randomId);
      localStorage.setItem("customer_id", customer_id);
    }

    setFormData((prev) => ({
      ...prev,
      username,
      customer_id,
      party_size: prev.party_size || "2",
    }));
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/create-reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccess(true);

        // Reset inputs
        setFormData((prev) => ({
          ...prev,
          reservation_date_time: "",
          party_size: "2",
        }));
      } else {
        console.error("Reservation failed");
      }

    } catch (err) {
      console.error("Error submitting reservation", err);
      alert("Network error while submitting reservation.");
    }

    setIsSubmitting(false);
  };

  if (loading) {
    return <p className="booking-loading">Loading your booking profile...</p>;
  }

  return (
    <div
      className="booking-page"
      style={{ backgroundImage: `url(${bgImg})` }}
    >

      <div className="booking-card">
        <h2 className="booking-title">Make a Reservation</h2>

        <form className="booking-form" onSubmit={handleSubmit}>
          <input type="hidden" name="customer_id" value={formData.customer_id} />
          <input type="hidden" name="username" value={formData.username} />

          {/* Date & Time */}
          <div className="booking-row">
            <label className="booking-label" htmlFor="reservation_date_time">
              Reservation Date &amp; Time
            </label>
            <input
              id="reservation_date_time"
              type="datetime-local"
              name="reservation_date_time"
              value={formData.reservation_date_time}
              onChange={handleChange}
              className="booking-input"
              required
            />
          </div>

          {/* Party Size */}
          <div className="booking-row booking-row-party">
            <div className="booking-party-label">
              <span className="booking-party-icon">👥</span>
              <span className="booking-label">Party Size</span>
            </div>

            <div className="booking-party-stepper">
              <button
                type="button"
                className="booking-stepper-btn"
                onClick={() => handlePartyChange(-1)}
              >
                −
              </button>
              <span className="booking-party-value">
                {formData.party_size || "1"}
              </span>
              <button
                type="button"
                className="booking-stepper-btn"
                onClick={() => handlePartyChange(1)}
              >
                +
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`booking-submit ${!isFormValid || isSubmitting ? "booking-submit-disabled" : ""}`}
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Reservation"}
          </button>
        </form>

        <div className="booking-meta">
          <div className="booking-meta-labels">
            <span className="booking-meta-label">Current User</span>
            <span className="booking-meta-label">Customer ID</span>
          </div>
          <div className="booking-meta-values">
            <span className="booking-meta-value">
              {formData.username || "—"}
            </span>
            <span className="booking-meta-value">
              {formData.customer_id || "—"}
            </span>
          </div>
        </div>

          
          {showSuccess && (
            <div className="modal-overlay">
              <div className="modal-card">
                <div className="modal-icon">🎉</div>
                <h3 className="modal-title">Reservation Confirmed</h3>
                <p className="modal-text">Your table has been successfully reserved!</p>

                <button className="modal-btn" onClick={() => setShowSuccess(false)}>
                  OK
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default Booking;
