import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { validateBookingForm } from '../../utils/validation';
import { Button } from '../common/Button';
import { User, Mail, Phone, MapPin, Calendar, CreditCard, LogIn } from 'lucide-react';

export const BookingForm = ({ 
  vehicle, 
  onConfirmBooking, 
  pickupDate, 
  setPickupDate, 
  returnDate, 
  setReturnDate, 
  pickupLocation, 
  setPickupLocation 
}) => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [customerName, setCustomerName] = useState(currentUser?.name || 'Demo Customer');
  const [email, setEmail] = useState(currentUser?.email || 'user@demo.com');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [dropoffLocation, setDropoffLocation] = useState(pickupLocation || 'Hyderabad Airport (RGIA)');
  const [paymentMethod, setPaymentMethod] = useState('UPI / Credit Card');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentUser) {
      setCustomerName(currentUser.name || 'Demo Customer');
      setEmail(currentUser.email || 'user@demo.com');
      setPhone(currentUser.phone || '+91 98765 43210');
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Redirect to login if user is NOT logged in
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname + location.search } });
      return;
    }

    const formData = {
      customerName,
      email,
      phone,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      returnDate
    };

    const validationErrors = validateBookingForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    
    try {
      await onConfirmBooking({
        vehicle_id: vehicle?.id || 1,
        customer_name: customerName,
        customerName,
        email,
        phone,
        pickup_location: pickupLocation,
        pickupLocation,
        dropoff_location: dropoffLocation,
        dropoffLocation,
        pickup_date: pickupDate,
        pickupDate,
        return_date: returnDate,
        returnDate,
        payment_method: paymentMethod,
        paymentMethod
      });
    } catch (err) {
      console.error('Error during booking submission:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="card" 
      style={{ 
        padding: '1.75rem', 
        width: '100%', 
        maxWidth: '100%', 
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', paddingBottom: '0.65rem', borderBottom: '1px solid var(--border)' }}>
        Customer & Rental Information
      </h3>

      {/* Customer Info */}
      <div className="grid-2" style={{ gap: '0.85rem' }}>
        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <User size={14} color="var(--primary)" /> Full Name
          </label>
          <input 
            type="text"
            className="form-control"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter customer name"
          />
          {errors.customerName && <span className="form-error">{errors.customerName}</span>}
        </div>

        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Mail size={14} color="var(--primary)" /> Email Address
          </label>
          <input 
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>
      </div>

      <div className="form-group">
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Phone size={14} color="var(--primary)" /> Mobile Phone Number
        </label>
        <input 
          type="tel"
          className="form-control"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+91 98765 43210"
        />
        {errors.phone && <span className="form-error">{errors.phone}</span>}
      </div>

      {/* Pickup & Schedule */}
      <h4 style={{ fontSize: '1.05rem', margin: '1.25rem 0 0.85rem 0', color: 'var(--text-main)' }}>
        Location & Travel Dates
      </h4>

      <div className="grid-2" style={{ gap: '0.85rem' }}>
        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <MapPin size={14} color="var(--primary)" /> Pickup Location
          </label>
          <select 
            className="form-control"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
          >
            <option value="Hyderabad Airport (RGIA)">Hyderabad Airport (RGIA)</option>
            <option value="Hitec City, Hyderabad">Hitec City / Madhapur</option>
            <option value="Banjara Hills, Hyderabad">Banjara Hills Hub</option>
            <option value="Gachibowli, Hyderabad">Gachibowli Financial Dist.</option>
            <option value="Secunderabad Railway Station">Secunderabad Railway Station</option>
          </select>
          {errors.pickupLocation && <span className="form-error">{errors.pickupLocation}</span>}
        </div>

        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <MapPin size={14} color="var(--primary)" /> Drop-off Location
          </label>
          <select 
            className="form-control"
            value={dropoffLocation}
            onChange={(e) => setDropoffLocation(e.target.value)}
          >
            <option value="Hyderabad Airport (RGIA)">Hyderabad Airport (RGIA)</option>
            <option value="Hitec City, Hyderabad">Hitec City / Madhapur</option>
            <option value="Banjara Hills, Hyderabad">Banjara Hills Hub</option>
            <option value="Gachibowli, Hyderabad">Gachibowli Financial Dist.</option>
            <option value="Secunderabad Railway Station">Secunderabad Railway Station</option>
          </select>
        </div>
      </div>

      <div className="grid-2" style={{ gap: '0.85rem' }}>
        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Calendar size={14} color="var(--primary)" /> Pickup Date
          </label>
          <input 
            type="date"
            className="form-control"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
          />
          {errors.pickupDate && <span className="form-error">{errors.pickupDate}</span>}
        </div>

        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Calendar size={14} color="var(--primary)" /> Return Date
          </label>
          <input 
            type="date"
            className="form-control"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
          />
          {errors.returnDate && <span className="form-error">{errors.returnDate}</span>}
        </div>
      </div>

      {/* Payment Selection */}
      <h4 style={{ fontSize: '1.05rem', margin: '1.25rem 0 0.85rem 0', color: 'var(--text-main)' }}>
        Payment Method
      </h4>

      <div className="form-group">
        <select 
          className="form-control"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="UPI / GPay / PhonePe">UPI (GPay / PhonePe / Paytm)</option>
          <option value="Credit / Debit Card">Credit / Debit Card</option>
          <option value="Pay on Vehicle Delivery">Pay on Pickup / Delivery</option>
        </select>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <Button 
          type="submit" 
          variant="primary" 
          size="lg" 
          icon={isAuthenticated ? CreditCard : LogIn} 
          fullWidth
          disabled={submitting}
        >
          {submitting 
            ? 'Processing Reservation...' 
            : isAuthenticated 
              ? 'Confirm Rental Booking Now' 
              : 'Log In to Confirm Booking'
          }
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;

