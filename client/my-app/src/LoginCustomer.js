import React, { useState } from 'react';
import { useContext } from 'react';
import { LoginContext } from './App';
import { UserTypeContext } from './App';



const LoginCustomer = () => {

    const [loggedInContext, setLoggedInContext] = useContext(LoginContext);
    const [UserContext, setUserContext] = useContext(UserTypeContext);

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/customer/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const { token } = await response.json();
                // Save token to local storage or session storage
                localStorage.setItem('token', token);
                setLoggedIn(true);
                setLoggedInContext(true);
                setUserContext('customer');
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to login');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Failed to login');
        }
    };

    if (loggedIn) {
        return (
            <div>
                <p>Login successful!</p>
                <button onClick={() => window.location.href = '/book'}>Book Now</button>
            </div>
        );
    }

    return (
        <div>
            <h2>Customer Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginCustomer;
