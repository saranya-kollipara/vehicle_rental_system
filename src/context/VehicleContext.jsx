import React, { createContext, useState, useEffect, useCallback } from 'react';
import vehicleService from '../services/vehicleService';

export const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(10000);
  const [selectedFuel, setSelectedFuel] = useState('all');
  const [selectedTransmission, setSelectedTransmission] = useState('all');
  const [selectedSeats, setSelectedSeats] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        search: searchQuery,
        category: selectedCategory,
        maxPrice: priceRange,
        fuelType: selectedFuel,
        transmission: selectedTransmission,
        seats: selectedSeats,
        sortBy
      };
      const res = await vehicleService.getVehicles(params);
      if (res.success && res.data) {
        setVehicles(res.data);
      }
      setError(null);
    } catch (err) {
      console.error('Failed to fetch vehicles from backend API:', err);
      setError('Unable to load vehicles from server');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory, priceRange, selectedFuel, selectedTransmission, selectedSeats, sortBy]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const addVehicle = async (newVehicleData) => {
    try {
      const res = await vehicleService.addVehicle(newVehicleData);
      if (res.success) {
        await fetchVehicles();
        return { success: true, vehicle: res.data };
      }
      return { success: false, message: res.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Error adding vehicle'
      };
    }
  };

  const editVehicle = async (id, updatedFields) => {
    try {
      const res = await vehicleService.updateVehicle(id, updatedFields);
      if (res.success) {
        await fetchVehicles();
        return { success: true, vehicle: res.data };
      }
      return { success: false, message: res.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Error updating vehicle'
      };
    }
  };

  const deleteVehicle = async (id) => {
    try {
      const res = await vehicleService.deleteVehicle(id);
      if (res.success) {
        await fetchVehicles();
        return { success: true };
      }
      return { success: false, message: res.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Error deleting vehicle'
      };
    }
  };

  const getVehicleById = useCallback((id) => {
    return vehicles.find(v => Number(v.id) === Number(id)) || null;
  }, [vehicles]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange(10000);
    setSelectedFuel('all');
    setSelectedTransmission('all');
    setSelectedSeats('all');
    setSortBy('popular');
  };

  return (
    <VehicleContext.Provider value={{
      vehicles,
      filteredVehicles: vehicles,
      loading,
      error,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      priceRange,
      setPriceRange,
      selectedFuel,
      setSelectedFuel,
      selectedTransmission,
      setSelectedTransmission,
      selectedSeats,
      setSelectedSeats,
      sortBy,
      setSortBy,
      resetFilters,
      fetchVehicles,
      addVehicle,
      editVehicle,
      deleteVehicle,
      getVehicleById
    }}>
      {children}
    </VehicleContext.Provider>
  );
};

export default VehicleContext;
