import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { calculateRentalPrice } from '../../utils/calculateRentalPrice';
import { Calendar, MapPin } from 'lucide-react';
import '../../styles/booking.css';

export const BookingSummary = ({ vehicle, pickupDate, returnDate, pickupLocation }) => {
  if (!vehicle) return null;

  const dailyPrice = parseFloat(vehicle.price_per_day || vehicle.pricePerDay || 0);
  const calculation = calculateRentalPrice(
    dailyPrice,
    pickupDate,
    returnDate
  );

  return (
    <div className="booking-summary-card">
      <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
        Booking Price Breakdown
      </h3>

      {/* Vehicle Info */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
        <img 
          src={vehicle.image} 
          alt={vehicle.name} 
          style={{ width: '80px', height: '60px', borderRadius: '8px', objectFit: 'cover' }}
        />
        <div>
          <h4 style={{ fontSize: '0.95rem', margin: 0 }}>{vehicle.name}</h4>
          <span className="badge badge-info" style={{ marginTop: '0.2rem' }}>{vehicle.category}</span>
          <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, margin: '0.2rem 0 0 0' }}>
            {formatCurrency(dailyPrice)} / day
          </p>
        </div>
      </div>

      {/* Selected Schedule */}
      <div style={{ backgroundColor: 'var(--light-bg)', padding: '0.85rem', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
          <MapPin size={14} color="var(--primary)" />
          <span>Location: <strong>{pickupLocation || 'Hyderabad Hub'}</strong></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
          <Calendar size={14} color="var(--primary)" />
          <span>Dates: <strong>{pickupDate || 'Select'}</strong> to <strong>{returnDate || 'Select'}</strong></span>
        </div>
      </div>

      {/* Financial Details */}
      <div className="price-breakdown-row">
        <span>Vehicle Rate ({formatCurrency(dailyPrice)} × {calculation.days} {calculation.days === 1 ? 'day' : 'days'})</span>
        <span>{formatCurrency(calculation.rentalAmount)}</span>
      </div>

      <div className="price-breakdown-row">
        <span>Taxes & Fees (18% GST)</span>
        <span>{formatCurrency(calculation.taxAmount)}</span>
      </div>

      <div className="price-breakdown-row total">
        <span>Total Payable Amount</span>
        <span style={{ color: 'var(--primary)' }}>{formatCurrency(calculation.totalAmount)}</span>
      </div>
    </div>
  );
};

export default BookingSummary;
