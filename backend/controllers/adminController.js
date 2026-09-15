import { query } from '../config/db.js';

// GET /api/admin/dashboard - Get real-time dashboard aggregated statistics
export const getDashboardStats = async (req, res) => {
  try {
    const [{ totalVehicles }] = await query('SELECT COUNT(*) AS totalVehicles FROM vehicles');

    // Count vehicles that have active reservations (Confirmed or Pending)
    const [{ rentedVehicles }] = await query(`
      SELECT COUNT(DISTINCT vehicle_id) AS rentedVehicles 
      FROM bookings 
      WHERE booking_status IN ('Confirmed', 'Pending')
    `);

    // Count available vehicles (in fleet and not currently assigned to active reservations)
    const [{ availableVehicles }] = await query(`
      SELECT COUNT(*) AS availableVehicles 
      FROM vehicles 
      WHERE available = 1 
        AND id NOT IN (
          SELECT vehicle_id FROM bookings 
          WHERE booking_status IN ('Confirmed', 'Pending')
        )
    `);

    const [{ totalUsers }] = await query("SELECT COUNT(*) AS totalUsers FROM users WHERE role = 'user'");
    const [{ totalBookings }] = await query('SELECT COUNT(*) AS totalBookings FROM bookings');
    const [{ pendingBookings }] = await query("SELECT COUNT(*) AS pendingBookings FROM bookings WHERE booking_status = 'Pending'");
    const [{ confirmedBookings }] = await query("SELECT COUNT(*) AS confirmedBookings FROM bookings WHERE booking_status = 'Confirmed'");
    const [{ completedBookings }] = await query("SELECT COUNT(*) AS completedBookings FROM bookings WHERE booking_status = 'Completed'");
    const [{ cancelledBookings }] = await query("SELECT COUNT(*) AS cancelledBookings FROM bookings WHERE booking_status = 'Cancelled'");

    const [{ totalRevenue }] = await query("SELECT COALESCE(SUM(total_amount), 0) AS totalRevenue FROM bookings WHERE payment_status = 'Paid'");

    return res.status(200).json({
      success: true,
      data: {
        totalVehicles: parseInt(totalVehicles, 10),
        availableVehicles: parseInt(availableVehicles, 10),
        rentedVehicles: parseInt(rentedVehicles, 10),
        totalUsers: parseInt(totalUsers, 10),
        totalBookings: parseInt(totalBookings, 10),
        pendingBookings: parseInt(pendingBookings, 10),
        confirmedBookings: parseInt(confirmedBookings, 10),
        completedBookings: parseInt(completedBookings, 10),
        cancelledBookings: parseInt(cancelledBookings, 10),
        totalRevenue: parseFloat(totalRevenue)
      }
    });
  } catch (error) {
    console.error('Error fetching admin dashboard stats:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard statistics',
      error: error.message
    });
  }
};

// GET /api/admin/reports/bookings - Booking breakdown reports for charts
export const getBookingReports = async (req, res) => {
  try {
    const statusBreakdown = await query(`
      SELECT booking_status AS status, COUNT(*) AS count 
      FROM bookings 
      GROUP BY booking_status
    `);

    const monthlyBookings = await query(`
      SELECT 
        DATE_FORMAT(created_at, '%b %Y') AS month,
        COUNT(*) AS total_bookings,
        SUM(total_amount) AS revenue
      FROM bookings
      GROUP BY DATE_FORMAT(created_at, '%Y-%m'), DATE_FORMAT(created_at, '%b %Y')
      ORDER BY DATE_FORMAT(created_at, '%Y-%m') ASC
    `);

    return res.status(200).json({
      success: true,
      data: {
        statusBreakdown,
        monthlyBookings
      }
    });
  } catch (error) {
    console.error('Error fetching booking reports:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching booking reports',
      error: error.message
    });
  }
};

// GET /api/admin/reports/revenue - Revenue breakdown reports
export const getRevenueReports = async (req, res) => {
  try {
    const monthlyRevenue = await query(`
      SELECT 
        DATE_FORMAT(created_at, '%b %Y') AS month,
        SUM(rental_amount) AS rental_income,
        SUM(tax_amount) AS tax_collected,
        SUM(total_amount) AS total_revenue
      FROM bookings
      WHERE payment_status = 'Paid'
      GROUP BY DATE_FORMAT(created_at, '%Y-%m'), DATE_FORMAT(created_at, '%b %Y')
      ORDER BY DATE_FORMAT(created_at, '%Y-%m') ASC
    `);

    const categoryRevenue = await query(`
      SELECT 
        v.category,
        COUNT(b.id) AS total_bookings,
        SUM(b.total_amount) AS category_revenue
      FROM bookings b
      JOIN vehicles v ON b.vehicle_id = v.id
      WHERE b.payment_status = 'Paid'
      GROUP BY v.category
    `);

    return res.status(200).json({
      success: true,
      data: {
        monthlyRevenue,
        categoryRevenue
      }
    });
  } catch (error) {
    console.error('Error fetching revenue reports:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching revenue reports',
      error: error.message
    });
  }
};

// GET /api/admin/reports/vehicles - Vehicle category distribution & fleet utilization
export const getVehicleReports = async (req, res) => {
  try {
    const categoryDistribution = await query(`
      SELECT category, COUNT(*) AS count 
      FROM vehicles 
      GROUP BY category
    `);

    const availabilityStatus = await query(`
      SELECT 
        CASE WHEN available = 1 THEN 'Available' ELSE 'Rented' END AS status,
        COUNT(*) AS count
      FROM vehicles
      GROUP BY available
    `);

    return res.status(200).json({
      success: true,
      data: {
        categoryDistribution,
        availabilityStatus
      }
    });
  } catch (error) {
    console.error('Error fetching vehicle reports:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching vehicle reports',
      error: error.message
    });
  }
};

export default {
  getDashboardStats,
  getBookingReports,
  getRevenueReports,
  getVehicleReports
};
