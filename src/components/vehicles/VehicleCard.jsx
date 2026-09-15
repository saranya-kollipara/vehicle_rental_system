import React from 'react';
import { Link } from 'react-router-dom';
import { AvailabilityBadge } from './AvailabilityBadge';
import { Button } from '../common/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { Users, Fuel, Gauge, Star } from 'lucide-react';
import '../../styles/vehicles.css';

export const VehicleCard = ({ vehicle }) => {
  return (
    <div className="vehicle-card animate-fade-in">
      <div className="vehicle-card-image-wrapper">
        <img 
          src={vehicle.image} 
          alt={vehicle.name} 
          className="vehicle-card-image"
          loading="lazy"
        />
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <AvailabilityBadge available={vehicle.available} />
        </div>
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', backgroundColor: 'rgba(15,23,42,0.75)', backdropFilter: 'blur(4px)', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
          {vehicle.category}
        </div>
      </div>

      <div className="vehicle-card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{vehicle.brand}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--warning)' }}>
            <Star size={14} fill="var(--warning)" />
            <span>{vehicle.rating}</span>
            <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.75rem' }}>({vehicle.reviewsCount})</span>
          </div>
        </div>

        <h3 className="vehicle-card-title">{vehicle.name}</h3>

        <div className="vehicle-specs-grid">
          <div className="spec-item">
            <Users size={14} color="var(--primary)" />
            <span>{vehicle.seats} Seats</span>
          </div>
          <div className="spec-item">
            <Fuel size={14} color="var(--primary)" />
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="spec-item">
            <Gauge size={14} color="var(--primary)" />
            <span>{vehicle.transmission}</span>
          </div>
        </div>

        <div className="vehicle-card-footer">
          <div>
            <div className="price-tag">{formatCurrency(vehicle.pricePerDay)}</div>
            <div className="price-unit">per day</div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to={`/vehicles/${vehicle.id}`}>
              <Button variant="outline" size="sm">
                Details
              </Button>
            </Link>
            <Link to={`/vehicles/${vehicle.id}?book=true`}>
              <Button variant="primary" size="sm" disabled={!vehicle.available}>
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
