import React, { useState, useEffect } from 'react';
import bookingService from '../../services/bookingService';
import { BookingTable } from '../../components/admin/BookingTable';
import { Loader } from '../../components/common/Loader';
import { Search } from 'lucide-react';

export const ManageBookings = () => {
  const [bookingsList, setBookingsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await bookingService.getAllBookingsAdmin();
      if (res.success && res.data) {
        setBookingsList(res.data);
      }
      setError('');
    } catch (err) {
      console.error('Failed to fetch admin bookings:', err);
      setError('Unable to load customer reservations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await bookingService.updateBookingStatusAdmin(id, { booking_status: newStatus });
      if (res.success) {
        setBookingsList(prev => prev.map(b => b.id === id ? { ...b, booking_status: newStatus, bookingStatus: newStatus } : b));
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  if (loading) return <Loader text="Loading customer reservations..." />;

  const filtered = bookingsList.filter(b => {
    const bookingStatus = (b.booking_status || b.bookingStatus || '').toLowerCase();
    const matchesStatus = statusFilter === 'all' || bookingStatus === statusFilter.toLowerCase();
    
    const customerName = b.user_name || b.userName || '';
    const vehicleName = b.vehicle_name || b.vehicleName || '';
    const bookingId = b.id || '';

    const matchesSearch = bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vehicleName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', margin: '0 0 0.25rem 0' }}>Customer Reservations Management</h1>
        <p style={{ color: 'var(--text-muted)' }}>Monitor customer bookings, update rental statuses, and check schedules.</p>
      </div>

      {error && (
        <div style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: '8px', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', width: '300px' }}>
          <Search size={18} color="var(--text-muted)" style={{ marginRight: '0.5rem' }} />
          <input 
            type="text"
            className="form-control"
            style={{ border: 'none', padding: 0 }}
            placeholder="Search booking ID or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Filter Status:</span>
          <select 
            className="form-control"
            style={{ padding: '0.35rem 0.65rem', fontSize: '0.85rem' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <BookingTable bookings={filtered} onStatusChange={handleStatusChange} />
    </div>
  );
};

export default ManageBookings;
