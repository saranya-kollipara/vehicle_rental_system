import React from 'react';
import { VehicleCard } from './VehicleCard';
import { EmptyState } from '../common/EmptyState';
import { Car } from 'lucide-react';

export const VehicleGrid = ({ vehicles, onResetFilters }) => {
  if (!vehicles || vehicles.length === 0) {
    return (
      <EmptyState 
        icon={Car}
        title="No vehicles found"
        description="We couldn't find any vehicles matching your current filter criteria. Try resetting your search filters."
        actionText="Reset All Filters"
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className="grid-3" style={{ gap: '1.75rem' }}>
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};
