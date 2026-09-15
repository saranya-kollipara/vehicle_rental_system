import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVehicles } from '../../hooks/useVehicles';
import { Button } from '../common/Button';
import { Search, MapPin, Calendar, Car } from 'lucide-react';

export const SearchBox = () => {
  const navigate = useNavigate();
  const { setSelectedCategory, setSearchQuery } = useVehicles();

  const [location, setLocation] = useState('Hyderabad');
  const [vehicleType, setVehicleType] = useState('all');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSelectedCategory(vehicleType);
    if (location && location !== 'Hyderabad') {
      setSearchQuery(location);
    }
    navigate('/vehicles');
  };

  return (
    <div className="search-box-wrapper container">
      <form className="search-box-card" onSubmit={handleSearch}>
        <div className="search-grid">
          {/* Pickup Location */}
          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <MapPin size={16} color="var(--primary)" /> Where do you want to pick up?
            </label>
            <select 
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="Hyderabad">Hyderabad Airport (RGIA)</option>
              <option value="Hitec City">Hitec City / Madhapur</option>
              <option value="Banjara Hills">Banjara Hills</option>
              <option value="Gachibowli">Gachibowli Financial Dist.</option>
              <option value="Secunderabad">Secunderabad Railway Station</option>
            </select>
          </div>

          {/* Vehicle Type */}
          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Car size={16} color="var(--primary)" /> Vehicle Type
            </label>
            <select 
              className="form-control"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="all">All Vehicles</option>
              <option value="SUV">SUVs & MUVs</option>
              <option value="Sedan">Sedans</option>
              <option value="Hatchback">Hatchbacks</option>
              <option value="Electric">Electric (EVs)</option>
              <option value="Luxury">Luxury Cars</option>
              <option value="Bike">Motorbikes</option>
            </select>
          </div>

          {/* Pickup Date */}
          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={16} color="var(--primary)" /> Pickup Date
            </label>
            <input 
              type="date"
              className="form-control"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
          </div>

          {/* Return Date */}
          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Calendar size={16} color="var(--primary)" /> Return Date
            </label>
            <input 
              type="date"
              className="form-control"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>

          {/* Submit Search */}
          <div>
            <Button type="submit" variant="primary" size="lg" icon={Search} fullWidth>
              Search Vehicles
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
