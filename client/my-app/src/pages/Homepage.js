import React, { useContext, useState } from "react";
import NavigationContext from "../NavigationContext";
import "./home.css";
import heroImage from "../assets/hero.jpg";
import ReserveModal from "../Components/ReserveModal";
import StaffModal from "../Components/StaffModal";


const Home = () => {
  const { navigate } = useContext(NavigationContext);
  const [openReserve, setOpenReserve] = useState(false);
  const [openStaff, setOpenStaff] = useState(false);

  const openModal = () => setOpenReserve(true);
  const closeModal = () => setOpenReserve(false);
  const goLogin = () => { closeModal(); navigate("/logincustomer"); };
  const goRegister = () => { closeModal(); navigate("/customerregister"); };

  const openStaffModal = () => setOpenStaff(true);
  const closeStaffModal = () => setOpenStaff(false);
  const goStaffLogin = () => { closeStaffModal(); navigate("/loginstaff"); };
  const goStaffRegister = () => { closeStaffModal(); navigate("/staffregister"); };

  return (
    <div className="hv-hero" style={{ backgroundImage: `url(${heroImage})` }}>

      <div className="hv-hero-overlay" />
      <div className="hv-hero-content">
        <h1 className="hv-title">Reserve Your Table at Hearth &amp; Vine</h1>
        <p className="hv-subtitle">A cozy wine-and-dine escape in the heart of the city.</p>
        <p className="hv-kicker">
        Book your next dining experience now and enjoy fine wines, seasonal cuisine, and warm hospitality.
        </p>


      <button
        className="hv-btn hv-btn-primary"
        onClick={openModal}>
        🍽 Reserve Now
      </button>

      <button className="hv-btn hv-btn-ghost" onClick={openStaffModal}>
        👨‍🍳 Staff Login
      </button>

        </div>
        

        <ReserveModal
        open={openReserve}
        onClose={closeModal}
        onLogin={goLogin}
        onRegister={goRegister}/>

        
        <StaffModal
          open={openStaff}
          onClose={closeStaffModal}
          onLogin={goStaffLogin}
          onRegister={goStaffRegister}
        />
      </div>

      
    
  );
};

export default Home;
