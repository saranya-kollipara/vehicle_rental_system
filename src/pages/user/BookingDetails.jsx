import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bookingService from '../../services/bookingService';
import { useBookings } from '../../hooks/useBookings';
import { UserSidebar } from '../../components/user/UserSidebar';
import { PaymentVerificationModal } from '../../components/booking/PaymentVerificationModal';
import { Button } from '../../components/common/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { PaymentStatus } from '../../components/user/PaymentStatus';
import { Loader } from '../../components/common/Loader';
import { ArrowLeft, Calendar, MapPin, User, Mail, Phone, ShieldCheck, CheckCircle2, FileCheck } from 'lucide-react';

export const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookingById, cancelBooking: cancelBookingContext, payBooking, fetchUserBookings } = useBookings();
  
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const fetchSingleBooking = async (showLoader = false) => {
    if (showLoader) setLoading(true);
    try {
      const res = await bookingService.getBookingById(id);
      if (res.success && res.data) {
        setBooking(res.data);
      } else {
        if (showLoader) setError('Booking not found');
      }
    } catch (err) {
      console.error('Failed to fetch booking details:', err);
      if (showLoader) setError('Booking reference not found');
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSingleBooking(true);
      // Setup auto-polling every 3 seconds for real-time admin approval updates
      const interval = setInterval(() => {
        fetchSingleBooking(false);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [id]);

  const handleCancel = async () => {
    if (!booking?.id) return;
    try {
      const res = await bookingService.cancelBooking(booking.id);
      if (res.success) {
        setBooking(prev => ({ ...prev, booking_status: 'Cancelled', payment_status: 'Refunded' }));
        if (cancelBookingContext) cancelBookingContext(booking.id);
      }
    } catch (err) {
      console.error('Error cancelling reservation:', err);
    }
  };

  const handleModalPaymentSuccess = async (bookingId, paymentData) => {
    const result = await payBooking(bookingId, paymentData);
    if (result.success) {
      setBooking(prev => ({
        ...prev,
        payment_status: 'Paid',
        paymentStatus: 'Paid',
        transaction_reference: paymentData.transaction_reference,
        payment_method: paymentData.payment_method
      }));
    }
    return result;
  };

  if (loading) return <Loader text="Loading reservation details..." />;

  if (error || !booking) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2>Booking Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>The requested reservation reference (#{id}) does not exist or has been removed.</p>
        <Button variant="primary" onClick={() => navigate('/my-bookings')}>Back to My Bookings</Button>
      </div>
    );
  }

  const bookingStatus = booking.booking_status || booking.bookingStatus || 'Confirmed';
  const paymentStatus = booking.payment_status || booking.paymentStatus || 'Paid';
  const paymentMethod = booking.payment_method || booking.paymentMethod || 'UPI / Card';
  const vehicleName = booking.vehicle_name || booking.vehicleName || 'Vehicle';
  const vehicleCategory = booking.vehicle_category || booking.vehicleCategory || 'SUV';
  const vehicleImage = booking.vehicle_image || booking.vehicleImage || booking.image || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80';
  const pricePerDay = parseFloat(booking.price_per_day || booking.dailyRate || 0);
  const userName = booking.user_name || booking.userName || 'Customer';
  const userEmail = booking.user_email || booking.userEmail || '';
  const userPhone = booking.user_phone || booking.userPhone || '';
  const pickupDate = booking.pickup_date ? new Date(booking.pickup_date).toLocaleDateString() : (booking.pickupDate || '');
  const returnDate = booking.return_date ? new Date(booking.return_date).toLocaleDateString() : (booking.returnDate || '');
  const totalDays = booking.total_days || booking.totalDays || 1;
  const pickupLocation = booking.pickup_location || booking.pickupLocation || 'Pickup Location';
  const dropoffLocation = booking.dropoff_location || booking.dropoffLocation || pickupLocation;
  const totalAmount = parseFloat(booking.total_amount || booking.totalAmount || 0);
  const transactionRef = booking.transaction_reference || booking.transactionReference || '';
  const createdAt = booking.created_at ? new Date(booking.created_at).toLocaleDateString() : (booking.createdAt || '');

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      <div className="dashboard-layout">
        <UserSidebar />

        <div>
          <button 
            onClick={() => navigate(-1)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1.5rem', cursor: 'pointer', background: 'none', border: 'none' }}
          >
            <ArrowLeft size={16} /> Back
          </button>

          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Booking Reference</span>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', margin: 0, fontFamily: 'var(--font-heading)' }}>
                  #{booking.id}
                </h2>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className={`badge ${bookingStatus.toLowerCase() === 'confirmed' ? 'badge-success' : bookingStatus.toLowerCase() === 'completed' ? 'badge-info' : 'badge-danger'}`} style={{ fontSize: '0.9rem' }}>
                  {bookingStatus}
                </span>
                {createdAt && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.35rem 0 0 0' }}>Placed on {createdAt}</p>}
              </div>
            </div>

            {/* Payment Received & Approved Banner */}
            {paymentStatus.toLowerCase() === 'paid' && (
              <div className="animate-fade-in" style={{
                padding: '1.25rem 1.5rem',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                border: '1.5px solid var(--success)',
                borderRadius: 'var(--radius-lg)',
                marginBottom: '1.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{ padding: '0.65rem', borderRadius: '50%', backgroundColor: 'var(--success)', color: 'white', display: 'flex' }}>
                  <ShieldCheck size={28} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <h4 style={{ margin: 0, color: 'var(--success)', fontSize: '1.2rem', fontWeight: 800 }}>
                      ✓ Payment Received & Verified by Admin
                    </h4>
                    <span className="badge badge-success" style={{ fontSize: '0.75rem' }}>Official Receipt</span>
                  </div>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    Your payment of <strong style={{ color: 'var(--success)' }}>{formatCurrency(totalAmount)}</strong> has been verified and confirmed by the System Admin.
                  </p>
                </div>
              </div>
            )}

            {/* Vehicle Info */}
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center', backgroundColor: 'var(--light-bg)', padding: '1.25rem', borderRadius: 'var(--radius-lg)' }}>
              <img src={vehicleImage} alt={vehicleName} style={{ width: '130px', height: '90px', borderRadius: '10px', objectFit: 'cover' }} />
              <div>
                <h3 style={{ fontSize: '1.25rem', margin: '0 0 0.35rem 0' }}>{vehicleName}</h3>
                <span className="badge badge-info">{vehicleCategory}</span>
                {pricePerDay > 0 && (
                  <p style={{ margin: '0.35rem 0 0 0', fontWeight: 700, color: 'var(--primary)' }}>
                    {formatCurrency(pricePerDay)} / day
                  </p>
                )}
              </div>
            </div>

            {/* Grid Breakdown */}
            <div className="grid-2" style={{ gap: '1.75rem', marginBottom: '2rem' }}>
              <div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>Customer Details</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <User size={16} color="var(--primary)" /> <strong>{userName}</strong>
                  </div>
                  {userEmail && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Mail size={16} color="var(--primary)" /> {userEmail}
                    </div>
                  )}
                  {userPhone && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Phone size={16} color="var(--primary)" /> {userPhone}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>Trip Schedule & Hub</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={16} color="var(--primary)" /> {pickupDate} → {returnDate} ({totalDays} Days)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={16} color="var(--primary)" /> Pickup: {pickupLocation}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={16} color="var(--primary)" /> Return: {dropoffLocation}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary & Official Receipt */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '0.85rem' }}>Payment Summary</h4>
              <PaymentStatus 
                status={paymentStatus} 
                amount={totalAmount} 
                method={paymentMethod} 
                transactionRef={transactionRef}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
              {paymentStatus.toLowerCase() === 'pending' && bookingStatus.toLowerCase() !== 'cancelled' && (
                <Button variant="primary" onClick={() => setShowPaymentModal(true)}>
                  Submit Payment Details
                </Button>
              )}
              {bookingStatus.toLowerCase() === 'confirmed' && (
                <Button variant="danger" onClick={handleCancel}>
                  Cancel Reservation
                </Button>
              )}
            </div>

            {showPaymentModal && booking && (
              <PaymentVerificationModal 
                booking={booking}
                onClose={() => setShowPaymentModal(false)}
                onSuccess={handleModalPaymentSuccess}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
