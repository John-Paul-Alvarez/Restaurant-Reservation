import React, { createContext, useState, useEffect } from "react";
import "./App.css";
import MainNav from "./Mainav";
import NavigationProvider from "./NavigationProvider";
import Route from "./Route";

import Home from "./pages/Homepage";
import LoginCustomer from "./LoginCustomer";
import LoginStaff from "./LoginStaff";
import CustomerRegister from "./CustomerRegister";
import StaffRegister from "./StaffRegister";
import Booking from "./pages/Booking";
import Channel from "./pages/Channel";
import Footer from "./Components/Footer";

// Context exports
export const LoginContext = createContext();
export const UserTypeContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(true); 

  // Load saved login info once before rendering protected routes
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "customer" || role === "staff") {
      setLoggedIn(true);
      setUserType(role);
    }
    setLoading(false);
  }, []);

  if (loading) return null; //  Don’t render routes until context is ready

  return (
    <NavigationProvider>
      <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
        <UserTypeContext.Provider value={[userType, setUserType]}>
          <MainNav />

          <Route href="/">
            <Home />
            <Footer />
          </Route>

          <Route href="/logincustomer">
            <LoginCustomer />
          </Route>

          <Route href="/loginstaff">
            <LoginStaff />
          </Route>

          <Route href="/customerregister">
            <CustomerRegister />
          </Route>

          <Route href="/staffregister">
            <StaffRegister />
          </Route>

          <Route href="/booking">
            <Booking />
          </Route>

          <Route href="/channel">
            <Channel />
          </Route>
        </UserTypeContext.Provider>
      </LoginContext.Provider>
    </NavigationProvider>
  );
}

export default App;
