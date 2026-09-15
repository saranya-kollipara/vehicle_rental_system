import React from 'react';
import { useVehicles } from '../../hooks/useVehicles';
import { VehicleSearch } from '../../components/vehicles/VehicleSearch';
import { VehicleFilters } from '../../components/vehicles/VehicleFilters';
import { VehicleGrid } from '../../components/vehicles/VehicleGrid';

export const Vehicles = () => {
  const { filteredVehicles, resetFilters, sortBy, setSortBy } = useVehicles();

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '0.5rem' }}>Browse Vehicle Fleet</h1>
        <p style={{ color: 'var(--text-muted)' }}>Explore our range of verified cars, SUVs, EVs, and bikes available for instant rental</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem', alignItems: 'flex-start' }}>
        <VehicleFilters />

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem', backgroundColor: 'white', padding: '1rem 1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
            <VehicleSearch />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Sort by:</span>
              <select 
                className="form-control"
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Showing <strong>{filteredVehicles.length}</strong> vehicles
          </div>

          <VehicleGrid vehicles={filteredVehicles} onResetFilters={resetFilters} />
        </div>
      </div>
    </div>
  );
};
