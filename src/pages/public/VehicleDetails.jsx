import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import vehicleService from '../../services/vehicleService';
import { useVehicles } from '../../hooks/useVehicles';
import { useBookings } from '../../hooks/useBookings';
import { VehicleImageGallery } from '../../components/vehicles/VehicleImageGallery';
import { AvailabilityBadge } from '../../components/vehicles/AvailabilityBadge';
import { BookingForm } from '../../components/booking/BookingForm';
import { BookingSummary } from '../../components/booking/BookingSummary';
import { PaymentVerificationModal } from '../../components/booking/PaymentVerificationModal';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { formatCurrency } from '../../utils/formatCurrency';
import { Star, Users, Fuel, Gauge, ShieldCheck, Check, CheckCircle2, ArrowLeft, AlertCircle } from 'lucide-react';

import '../../styles/booking.css';

export const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { getVehicleById } = useVehicles();
  const { createBooking, payBooking } = useBookings();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingConfirmed, setBookingConfirmed] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [pickupDate, setPickupDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const [returnDate, setReturnDate] = useState(() => {
    const next = new Date();
    next.setDate(next.getDate() + 3);
    return next.toISOString().split('T')[0];
  });

  const [pickupLocation, setPickupLocation] = useState('Hyderabad Airport (RGIA)');

  useEffect(() => {
    const loadVehicle = async () => {
      const cached = getVehicleById ? getVehicleById(id) : null;
      if (cached) {
        setVehicle(cached);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await vehicleService.getVehicleById(id);
        if (res.success && res.data) {
          setVehicle(res.data);
        }
      } catch (err) {
        console.error('Failed to load vehicle details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadVehicle();
  }, [id, getVehicleById]);

  if (loading) return <Loader text="Loading vehicle specs & rates..." />;

  if (!vehicle) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2>Vehicle Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>The requested vehicle could not be located in our active fleet.</p>
        <Button variant="primary" onClick={() => navigate('/vehicles')}>Return to Fleet</Button>
      </div>
    );
  }

  const dailyPrice = parseFloat(vehicle.price_per_day || vehicle.pricePerDay || 0);

  const handleConfirmBooking = async (bookingData) => {
    setErrorMsg('');
    const result = await createBooking(bookingData);
    if (result.success && result.booking) {
      setBookingConfirmed(result.booking);
      // If UPI or Card selected, open Payment Verification Modal for Transaction ID validation
      const pm = (bookingData.payment_method || '').toLowerCase();
      if (pm.includes('upi') || pm.includes('card') || pm.includes('credit')) {
        setShowPaymentModal(true);
      }
    } else {
      setErrorMsg(result.message || 'Failed to place reservation. Please try again.');
    }
  };

  const handleModalPaymentSuccess = async (bookingId, paymentData) => {
    const result = await payBooking(bookingId, paymentData);
    if (result.success) {
      setBookingConfirmed(prev => ({
        ...prev,
        payment_status: 'Paid',
        paymentStatus: 'Paid',
        transaction_reference: paymentData.transaction_reference,
        payment_method: paymentData.payment_method
      }));
    }
    return result;
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <button 
        onClick={() => navigate('/vehicles')}
        style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1.5rem', cursor: 'pointer', background: 'none', border: 'none' }}
      >
        <ArrowLeft size={16} /> Back to Vehicles
      </button>

      {errorMsg && (
        <div style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      {bookingConfirmed ? (
        /* Confirmation Screen */
        <div className="card animate-fade-in" style={{ padding: '3rem 2rem', textAlign: 'center', maxWidth: '650px', margin: '0 auto' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
            <CheckCircle2 size={40} />
          </div>

          <h2 style={{ fontSize: '2rem', color: 'var(--success)', marginBottom: '0.5rem' }}>
            ✓ Booking Confirmed!
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Your vehicle reservation reference #{bookingConfirmed.id} has been recorded.
          </p>

          <div style={{ backgroundColor: 'var(--light-bg)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', textAlign: 'left', marginBottom: '1.5rem', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Booking Reference ID</span>
              <strong style={{ color: 'var(--primary)', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>#{bookingConfirmed.id}</strong>
            </div>

            <div className="grid-2" style={{ gap: '1rem', fontSize: '0.9rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Vehicle</span>
                <strong>{bookingConfirmed.vehicle_name || bookingConfirmed.vehicleName || vehicle.name}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Pickup Location</span>
                <strong>{bookingConfirmed.pickup_location || bookingConfirmed.pickupLocation}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Rental Dates</span>
                <strong>{new Date(bookingConfirmed.pickup_date || bookingConfirmed.pickupDate).toLocaleDateString()} → {new Date(bookingConfirmed.return_date || bookingConfirmed.returnDate).toLocaleDateString()}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Total Amount</span>
                <strong style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>{formatCurrency(bookingConfirmed.total_amount || bookingConfirmed.totalAmount)}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Payment Status</span>
                <span className={`badge ${ (bookingConfirmed.payment_status || bookingConfirmed.paymentStatus || 'Pending').toLowerCase() === 'paid' ? 'badge-success' : 'badge-warning' }`} style={{ marginTop: '0.2rem' }}>
                  {(bookingConfirmed.payment_status || bookingConfirmed.paymentStatus || 'Pending').toLowerCase() === 'paid' ? '✓ Paid' : '⏳ Payment Pending'}
                </span>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Payment Method</span>
                <strong>{bookingConfirmed.payment_method || bookingConfirmed.paymentMethod || 'UPI / Card'}</strong>
              </div>
            </div>
          </div>

          {(bookingConfirmed.payment_status || bookingConfirmed.paymentStatus || 'Pending').toLowerCase() !== 'paid' && (
            <div style={{ marginBottom: '1.5rem', padding: '1.25rem', backgroundColor: 'rgba(245, 158, 11, 0.08)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', margin: '0 0 0.85rem 0', fontWeight: 600 }}>
                Payment Status is <strong>Pending</strong>. Verify payment with your UPI or Credit Card Transaction ID now.
              </p>
              <Button variant="primary" onClick={() => setShowPaymentModal(true)}>
                Validate Payment via Transaction ID
              </Button>
            </div>
          )}

          {showPaymentModal && bookingConfirmed && (
            <PaymentVerificationModal 
              booking={bookingConfirmed}
              onClose={() => setShowPaymentModal(false)}
              onSuccess={handleModalPaymentSuccess}
            />
          )}

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <Button variant="primary" onClick={() => navigate('/my-bookings')}>
              View My Bookings
            </Button>
            <Button variant="outline" onClick={() => navigate('/vehicles')}>
              Browse Fleet
            </Button>
          </div>
        </div>
      ) : (
        /* Details View */
        <div className="booking-container">
          <div>
            <VehicleImageGallery 
              images={vehicle.images || [vehicle.image]} 
              mainImage={vehicle.image} 
              vehicleName={vehicle.name} 
            />

            <div style={{ marginTop: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <span style={{ textTransform: 'uppercase', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    {vehicle.brand} • {vehicle.year}
                  </span>
                  <h1 style={{ fontSize: '2.2rem', margin: '0.2rem 0 0.5rem 0' }}>{vehicle.name}</h1>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <AvailabilityBadge available={vehicle.available === 1 || vehicle.available === true} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--warning)', fontWeight: 700 }}>
                      <Star size={16} fill="var(--warning)" />
                      <span>{vehicle.rating || '4.8'} ({vehicle.reviews_count || vehicle.reviewsCount || 12} reviews)</span>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
                    {formatCurrency(dailyPrice)}
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>per day (incl. taxes)</span>
                </div>
              </div>

              {/* Specs */}
              <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>Technical Specifications</h3>
                <div className="grid-4" style={{ gap: '1rem', textAlign: 'center' }}>
                  <div style={{ padding: '1rem', backgroundColor: 'var(--light-bg)', borderRadius: '8px' }}>
                    <Users size={20} color="var(--primary)" style={{ marginBottom: '0.35rem' }} />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Capacity</span>
                    <strong>{vehicle.seats} Seats</strong>
                  </div>

                  <div style={{ padding: '1rem', backgroundColor: 'var(--light-bg)', borderRadius: '8px' }}>
                    <Fuel size={20} color="var(--primary)" style={{ marginBottom: '0.35rem' }} />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Fuel Type</span>
                    <strong>{vehicle.fuel_type || vehicle.fuelType}</strong>
                  </div>

                  <div style={{ padding: '1rem', backgroundColor: 'var(--light-bg)', borderRadius: '8px' }}>
                    <Gauge size={20} color="var(--primary)" style={{ marginBottom: '0.35rem' }} />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Transmission</span>
                    <strong>{vehicle.transmission}</strong>
                  </div>

                  <div style={{ padding: '1rem', backgroundColor: 'var(--light-bg)', borderRadius: '8px' }}>
                    <ShieldCheck size={20} color="var(--primary)" style={{ marginBottom: '0.35rem' }} />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Engine / Mileage</span>
                    <strong>{vehicle.specs?.mileage || '16 kmpl'}</strong>
                  </div>
                </div>
              </div>

              {/* Description & Features */}
              <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.85rem' }}>Vehicle Description</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                  {vehicle.description}
                </p>

                <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Vehicle Features & Amenities</h3>
                <div className="grid-2" style={{ gap: '0.75rem' }}>
                  {(vehicle.features || ['Touchscreen Infotainment', 'Apple CarPlay & Android Auto', '360° Camera', 'Sunroof', 'Automatic Climate Control', 'ABS with EBD']).map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={14} />
                      </div>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Booking Panel */}
          <div style={{ 
            position: 'sticky', 
            top: '90px', 
            alignSelf: 'start', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1.5rem' 
          }}>
            <BookingSummary 
              vehicle={vehicle}
              pickupDate={pickupDate}
              returnDate={returnDate}
              pickupLocation={pickupLocation}
            />

            <BookingForm 
              vehicle={vehicle}
              onConfirmBooking={handleConfirmBooking}
              pickupDate={pickupDate}
              setPickupDate={setPickupDate}
              returnDate={returnDate}
              setReturnDate={setReturnDate}
              pickupLocation={pickupLocation}
              setPickupLocation={setPickupLocation}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleDetails;
