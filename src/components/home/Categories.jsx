import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useVehicles } from '../../hooks/useVehicles';
import { mockCategories } from '../../data/categories';
import { Car, Shield, Zap, Crown, BatteryCharging, Bike } from 'lucide-react';

const iconMap = {
  Car: Car,
  Shield: Shield,
  Zap: Zap,
  Crown: Crown,
  BatteryCharging: BatteryCharging,
  Bike: Bike
};

export const Categories = () => {
  const navigate = useNavigate();
  const { setSelectedCategory } = useVehicles();

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    navigate('/vehicles');
  };

  return (
    <section style={{ padding: '5rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Browse by Vehicle Category</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>Find the right drive for your exact trip requirement</p>
        </div>

        <div className="grid-4" style={{ gap: '1.5rem' }}>
          {mockCategories.filter(c => c.id !== 'all').map((cat) => {
            const IconComponent = iconMap[cat.icon] || Car;
            return (
              <div 
                key={cat.id} 
                className="category-card"
                onClick={() => handleCategoryClick(cat.id)}
              >
                <div className="category-icon">
                  <IconComponent size={26} />
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>{cat.name}</h3>
                <span className="badge badge-info" style={{ marginBottom: '0.65rem' }}>
                  {cat.count} Available
                </span>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{cat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
