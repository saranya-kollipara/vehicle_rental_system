import React from 'react';
import { useVehicles } from '../../hooks/useVehicles';
import { mockCategories } from '../../data/categories';
import { formatCurrency } from '../../utils/formatCurrency';
import { Filter, RotateCcw } from 'lucide-react';

export const VehicleFilters = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    selectedFuel,
    setSelectedFuel,
    selectedTransmission,
    setSelectedTransmission,
    selectedSeats,
    setSelectedSeats,
    resetFilters
  } = useVehicles();

  return (
    <aside className="filter-sidebar">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
        <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
          <Filter size={18} color="var(--primary)" /> Filter Fleet
        </h3>
        <button 
          onClick={resetFilters}
          style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      {/* Category Filter */}
      <div className="form-group">
        <label>Category</label>
        <select 
          className="form-control"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {mockCategories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Price Range Slider */}
      <div className="form-group">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label>Max Price / Day</label>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)' }}>
            {formatCurrency(priceRange)}
          </span>
        </div>
        <input 
          type="range"
          min="1000"
          max="10000"
          step="500"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--primary)', marginTop: '0.5rem' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>₹1,000</span>
          <span>₹10,000</span>
        </div>
      </div>

      {/* Fuel Type */}
      <div className="form-group">
        <label>Fuel Type</label>
        <select 
          className="form-control"
          value={selectedFuel}
          onChange={(e) => setSelectedFuel(e.target.value)}
        >
          <option value="all">All Fuel Types</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="electric">Electric</option>
        </select>
      </div>

      {/* Transmission */}
      <div className="form-group">
        <label>Transmission</label>
        <select 
          className="form-control"
          value={selectedTransmission}
          onChange={(e) => setSelectedTransmission(e.target.value)}
        >
          <option value="all">All Transmissions</option>
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select>
      </div>

      {/* Seating Capacity */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label>Seating Capacity</label>
        <select 
          className="form-control"
          value={selectedSeats}
          onChange={(e) => setSelectedSeats(e.target.value)}
        >
          <option value="all">Any Seats</option>
          <option value="2">2 Seater (Bike)</option>
          <option value="4">4 Seater</option>
          <option value="5">5 Seater</option>
          <option value="7">7 Seater SUV</option>
        </select>
      </div>
    </aside>
  );
};
