import React, { useState, useEffect, useContext } from 'react';
import { LoginContext, UserTypeContext } from '../App';

const Booking = () => {

    const [loggedIn] = useContext(LoginContext);
    const [userType] = useContext(UserTypeContext);

    const [formData, setFormData] = useState({
        customer_id: '',
        reservation_date_time: '',
        party_size: '',
        reservation_status: 'pending',
        username: ''
    });

    useEffect(() => {
        // Redirect to home page if not logged in or userType is not 'staff'
        if (!loggedIn || userType !== 'customer') {
            window.location.href = '/home';
        }
    }, [loggedIn, userType]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/create-reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert('Reservation created successfully');
            } else {
                throw new Error('Failed to create reservation');
            }
        } catch (error) {
            console.error('Error creating reservation:', error);
        }
    };

    return (
        <div>
            <h2>Make a Reservation</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Customer ID:
                    <input
                        type="number"
                        name="customer_id"
                        value={formData.customer_id}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Reservation Date and Time:
                    <input
                        type="datetime-local"
                        name="reservation_date_time"
                        value={formData.reservation_date_time}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Party Size:
                    <input
                        type="number"
                        name="party_size"
                        value={formData.party_size}
                        onChange={handleChange}
                        required
                    />
                </label>
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Booking;
