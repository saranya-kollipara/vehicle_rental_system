import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVehicles } from '../../hooks/useVehicles';
import { VehicleForm } from '../../components/admin/VehicleForm';
import { ArrowLeft } from 'lucide-react';

export const EditVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getVehicleById, editVehicle } = useVehicles();

  const vehicle = getVehicleById(id);

  if (!vehicle) {
    return <div>Vehicle not found.</div>;
  }

  const handleUpdate = (formData) => {
    editVehicle(id, formData);
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
        <h1 style={{ fontSize: '1.8rem', margin: '0 0 0.25rem 0' }}>Edit Vehicle: {vehicle.name}</h1>
        <p style={{ color: 'var(--text-muted)' }}>Update rates, availability status, and specifications.</p>
      </div>

      <VehicleForm 
        initialData={vehicle}
        onSubmit={handleUpdate} 
        onCancel={() => navigate('/admin/vehicles')} 
        buttonText="Save Vehicle Changes" 
      />
    </div>
  );
};
