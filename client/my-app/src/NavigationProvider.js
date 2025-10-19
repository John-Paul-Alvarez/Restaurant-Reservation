import React, { useState } from 'react';
import NavigationContext from './NavigationContext';

const NavigationProvider = ({ children }) => {
    const [currentRoute, setCurrentRoute] = useState('');

    const navigate = (route) => {
        setCurrentRoute(route);
        window.history.pushState({}, '', route);
    };

    return (
        <NavigationContext.Provider value={{ navigate }}>
            {children}
        </NavigationContext.Provider>
    );
};

export default NavigationProvider;
