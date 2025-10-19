import React, { useState } from 'react';

const StaffRegister = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        role: '',
        additionalInfo: ''
    });

    const [error, setError] = useState('');
    const [registered, setRegistered] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/staff/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setRegistered(true);
            } else {
                const data = await response.json();
                setError(data.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Error registering staff:', error);
            setError('Registration failed');
        }
    };

    if (registered) {
        return (
            <div>
                <p>Registration successful. Please proceed to login:</p>
                <button onClick={() => window.location.href = '/stafflogin'}>Login</button>
            </div>
        );
    }

    return (
        <div>
            <h2>Staff Register</h2>
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
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Role:
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="manager">Manager</option>
                        <option value="receptionist">Receptionist</option>
                        {/* Add more roles as needed */}
                    </select>
                </label>
                <label>
                    Additional Information:
                    <textarea
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default StaffRegister;
