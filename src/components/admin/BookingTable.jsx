import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import { Eye } from 'lucide-react';

export const BookingTable = ({ bookings = [], onStatusChange }) => {
  return (
    <div className="table-responsive">
      <table className="data-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer</th>
            <th>Vehicle</th>
            <th>Dates</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                No customer bookings found.
              </td>
            </tr>
          ) : (
            bookings.map((b) => {
              const userName = b.user_name || b.userName || 'Customer';
              const userPhone = b.user_phone || b.userPhone || '';
              const vehicleName = b.vehicle_name || b.vehicleName || 'Vehicle';
              const vehicleImage = b.vehicle_image || b.vehicleImage || b.image || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80';
              const pickupDate = b.pickup_date ? new Date(b.pickup_date).toLocaleDateString() : (b.pickupDate || '');
              const returnDate = b.return_date ? new Date(b.return_date).toLocaleDateString() : (b.returnDate || '');
              const totalDays = b.total_days || b.totalDays || 1;
              const totalAmount = parseFloat(b.total_amount || b.totalAmount || 0);
              const paymentStatus = b.payment_status || b.paymentStatus || 'Paid';
              const bookingStatus = b.booking_status || b.bookingStatus || 'Confirmed';

              return (
                <tr key={b.id}>
                  <td><strong style={{ color: 'var(--primary)' }}>#{b.id}</strong></td>
                  <td>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.9rem' }}>{userName}</strong>
                      {userPhone && <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{userPhone}</span>}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <img src={vehicleImage} alt="" style={{ width: '40px', height: '30px', borderRadius: '4px', objectFit: 'cover' }} />
                      <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{vehicleName}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {pickupDate} → {returnDate} ({totalDays}d)
                  </td>
                  <td style={{ fontWeight: 700 }}>{formatCurrency(totalAmount)}</td>
                  <td>
                    <span className={`badge ${paymentStatus.toLowerCase() === 'paid' ? 'badge-success' : paymentStatus.toLowerCase() === 'pending' ? 'badge-warning' : 'badge-danger'}`} style={{ fontSize: '0.75rem' }}>
                      {paymentStatus}
                    </span>
                  </td>
                  <td>
                    <select 
                      className="form-control"
                      style={{ padding: '0.35rem 0.5rem', fontSize: '0.8rem', width: 'auto' }}
                      value={bookingStatus}
                      onChange={(e) => onStatusChange(b.id, e.target.value)}
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <Link to={`/bookings/${b.id}`}>
                      <button style={{ padding: '6px', color: 'var(--primary)', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>
                        <Eye size={16} />
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
