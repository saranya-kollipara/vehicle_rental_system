import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useBookings } from '../../hooks/useBookings';
import { UserSidebar } from '../../components/user/UserSidebar';
import { StatCard } from '../../components/admin/StatCard';
import { BookingHistory } from '../../components/user/BookingHistory';
import { Car, Clock, CheckCircle2, XCircle } from 'lucide-react';
import '../../styles/dashboard.css';

export const UserDashboard = () => {
  const { currentUser } = useAuth();
  const { getUserBookings, bookings = [] } = useBookings();

  const userBookings = getUserBookings ? getUserBookings(currentUser?.id, currentUser?.email) : (bookings || []);

  const total = userBookings.length;
  const active = userBookings.filter(b => {
    const status = (b.booking_status || b.bookingStatus || '').toLowerCase();
    return status === 'confirmed' || status === 'pending';
  }).length;

  const completed = userBookings.filter(b => {
    const status = (b.booking_status || b.bookingStatus || '').toLowerCase();
    return status === 'completed';
  }).length;

  const cancelled = userBookings.filter(b => {
    const status = (b.booking_status || b.bookingStatus || '').toLowerCase();
    return status === 'cancelled';
  }).length;

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      <div className="dashboard-layout">
        <UserSidebar />

        <div>
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', margin: '0 0 0.35rem 0' }}>Welcome back, {currentUser?.name || 'Driver'}!</h1>
            <p style={{ color: 'var(--text-muted)' }}>Manage your active reservations, rental history, and account profile details.</p>
          </div>

          {/* Stats Overview */}
          <div className="stat-grid" style={{ marginBottom: '2.5rem' }}>
            <StatCard title="Total Bookings" value={total} icon={Car} color="var(--primary)" />
            <StatCard title="Active Booking" value={active} icon={Clock} color="var(--accent)" />
            <StatCard title="Completed Trips" value={completed} icon={CheckCircle2} color="var(--success)" />
            <StatCard title="Cancelled" value={cancelled} icon={XCircle} color="var(--danger)" />
          </div>

          {/* Recent Bookings */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.35rem', margin: 0 }}>Recent Rental Bookings</h2>
            </div>
            <BookingHistory limit={3} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
