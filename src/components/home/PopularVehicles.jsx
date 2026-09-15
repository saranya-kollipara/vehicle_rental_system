import React from 'react';
import { Link } from 'react-router-dom';
import { useVehicles } from '../../hooks/useVehicles';
import { VehicleGrid } from '../vehicles/VehicleGrid';
import { Button } from '../common/Button';
import { ArrowRight } from 'lucide-react';

export const PopularVehicles = () => {
  const { vehicles } = useVehicles();
  const popularVehicles = vehicles.slice(0, 6);

  return (
    <section style={{ padding: '4rem 0', backgroundColor: 'var(--light-bg)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>Popular Rental Fleet</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>Top rated cars, SUVs & bikes ready for instant booking</p>
          </div>
          <Link to="/vehicles">
            <Button variant="outline" icon={ArrowRight}>
              Explore Full Fleet
            </Button>
          </Link>
        </div>

        <VehicleGrid vehicles={popularVehicles} />
      </div>
    </section>
  );
};
