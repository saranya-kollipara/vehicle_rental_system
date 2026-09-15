import vehicleModel from '../models/vehicleModel.js';

// GET /api/vehicles - Get all vehicles with filtering, searching, sorting, date availability
export const getVehicles = async (req, res) => {
  try {
    const {
      search,
      category,
      maxPrice,
      fuelType,
      transmission,
      seats,
      available,
      pickupDate,
      returnDate,
      sortBy
    } = req.query;

    const vehicles = await vehicleModel.getAll({
      search,
      category,
      maxPrice,
      fuelType,
      transmission,
      seats,
      available,
      pickupDate,
      returnDate,
      sortBy
    });

    return res.status(200).json({
      success: true,
      message: 'Vehicles retrieved successfully',
      count: vehicles.length,
      data: vehicles
    });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching vehicles',
      error: error.message
    });
  }
};

// GET /api/vehicles/:id - Get vehicle details by ID with availability check
export const getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;
    const { pickupDate, returnDate } = req.query;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid vehicle ID parameter'
      });
    }

    const vehicle = await vehicleModel.getById(id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: `Vehicle with ID ${id} not found`
      });
    }

    let dateAvailable = vehicle.available;
    if (pickupDate && returnDate) {
      dateAvailable = await vehicleModel.checkVehicleDateAvailability(id, pickupDate, returnDate);
    }

    return res.status(200).json({
      success: true,
      message: 'Vehicle details retrieved successfully',
      data: {
        ...vehicle,
        dateAvailable
      }
    });
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching vehicle details',
      error: error.message
    });
  }
};

// POST /api/vehicles - Create new vehicle (Admin)
export const addVehicle = async (req, res) => {
  try {
    const {
      name,
      brand,
      model,
      category,
      registration_number,
      year,
      price_per_day,
      fuel_type,
      transmission,
      seats,
      mileage,
      description,
      image,
      available
    } = req.body;

    // Input Validations
    if (!name || !brand || !model || !category || !registration_number || !year || !price_per_day || !fuel_type || !transmission || !seats || !image) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, brand, model, category, registration_number, year, price_per_day, fuel_type, transmission, seats, image'
      });
    }

    if (isNaN(year) || Number(year) < 1900 || Number(year) > 2030) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid manufacturing year'
      });
    }

    if (isNaN(price_per_day) || Number(price_per_day) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Price per day must be a positive number'
      });
    }

    // Check duplicate registration number
    const existing = await vehicleModel.getByRegistration(registration_number);
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `Vehicle with registration number '${registration_number}' already exists`
      });
    }

    const newVehicle = await vehicleModel.create({
      name,
      brand,
      model,
      category,
      registration_number,
      year: Number(year),
      price_per_day: Number(price_per_day),
      fuel_type,
      transmission,
      seats: Number(seats),
      mileage: mileage || '15 kmpl',
      description: description || '',
      image,
      available: available !== undefined ? available : true
    });

    return res.status(201).json({
      success: true,
      message: 'Vehicle added successfully',
      data: newVehicle
    });
  } catch (error) {
    console.error('Error adding vehicle:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while adding vehicle',
      error: error.message
    });
  }
};

// PUT /api/vehicles/:id - Update vehicle (Admin)
export const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid vehicle ID parameter'
      });
    }

    const existingVehicle = await vehicleModel.getById(id);
    if (!existingVehicle) {
      return res.status(404).json({
        success: false,
        message: `Vehicle with ID ${id} not found`
      });
    }

    if (req.body.registration_number && req.body.registration_number !== existingVehicle.registration_number) {
      const duplicate = await vehicleModel.getByRegistration(req.body.registration_number);
      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: `Another vehicle with registration number '${req.body.registration_number}' already exists`
        });
      }
    }

    const mergedData = {
      name: req.body.name || existingVehicle.name,
      brand: req.body.brand || existingVehicle.brand,
      model: req.body.model || existingVehicle.model,
      category: req.body.category || existingVehicle.category,
      registration_number: req.body.registration_number || existingVehicle.registration_number,
      year: req.body.year ? Number(req.body.year) : existingVehicle.year,
      price_per_day: req.body.price_per_day ? Number(req.body.price_per_day) : existingVehicle.price_per_day,
      fuel_type: req.body.fuel_type || existingVehicle.fuel_type,
      transmission: req.body.transmission || existingVehicle.transmission,
      seats: req.body.seats ? Number(req.body.seats) : existingVehicle.seats,
      mileage: req.body.mileage || existingVehicle.mileage,
      description: req.body.description !== undefined ? req.body.description : existingVehicle.description,
      image: req.body.image || existingVehicle.image,
      available: req.body.available !== undefined ? req.body.available : existingVehicle.available
    };

    const updatedVehicle = await vehicleModel.update(id, mergedData);

    return res.status(200).json({
      success: true,
      message: 'Vehicle updated successfully',
      data: updatedVehicle
    });
  } catch (error) {
    console.error('Error updating vehicle:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while updating vehicle',
      error: error.message
    });
  }
};

// DELETE /api/vehicles/:id - Delete vehicle (Admin)
export const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid vehicle ID parameter'
      });
    }

    const existingVehicle = await vehicleModel.getById(id);
    if (!existingVehicle) {
      return res.status(404).json({
        success: false,
        message: `Vehicle with ID ${id} not found`
      });
    }

    await vehicleModel.remove(id);

    return res.status(200).json({
      success: true,
      message: `Vehicle with ID ${id} deleted successfully`
    });
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while deleting vehicle',
      error: error.message
    });
  }
};

export default {
  getVehicles,
  getVehicleById,
  addVehicle,
  updateVehicle,
  deleteVehicle
};
