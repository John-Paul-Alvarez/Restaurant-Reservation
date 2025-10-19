import React, { useState, useEffect, useContext } from 'react';
import './channel.css'
import { LoginContext, UserTypeContext } from '../App';


const Channel = ({ data }) => {
  const [reservations, setReservations] = useState(data);
  const [loggedIn] = useContext(LoginContext);
  const [userType] = useContext(UserTypeContext);

  useEffect(() => {
    setReservations(data);
  }, [data]);

  useEffect(() => {
    // Redirect to home page if not logged in or userType is not 'staff'
    if (!loggedIn || userType !== 'staff') {
      window.location.href = '/home';
    }
  }, [loggedIn, userType]);

  const handleAccept = async (reservationId) => {
    try {
      // Send request to update reservation status to 'Booked'
      await updateReservationStatus(reservationId, 'Booked');
      // Fetch updated reservations data from the backend
      const updatedData = await fetchReservations();
      // Update state with updated reservations data
      setReservations(updatedData);
    } catch (error) {
      console.error('Error accepting reservation:', error);
    }
  };

  const handleDeny = async (reservationId) => {
    try {
      // Send request to update reservation status to 'Denied'
      await updateReservationStatus(reservationId, 'Denied');
      // Fetch updated reservations data from the backend
      const updatedData = await fetchReservations();
      // Update state with updated reservations data
      setReservations(updatedData);
    } catch (error) {
      console.error('Error denying reservation:', error);
    }
  };

  const handleDelete = async (reservationId) => {
    try {
      // Send request to delete reservation
      await deleteReservation(reservationId);
      // Fetch updated reservations data from the backend
      const updatedData = await fetchReservations();
      // Update state with updated reservations data
      setReservations(updatedData);
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  const updateReservationStatus = async (reservationId, status) => {
    const response = await fetch(`/api/update-status/${reservationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
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

  return (
    <div className="container">
      <h1>Reservations:</h1>
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
          {reservations.map(reservation => (
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
    </div>
  );
};


export default Channel;