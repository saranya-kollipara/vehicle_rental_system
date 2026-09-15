import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import { AvailabilityBadge } from '../vehicles/AvailabilityBadge';
import { Edit2, Trash2, Eye } from 'lucide-react';

export const VehicleTable = ({ vehicles = [], onDelete }) => {
  return (
    <div className="table-responsive">
      <table className="data-table">
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Category</th>
            <th>Reg. Number</th>
            <th>Specs</th>
            <th>Price / Day</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                No fleet vehicles found.
              </td>
            </tr>
          ) : (
            vehicles.map((v) => {
              const regNumber = v.registration_number || v.regNumber || 'TS-09-EV-100';
              const fuelType = v.fuel_type || v.fuelType || 'Petrol';
              const pricePerDay = parseFloat(v.price_per_day || v.pricePerDay || 0);
              const isAvailable = v.available === true || v.available === 1;

              return (
                <tr key={v.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <img 
                        src={v.image} 
                        alt={v.name} 
                        style={{ width: '54px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
                      />
                      <div>
                        <strong style={{ display: 'block', fontSize: '0.92rem' }}>{v.name}</strong>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{v.brand} • {v.year}</span>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-info">{v.category}</span></td>
                  <td><code style={{ fontSize: '0.85rem', padding: '0.2rem 0.4rem', backgroundColor: 'var(--light-bg)', borderRadius: '4px' }}>{regNumber}</code></td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{fuelType} • {v.transmission} • {v.seats} Seats</td>
                  <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{formatCurrency(pricePerDay)}</td>
                  <td><AvailabilityBadge available={isAvailable} /></td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      <Link to={`/vehicles/${v.id}`}>
                        <button style={{ padding: '6px', color: 'var(--primary)', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '6px', border: 'none', cursor: 'pointer' }} title="View">
                          <Eye size={16} />
                        </button>
                      </Link>
                      <Link to={`/admin/vehicles/edit/${v.id}`}>
                        <button style={{ padding: '6px', color: 'var(--secondary)', backgroundColor: 'rgba(245, 158, 11, 0.1)', borderRadius: '6px', border: 'none', cursor: 'pointer' }} title="Edit">
                          <Edit2 size={16} />
                        </button>
                      </Link>
                      <button 
                        onClick={() => onDelete(v.id)}
                        style={{ padding: '6px', color: 'var(--danger)', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '6px', border: 'none', cursor: 'pointer' }} 
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
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

export default VehicleTable;
