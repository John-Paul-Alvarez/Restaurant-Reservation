import React, { useContext } from 'react';
import NavigationContext from './NavigationContext';
import './mainNav.css';
import { LoginContext, UserTypeContext } from './App';

function Mainav() {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const [userType, setUserType] = useContext(UserTypeContext);
    const { navigate } = useContext(NavigationContext);

    const handleNavigation = (route) => {
        navigate(route);
    };

    const handleLogout = () => {
        // Reset loggedIn and userType contexts
        setLoggedIn(false);
        setUserType('notUser');

        // Remove token from localStorage
        localStorage.removeItem('token');

        // Redirect to home page
        handleNavigation('/home');
    };

    let navigationButtons;
    if (loggedIn) {
        if (userType === 'customer') {
            navigationButtons = (
                <>
                    <li><button onClick={() => handleNavigation('/book')}>Book</button></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                </>
            );
        } else if (userType === 'staff') {
            navigationButtons = (
                <>
                    <li><button onClick={() => handleNavigation('/channel')}>Channel</button></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                </>
            );
        }
    } else {
        navigationButtons = (
            <>
                <li><button onClick={() => handleNavigation('/login')}>Customer Login</button></li>
                <li><button onClick={() => handleNavigation('/stafflogin')}>Staff Login</button></li>
                <li><button onClick={() => handleNavigation('/customerregister')}>Customer Register</button></li>
                <li><button onClick={() => handleNavigation('/staffregister')}>Staff Register</button></li>
            </>
        );
    }

    return (
        <nav>
            <div className="logo"> Reserve</div>
            <ul>
                {navigationButtons}
            </ul>
        </nav>
    );
}

export default Mainav;
