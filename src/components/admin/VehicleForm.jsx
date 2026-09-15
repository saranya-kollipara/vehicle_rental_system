import React, { useState, useEffect } from 'react';
import { Button } from '../common/Button';

export const VehicleForm = ({ initialData, onSubmit, onCancel, buttonText = 'Save Vehicle' }) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    category: 'SUV',
    regNumber: '',
    year: 2024,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seats: 5,
    pricePerDay: 2000,
    description: '',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    available: true
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      year: Number(formData.year),
      seats: Number(formData.seats),
      pricePerDay: Number(formData.pricePerDay)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem' }}>
      <div className="grid-2">
        <div className="form-group">
          <label>Vehicle Name</label>
          <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required placeholder="e.g. Toyota Innova Crysta" />
        </div>

        <div className="form-group">
          <label>Brand / Manufacturer</label>
          <input type="text" name="brand" className="form-control" value={formData.brand} onChange={handleChange} required placeholder="e.g. Toyota" />
        </div>
      </div>

      <div className="grid-3">
        <div className="form-group">
          <label>Model Trim</label>
          <input type="text" name="model" className="form-control" value={formData.model} onChange={handleChange} placeholder="e.g. VX Automatic" />
        </div>

        <div className="form-group">
          <label>Registration Number</label>
          <input type="text" name="regNumber" className="form-control" value={formData.regNumber} onChange={handleChange} placeholder="e.g. TS-09-EV-8842" />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select name="category" className="form-control" value={formData.category} onChange={handleChange}>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Luxury">Luxury</option>
            <option value="Electric">Electric</option>
            <option value="Bike">Bike</option>
          </select>
        </div>
      </div>

      <div className="grid-4">
        <div className="form-group">
          <label>Manufacturing Year</label>
          <input type="number" name="year" className="form-control" value={formData.year} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Fuel Type</label>
          <select name="fuelType" className="form-control" value={formData.fuelType} onChange={handleChange}>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        <div className="form-group">
          <label>Transmission</label>
          <select name="transmission" className="form-control" value={formData.transmission} onChange={handleChange}>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        <div className="form-group">
          <label>Seats</label>
          <input type="number" name="seats" className="form-control" value={formData.seats} onChange={handleChange} required />
        </div>
      </div>

      <div className="grid-2">
        <div className="form-group">
          <label>Price Per Day (₹ INR)</label>
          <input type="number" name="pricePerDay" className="form-control" value={formData.pricePerDay} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input type="text" name="image" className="form-control" value={formData.image} onChange={handleChange} required />
        </div>
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea name="description" className="form-control" rows="3" value={formData.description} onChange={handleChange} placeholder="Vehicle details & features..."></textarea>
      </div>

      <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
        <input type="checkbox" id="available" name="available" checked={formData.available} onChange={handleChange} style={{ width: '18px', height: '18px' }} />
        <label htmlFor="available" style={{ margin: 0, cursor: 'pointer' }}>Available for Rent</label>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
        <Button type="submit" variant="primary">{buttonText}</Button>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
};
