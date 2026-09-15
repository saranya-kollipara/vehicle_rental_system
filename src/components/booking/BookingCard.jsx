import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../common/Button';
import { Calendar, MapPin, ChevronRight, CreditCard } from 'lucide-react';

export const BookingCard = ({ booking = {}, onCancel, onPay }) => {
  const bookingStatus = booking.booking_status || booking.bookingStatus || 'Confirmed';
  const paymentStatus = booking.payment_status || booking.paymentStatus || 'Pending';
  const vehicleName = booking.vehicle_name || booking.vehicleName || 'Vehicle';
  const vehicleImage = booking.vehicle_image || booking.vehicleImage || booking.image || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80';
  const pickupDate = booking.pickup_date ? new Date(booking.pickup_date).toLocaleDateString() : (booking.pickupDate || '');
  const returnDate = booking.return_date ? new Date(booking.return_date).toLocaleDateString() : (booking.returnDate || '');
  const totalDays = booking.total_days || booking.totalDays || 1;
  const pickupLocation = booking.pickup_location || booking.pickupLocation || 'Pickup Location';
  const totalAmount = booking.total_amount || booking.totalAmount || 0;
  const createdAt = booking.created_at ? new Date(booking.created_at).toLocaleDateString() : (booking.createdAt || '');

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return <span className="badge badge-success">Confirmed</span>;
      case 'completed':
        return <span className="badge badge-info">Completed</span>;
      case 'pending':
        return <span className="badge badge-warning">Pending</span>;
      case 'cancelled':
        return <span className="badge badge-danger">Cancelled</span>;
      default:
        return <span className="badge badge-info">{status}</span>;
    }
  };

  const getPaymentBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return <span className="badge badge-success" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>✓ Payment Received & Verified</span>;
      case 'pending':
        return <span className="badge badge-warning" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>⏳ Pending Admin Verification</span>;
      case 'refunded':
        return <span className="badge badge-info" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Refunded</span>;
      case 'failed':
        return <span className="badge badge-danger" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Payment Failed</span>;
      default:
        return <span className="badge badge-warning" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{status || 'Pending'}</span>;
    }
  };

  return (
    <div className="card" style={{ padding: '1.5rem', marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--primary)', fontSize: '1.1rem' }}>
            #{booking.id}
          </span>
          {createdAt && (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Booked on {createdAt}
            </span>
          )}
        </div>
        <div>
          {getStatusBadge(bookingStatus)}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <img 
          src={vehicleImage} 
          alt={vehicleName} 
          style={{ width: '110px', height: '80px', borderRadius: '10px', objectFit: 'cover' }}
        />

        <div style={{ flex: 1, minWidth: '220px' }}>
          <h4 style={{ fontSize: '1.1rem', margin: '0 0 0.35rem 0' }}>{vehicleName}</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calendar size={14} color="var(--primary)" />
              <span>{pickupDate} to {returnDate} ({totalDays} Days)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <MapPin size={14} color="var(--primary)" />
              <span>{pickupLocation}</span>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'right', minWidth: '140px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Amount</div>
          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary)' }}>
            {formatCurrency(totalAmount)}
          </div>
          {getPaymentBadge(paymentStatus)}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
        {paymentStatus.toLowerCase() === 'pending' && bookingStatus !== 'Cancelled' && (
          <Link to={`/bookings/${booking.id}`}>
            <Button variant="primary" size="sm" icon={CreditCard}>
              Submit Payment Details
            </Button>
          </Link>
        )}
        {bookingStatus === 'Confirmed' && onCancel && (
          <Button variant="danger" size="sm" onClick={() => onCancel(booking.id)}>
            Cancel Booking
          </Button>
        )}
        <Link to={`/bookings/${booking.id}`}>
          <Button variant="outline" size="sm" icon={ChevronRight}>
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BookingCard;
