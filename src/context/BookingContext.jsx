import React, { createContext, useState, useEffect, useCallback } from 'react';
import bookingService from '../services/bookingService';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserBookings = useCallback(async () => {
    const token = localStorage.getItem('driveease_token');
    if (!token) {
      setBookings([]);
      return;
    }
    setLoading(true);
    try {
      const savedUserStr = localStorage.getItem('driveease_user');
      const user = savedUserStr ? JSON.parse(savedUserStr) : null;
      
      let res;
      if (user?.role === 'admin') {
        res = await bookingService.getAllBookingsAdmin();
      } else {
        res = await bookingService.getMyBookings();
      }

      if (res.success && res.data) {
        setBookings(res.data);
      }
      setError(null);
    } catch (err) {
      console.error('Failed to fetch bookings from backend:', err);
      setError('Unable to load bookings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserBookings();
    const interval = setInterval(() => {
      fetchUserBookings();
    }, 4000);
    return () => clearInterval(interval);
  }, [fetchUserBookings]);

  const getUserBookings = useCallback((userId, email) => {
    if (!bookings || !Array.isArray(bookings)) return [];
    return bookings;
  }, [bookings]);

  const createBooking = async (bookingPayload) => {
    try {
      const res = await bookingService.createBooking(bookingPayload);
      if (res.success && res.data) {
        await fetchUserBookings();
        return { success: true, booking: res.data };
      }
      return { success: false, message: res.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Server error creating booking'
      };
    }
  };

  const updateBookingStatus = async (id, status) => {
    try {
      const res = await bookingService.updateBookingStatusAdmin(id, { booking_status: status });
      if (res.success) {
        await fetchUserBookings();
        return { success: true };
      }
      return { success: false, message: res.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Error updating booking status'
      };
    }
  };

  const payBooking = async (id, paymentData = {}) => {
    try {
      const res = await bookingService.payBooking(id, paymentData);
      if (res.success && res.data) {
        await fetchUserBookings();
        return { success: true, booking: res.data };
      }
      return { success: false, message: res.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Error processing payment'
      };
    }
  };

  const cancelBooking = async (id) => {
    try {
      const res = await bookingService.cancelBooking(id);
      if (res.success) {
        await fetchUserBookings();
        return { success: true };
      }
      return { success: false, message: res.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Error cancelling booking'
      };
    }
  };

  const getBookingById = (id) => {
    return bookings.find(b => b.id === id) || null;
  };

  return (
    <BookingContext.Provider value={{
      bookings,
      loading,
      error,
      fetchUserBookings,
      getUserBookings,
      createBooking,
      payBooking,
      updateBookingStatus,
      cancelBooking,
      getBookingById
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
