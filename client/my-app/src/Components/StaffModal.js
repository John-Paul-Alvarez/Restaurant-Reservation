import React, { useEffect } from "react";
import "./reserveModal.css"; // reuse same design
import "./staffModal.css"

const StaffModal = ({ open, onClose, onLogin, onRegister }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="hv-modal-backdrop" onClick={onClose} aria-hidden>
      <div
        className="hv-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="staff-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="hv-modal-header">
          <h2 id="staff-modal-title">Staff Portal</h2>
          <button className="hv-modal-close" onClick={onClose}>✕</button>
        </div>

        <p className="hv-modal-sub">
        Log in to manage reservations or register as new staff.
        </p>

        <div className="hv-modal-actions">
          <button className="hv-btn-hv-btn-primary" onClick={onLogin}>
            Staff Log In
          </button>
          <button className="hv-btn-hv-btn-ghost" onClick={onRegister}>
            Create Staff Account
          </button>
        </div>

        <p className="hv-small-hint">
          Authorized staff access only.
        </p>
      </div>
    </div>
  );
};

export default StaffModal;
