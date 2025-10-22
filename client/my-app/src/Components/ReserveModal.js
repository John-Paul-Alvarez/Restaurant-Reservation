import React, { useEffect } from "react";
import "./reserveModal.css";

const ReserveModal = ({
  open,
  onClose,
  onLogin,
  onRegister,
}) => {
  // Close on ESC
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
        aria-labelledby="reserve-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="hv-modal-header">
          <h2 id="reserve-modal-title">Welcome to Hearth &amp; Vine</h2>
          <button className="hv-modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <p className="hv-modal-sub">
          Log in to continue your reservation or create a new account.
        </p>

        <div className="hv-modal-actions">
          <button className="hv-btn hv-btn-primary" onClick={onLogin}>
            Log In
          </button>
          <button className="hv-btn hv-btn-ghost" onClick={onRegister}>
            Create Account
          </button>
        </div>

        <p className="hv-small-hint">
          By continuing, you agree to our reservation policies.
        </p>
      </div>
    </div>
  );
};

export default ReserveModal;
