import React, { useContext } from "react";
import NavigationContext from "../NavigationContext";
import "./home.css";
import heroImage from "../assets/hero.jpg";


const Home = () => {
  const { navigate } = useContext(NavigationContext);

  return (
    <div className="hv-hero" style={{ backgroundImage: `url(${heroImage})` }}>

      <div className="hv-hero-overlay" />
      <div className="hv-hero-content">
        <h1 className="hv-title">Reserve Your Table at Hearth &amp; Vine</h1>
        <p className="hv-subtitle">A cozy wine-and-dine escape in the heart of the city.</p>
        <p className="hv-kicker">
        Book your next dining experience now and enjoy fine wines, seasonal cuisine, and warm hospitality.
        </p>


        <div className="hv-cta-row">
        <button className="hv-btn hv-btn-primary" onClick={() => navigate("/logincustomer")}>
        🍽 Reserve Now
        </button>

        <button className="hv-btn hv-btn-ghost" onClick={() => navigate("/loginstaff")}>
        👨‍🍳 Staff Login
        </button>

        </div>
      </div>
    </div>
  );
};

export default Home;
