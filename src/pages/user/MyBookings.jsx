import React, { useState } from 'react';
import { UserSidebar } from '../../components/user/UserSidebar';
import { BookingHistory } from '../../components/user/BookingHistory';
import { useBookings } from '../../hooks/useBookings';
import { useAuth } from '../../hooks/useAuth';

export const MyBookings = () => {
  const { currentUser } = useAuth();
  const { getUserBookings } = useBookings();
  const [filterStatus, setFilterStatus] = useState('all');

  return (
    <div className="container">
      <div className="dashboard-layout">
        <UserSidebar />

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem', margin: '0 0 0.35rem 0' }}>My Rental Bookings</h1>
              <p style={{ color: 'var(--text-muted)' }}>View and track status of all your DriveEase vehicle reservations</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Filter Status:</span>
              <select 
                className="form-control"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
              >
                <option value="all">All Bookings</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <BookingHistory />
        </div>
      </div>
    </div>
  );
};
