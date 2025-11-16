import React, { useContext, useState } from "react";
import { LoginContext, UserTypeContext } from "./App";
import "./mainNav.css";

function Mainav() {
  const [loggedIn] = useContext(LoginContext);
  const [userType] = useContext(UserTypeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const icon = userType === "staff" ? "👨‍🍳" : "👤";

  return (
    <nav className="hv-nav">
      {/* LEFT SIDE BRAND */}
      <div className="hv-brand">
        <span className="hv-logo">🍷</span>
        <span className="logo-text">Book a Table at Hearth & Vine</span>
      </div>

      {/* RIGHT SIDE PROFILE ICON */}
      {loggedIn && (
        <div className="hv-profile" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="profile-icon">{icon}</span>

          {menuOpen && (
            <div className="profile-dropdown">
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Mainav;
