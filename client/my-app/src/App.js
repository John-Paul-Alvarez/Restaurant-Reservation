import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import Channel from './pages/Channel'; // Adjust the import path
import MainNav from './Mainav';
import Booking from './pages/Booking';
import LoginCustomer from './LoginCustomer';
import LoginStaff from './LoginStaff';
import CustomerRegister from './CustomerRegister';
import StaffRegister from './StaffRegister';


import NavigationProvider from './NavigationProvider';
import Route from './Route';

import { createContext } from 'react';

export const LoginContext = createContext();
export const UserTypeContext = createContext();

const Home = () => <div>Home Page</div>;

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [User, setUser] = useState('notUser');

  const [initialState, setState] = useState([])
  const url = "/api"

  // Load logged-in state from localStorage on component mount
  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    if (storedLoggedIn !== null) {
      setLoggedIn(JSON.parse(storedLoggedIn));
    }
  }, []);

  // Save logged-in state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
  }, [loggedIn]);

  //==================================================

  // Load UserType from localStorage on component mount
  useEffect(() => {
    const storedUserType = localStorage.getItem('UserType');
    if (storedUserType !== null) {
      setUser(JSON.parse(storedUserType));
    }
  }, []);

  // Save UserType to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('UserType', JSON.stringify(User));
  }, [User]);



  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setState(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [])

  return (
    <NavigationProvider>
      <UserTypeContext.Provider value={[User, setUser]}>
        <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
          <MainNav />
        </LoginContext.Provider>
      </UserTypeContext.Provider>

      <Route href="/home">
        <Home />
      </Route>


      <UserTypeContext.Provider value={[User, setUser]}>
        <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
          <Route href="/book">
            <Booking />
          </Route>
        </LoginContext.Provider>
      </UserTypeContext.Provider>


      <UserTypeContext.Provider value={[User, setUser]}>
        <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
          <Route href="/channel">
            <Channel data={initialState} />
          </Route>
        </LoginContext.Provider>
      </UserTypeContext.Provider>

      <UserTypeContext.Provider value={[User, setUser]}>
        <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
          <Route href="/customerlogin">
            <LoginCustomer />
          </Route>
        </LoginContext.Provider>
      </UserTypeContext.Provider>

      <UserTypeContext.Provider value={[User, setUser]}>
        <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
          <Route href="/stafflogin">
            <LoginStaff />
          </Route>
        </LoginContext.Provider>
      </UserTypeContext.Provider>

      <Route href="/customerregister">
        <CustomerRegister />
      </Route>

      <Route href="/staffregister">
        <StaffRegister />
      </Route>

    </NavigationProvider>
  );
}

export default App;
