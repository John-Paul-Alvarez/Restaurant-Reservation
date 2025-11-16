import React, { useState, useEffect, useContext } from 'react';
import './channel.css';
import { LoginContext, UserTypeContext } from '../App';
import bgImg from '../assets/reservation-bg.jpg';


const Channel = () => {
  const [reservations, setReservations] = useState([]);
  const [loggedIn] = useContext(LoginContext);
  const [userType] = useContext(UserTypeContext);

  const [statusFilter, setStatusFilter] = useState('all'); // all | pending | booked | denied
  const [searchTerm, setSearchTerm] = useState('');

  // Load reservations on mount
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
  }, []);

  // Only allow logged-in staff
  useEffect(() => {
    if (!loggedIn || userType !== 'staff') {
      window.location.href = '/loginstaff';
    }
  }, [loggedIn, userType]);

  // --- API helpers (same endpoints your old code used) ---
  const fetchReservations = async () => {
    const response = await fetch('/api');
    if (!response.ok) {
      throw new Error('Failed to fetch reservations');
    }
    return response.json();
  };

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

  // --- Actions ---
  const handleAccept = async (reservationId) => {
    try {
      await updateReservationStatus(reservationId, 'Booked');
      const updated = await fetchReservations();
      setReservations(updated);
    } catch (error) {
      console.error('Error accepting reservation:', error);
    }
  };

  const handleDeny = async (reservationId) => {
    try {
      await updateReservationStatus(reservationId, 'Denied');
      const updated = await fetchReservations();
      setReservations(updated);
    } catch (error) {
      console.error('Error denying reservation:', error);
    }
  };

  const handleDelete = async (reservationId) => {
    try {
      await deleteReservation(reservationId);
      const updated = await fetchReservations();
      setReservations(updated);
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  // --- Filtering + search ---
  const normalizedFilter = statusFilter.toLowerCase();

  const filteredReservations = reservations.filter((reservation) => {
    const status = (reservation.reservation_status || '').toLowerCase();
    const name = (reservation.username || '').toLowerCase();
    const dateStr = reservation.reservation_date_time
      ? new Date(reservation.reservation_date_time).toLocaleDateString()
      : '';

    const matchesStatus =
      normalizedFilter === 'all' || status === normalizedFilter;

    const search = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !search ||
      name.includes(search) ||
      dateStr.toLowerCase().includes(search);

    return matchesStatus && matchesSearch;
  });

  return (
    <div
        className="res-page"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >

  <div className="res-overlay"></div>

      <div className="res-header">
        <h1 className="res-title">Reservations</h1>
        <p className="res-subtitle">
          Manage and view all customer reservations in one place.
        </p>
      </div>

      <div className="res-card">
        {/* Top toolbar: filters + search */}
        <div className="res-toolbar">
          <div className="res-filters">
            <button
              type="button"
              className={
                statusFilter === 'all'
                  ? 'res-pill res-pill-active'
                  : 'res-pill'
              }
              onClick={() => setStatusFilter('all')}
            >
              All
            </button>
            <button
              type="button"
              className={
                statusFilter === 'pending'
                  ? 'res-pill res-pill-active'
                  : 'res-pill'
              }
              onClick={() => setStatusFilter('pending')}
            >
              Pending
            </button>
            <button
              type="button"
              className={
                statusFilter === 'booked'
                  ? 'res-pill res-pill-active'
                  : 'res-pill'
              }
              onClick={() => setStatusFilter('booked')}
            >
              Booked
            </button>
            <button
              type="button"
              className={
                statusFilter === 'denied'
                  ? 'res-pill res-pill-active'
                  : 'res-pill'
              }
              onClick={() => setStatusFilter('denied')}
            >
              Denied
            </button>
          </div>

          <div className="res-search-wrapper">
            <span className="res-search-icon" aria-hidden="true">
              🔍
            </span>
            <input
              type="text"
              className="res-search-input"
              placeholder="Search by name or date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table / empty state --*/}
        {!filteredReservations || filteredReservations.length === 0 ? (
          <div className="res-empty">
            <p>No reservations found for this view.</p>
          </div>
        ) : (
          <div className="res-table-wrapper">
            <table className="res-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Party Size</th>
                  <th>Status</th>
                  <th className="res-col-actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.map((reservation) => {
                  const status = reservation.reservation_status || '';
                  const lowerStatus = status.toLowerCase();

                  let statusClass = 'res-status-pill';
                  if (lowerStatus === 'booked')
                    statusClass += ' res-status-booked';
                  else if (lowerStatus === 'pending')
                    statusClass += ' res-status-pending';
                  else if (lowerStatus === 'denied')
                    statusClass += ' res-status-denied';

                  return (
                    <tr key={reservation.reservation_id}>
                      <td>{reservation.username}</td>
                      <td>
                        {reservation.reservation_date_time
                          ? new Date(
                              reservation.reservation_date_time
                            ).toLocaleDateString()
                          : '—'}
                      </td>
                      <td>
                        {reservation.reservation_date_time
                          ? new Date(
                              reservation.reservation_date_time
                            ).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : '—'}
                      </td>

                           <td>{reservation.party_size || '—'}</td>
                      <td>
                        <span className={statusClass}>{status}</span>
                      </td>
                      <td className="res-actions-cell">
                        {lowerStatus === 'booked' && (
                          <span className="res-action-note">
                            No actions required
                          </span>
                        )}

                        {lowerStatus === 'denied' && (
                          <button
                            type="button"
                            className="res-btn res-btn-secondary"
                            onClick={() =>
                              handleDelete(reservation.reservation_id)
                            }
                          >
                            Delete
                          </button>
                        )}

                        {lowerStatus === 'pending' && (
                          <div className="res-action-buttons">
                            <button
                              type="button"
                              className="res-btn res-btn-accept"
                              onClick={() =>
                                handleAccept(reservation.reservation_id)
                              }
                            >
                              Accept
                            </button>
                            <button
                              type="button"
                              className="res-btn res-btn-deny"
                              onClick={() =>
                                handleDeny(reservation.reservation_id)
                              }
                            >
                              Deny
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Channel;
