import React, { useState, useEffect, useContext } from 'react';
import './channel.css';
import { LoginContext, UserTypeContext } from '../App';

const Channel = () => { // remove data prop, load directly
  const [reservations, setReservations] = useState([]);
  const [loggedIn] = useContext(LoginContext);
  const [userType] = useContext(UserTypeContext);

  // ✅ Automatically fetch reservations when the page loads
  useEffect(() => {
    const loadReservations = async () => {
      try {
        const response = await fetch('/api');
        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error('Error loading reservations:', error);
      }
    };
    loadReservations();
  }, []); // runs only once on mount

  // ✅ Protect route — only staff can access
  useEffect(() => {
    if (!loggedIn || userType !== 'staff') {
      window.location.href = '/loginstaff';
    }
  }, [loggedIn, userType]);

  const updateReservationStatus = async (reservationId, status) => {
    const response = await fetch(`/api/update-status/${reservationId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error('Failed to update reservation status');
    }
  };

  const deleteReservation = async (reservationId) => {
    const response = await fetch(`/api/delete-reservation/${reservationId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete reservation');
    }
  };

  const fetchReservations = async () => {
    const response = await fetch('/api');
    if (!response.ok) {
      throw new Error('Failed to fetch reservations');
    }
    return response.json();
  };

  const handleAccept = async (reservationId) => {
    try {
      await updateReservationStatus(reservationId, 'Booked');
      const updatedData = await fetchReservations();
      setReservations(updatedData);
    } catch (error) {
      console.error('Error accepting reservation:', error);
    }
  };

  const handleDeny = async (reservationId) => {
    try {
      await updateReservationStatus(reservationId, 'Denied');
      const updatedData = await fetchReservations();
      setReservations(updatedData);
    } catch (error) {
      console.error('Error denying reservation:', error);
    }
  };

  const handleDelete = async (reservationId) => {
    try {
      await deleteReservation(reservationId);
      const updatedData = await fetchReservations();
      setReservations(updatedData);
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  return (
    <div className="container">
      <h1>Reservations:</h1>
      {!reservations || reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.reservation_id}>
                <td>{reservation.username}</td>
                <td>{new Date(reservation.reservation_date_time).toLocaleDateString()}</td>
                <td>{new Date(reservation.reservation_date_time).toLocaleTimeString()}</td>
                <td>{reservation.reservation_status}</td>
                <td>
                  {reservation.reservation_status === 'Booked' ? (
                    ''
                  ) : reservation.reservation_status === 'Denied' ? (
                    <button onClick={() => handleDelete(reservation.reservation_id)}>Delete</button>
                  ) : (
                    <div>
                      <button onClick={() => handleAccept(reservation.reservation_id)}>Accept</button>
                      <button onClick={() => handleDeny(reservation.reservation_id)}>Deny</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Channel;
