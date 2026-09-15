import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useVehicles } from '../../hooks/useVehicles';
import { VehicleTable } from '../../components/admin/VehicleTable';
import { Button } from '../../components/common/Button';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { Plus, Search } from 'lucide-react';

export const ManageVehicles = () => {
  const { vehicles, deleteVehicle } = useVehicles();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const filtered = vehicles.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteVehicle(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', margin: '0 0 0.25rem 0' }}>Vehicle Inventory Management</h1>
          <p style={{ color: 'var(--text-muted)' }}>Add, edit rates, specs, and manage availability for all fleet vehicles.</p>
        </div>

        <Link to="/admin/vehicles/add">
          <Button variant="primary" icon={Plus}>
            Add New Vehicle
          </Button>
        </Link>
      </div>

      <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', maxWidth: '400px' }}>
        <Search size={18} color="var(--text-muted)" style={{ marginRight: '0.5rem' }} />
        <input 
          type="text"
          className="form-control"
          style={{ border: 'none', padding: 0 }}
          placeholder="Filter vehicles by name or brand..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <VehicleTable vehicles={filtered} onDelete={(id) => setDeleteId(id)} />

      <ConfirmDialog 
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Vehicle"
        message="Are you sure you want to permanently delete this vehicle from the inventory? This action cannot be undone."
        confirmText="Delete Vehicle"
        isDanger={true}
      />
    </div>
  );
};
