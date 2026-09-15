import express from 'express';
import {
  getVehicles,
  getVehicleById,
  addVehicle,
  updateVehicle,
  deleteVehicle
} from '../controllers/vehicleController.js';

const router = express.Router();

// GET /api/vehicles - Get all vehicles (with query filters)
router.get('/', getVehicles);

// GET /api/vehicles/:id - Get single vehicle details
router.get('/:id', getVehicleById);

// POST /api/vehicles - Create new vehicle
router.post('/', addVehicle);

// PUT /api/vehicles/:id - Update existing vehicle
router.put('/:id', updateVehicle);

// DELETE /api/vehicles/:id - Delete vehicle
router.delete('/:id', deleteVehicle);

export default router;
