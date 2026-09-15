import userModel from '../models/userModel.js';
import bookingModel from '../models/bookingModel.js';

// GET /api/users/profile - Get logged-in user's profile
export const getProfile = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching profile',
      error: error.message
    });
  }
};

// PUT /api/users/profile - Update user profile (Name & Phone only)
export const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both name and phone to update profile'
      });
    }

    // Role and status CANNOT be altered through normal profile update
    const updatedUser = await userModel.updateProfile(req.user.id, { name, phone });

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while updating profile',
      error: error.message
    });
  }
};

// GET /api/users/bookings - Get user's own booking history
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.getByUserId(req.user.id);
    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching user bookings',
      error: error.message
    });
  }
};

// GET /api/users/admin/all - Admin: View all users
export const getAllUsersAdmin = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Error fetching all users:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching all users',
      error: error.message
    });
  }
};

// GET /api/users/admin/:id - Admin: View single user details & booking history
export const getUserDetailsAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.getUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${id} not found`
      });
    }

    const bookings = await bookingModel.getByUserId(id);

    return res.status(200).json({
      success: true,
      data: {
        ...user,
        bookings
      }
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching user details',
      error: error.message
    });
  }
};

// PUT /api/users/admin/:id/status - Admin: Activate / Deactivate user
export const updateUserStatusAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['active', 'inactive'].includes(status.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value. Must be 'active' or 'inactive'"
      });
    }

    const user = await userModel.getUserById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${id} not found`
      });
    }

    const updatedUser = await userModel.updateStatus(id, status.toLowerCase());

    return res.status(200).json({
      success: true,
      message: `User status successfully updated to '${status.toLowerCase()}'`,
      data: updatedUser
    });
  } catch (error) {
    console.error('Error updating user status:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while updating user status',
      error: error.message
    });
  }
};

export default {
  getProfile,
  updateProfile,
  getUserBookings,
  getAllUsersAdmin,
  getUserDetailsAdmin,
  updateUserStatusAdmin
};
