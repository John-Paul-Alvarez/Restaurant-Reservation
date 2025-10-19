import React, { useContext } from 'react';
import NavigationContext from './NavigationContext';

const Route = ({ href, children }) => {
    const { navigate } = useContext(NavigationContext);

    const handleClick = () => {
        navigate(href);
    };

    return window.location.pathname === href ? children : null;
};

export default Route;
