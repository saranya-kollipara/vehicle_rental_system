import React from 'react';
import { useVehicles } from '../../hooks/useVehicles';
import { Search, X } from 'lucide-react';

export const VehicleSearch = () => {
  const { searchQuery, setSearchQuery } = useVehicles();

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '450px' }}>
      <input 
        type="text"
        className="form-control"
        placeholder="Search vehicle name or brand (e.g. Innova, Honda, BMW)..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ paddingLeft: '2.5rem', paddingRight: searchQuery ? '2.5rem' : '1rem' }}
      />
      <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
      {searchQuery && (
        <button 
          onClick={() => setSearchQuery('')}
          style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
