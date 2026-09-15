import feedbackModel from '../models/feedbackModel.js';
import vehicleModel from '../models/vehicleModel.js';

// POST /api/feedback - Submit feedback/review
export const createFeedback = async (req, res) => {
  try {
    const { vehicle_id, rating, comment } = req.body;
    const user_id = req.user.id;

    if (!vehicle_id || rating === undefined || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Please provide vehicle_id, rating (1-5), and comment'
      });
    }

    const numericRating = Number(rating);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be an integer between 1 and 5'
      });
    }

    const vehicle = await vehicleModel.getById(vehicle_id);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: `Vehicle with ID ${vehicle_id} not found`
      });
    }

    const newFeedback = await feedbackModel.create({
      user_id,
      vehicle_id,
      rating: numericRating,
      comment,
      status: 'Visible'
    });

    return res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      data: newFeedback
    });
  } catch (error) {
    console.error('Error creating feedback:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while submitting feedback',
      error: error.message
    });
  }
};

// GET /api/feedback - Get all public visible feedback
export const getAllFeedback = async (req, res) => {
  try {
    const feedbackList = await feedbackModel.getAll(true);
    return res.status(200).json({
      success: true,
      count: feedbackList.length,
      data: feedbackList
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching feedback',
      error: error.message
    });
  }
};

// GET /api/feedback/vehicle/:vehicleId - Get feedback for specific vehicle
export const getVehicleFeedback = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const feedbackList = await feedbackModel.getByVehicleId(vehicleId);
    return res.status(200).json({
      success: true,
      count: feedbackList.length,
      data: feedbackList
    });
  } catch (error) {
    console.error('Error fetching vehicle feedback:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching vehicle feedback',
      error: error.message
    });
  }
};

// DELETE /api/feedback/:id - Delete feedback (Owner or Admin)
export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await feedbackModel.getById(id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Feedback with ID ${id} not found`
      });
    }

    if (req.user.role !== 'admin' && existing.user_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: You cannot delete another user\'s feedback'
      });
    }

    await feedbackModel.remove(id);

    return res.status(200).json({
      success: true,
      message: 'Feedback deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while deleting feedback',
      error: error.message
    });
  }
};

// Admin APIs

// GET /api/admin/feedback - Admin get all feedback (Visible + Hidden)
export const getAllFeedbackAdmin = async (req, res) => {
  try {
    const feedbackList = await feedbackModel.getAll(false);
    return res.status(200).json({
      success: true,
      count: feedbackList.length,
      data: feedbackList
    });
  } catch (error) {
    console.error('Error fetching admin feedback:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching feedback list',
      error: error.message
    });
  }
};

// PUT /api/admin/feedback/:id/status - Admin update feedback status (Visible / Hidden)
export const updateFeedbackStatusAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['Visible', 'Hidden'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Allowed values: 'Visible', 'Hidden'"
      });
    }

    const existing = await feedbackModel.getById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: `Feedback with ID ${id} not found`
      });
    }

    const updated = await feedbackModel.updateStatus(id, status);

    return res.status(200).json({
      success: true,
      message: `Feedback status updated to '${status}'`,
      data: updated
    });
  } catch (error) {
    console.error('Error updating feedback status:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while updating feedback status',
      error: error.message
    });
  }
};

export default {
  createFeedback,
  getAllFeedback,
  getVehicleFeedback,
  deleteFeedback,
  getAllFeedbackAdmin,
  updateFeedbackStatusAdmin
};
