import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useVehicles } from '../../hooks/useVehicles';
import { VehicleForm } from '../../components/admin/VehicleForm';
import { ArrowLeft } from 'lucide-react';

export const AddVehicle = () => {
  const navigate = useNavigate();
  const { addVehicle } = useVehicles();

  const handleAdd = (formData) => {
    addVehicle(formData);
    navigate('/admin/vehicles');
  };

  return (
    <div style={{ maxWidth: '850px' }}>
      <button 
        onClick={() => navigate('/admin/vehicles')}
        style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '1.5rem', cursor: 'pointer' }}
      >
        <ArrowLeft size={16} /> Back to Vehicle Management
      </button>

      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.8rem', margin: '0 0 0.25rem 0' }}>Add New Fleet Vehicle</h1>
        <p style={{ color: 'var(--text-muted)' }}>Enter vehicle specifications, category, registration details, and daily rate.</p>
      </div>

      <VehicleForm onSubmit={handleAdd} onCancel={() => navigate('/admin/vehicles')} buttonText="Add Vehicle to Fleet" />
    </div>
  );
};
