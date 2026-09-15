import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { VehicleProvider } from './context/VehicleContext';
import { BookingProvider } from './context/BookingContext';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AdminLayout } from './components/layout/AdminLayout';
import { ProtectedRoute, AdminRoute } from './components/common/ProtectedRoute';

import { Home } from './pages/public/Home';
import { Vehicles } from './pages/public/Vehicles';
import { VehicleDetails } from './pages/public/VehicleDetails';
import { About } from './pages/public/About';
import { Contact } from './pages/public/Contact';
import { NotFound } from './pages/public/NotFound';

import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';

import { UserDashboard } from './pages/user/UserDashboard';
import { MyBookings } from './pages/user/MyBookings';
import { BookingDetails } from './pages/user/BookingDetails';
import { Profile } from './pages/user/Profile';
import { Feedback } from './pages/user/Feedback';

import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageVehicles } from './pages/admin/ManageVehicles';
import { AddVehicle } from './pages/admin/AddVehicle';
import { EditVehicle } from './pages/admin/EditVehicle';
import { ManageBookings } from './pages/admin/ManageBookings';
import { ManageUsers } from './pages/admin/ManageUsers';
import { Payments } from './pages/admin/Payments';
import { ManageFeedback } from './pages/admin/ManageFeedback';
import { Reports } from './pages/admin/Reports';

export const App = () => {
  return (
    <AuthProvider>
      <VehicleProvider>
        <BookingProvider>
          <BrowserRouter>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Routes>
                {/* STRICT ADMIN ROUTES: Accessible ONLY by logged-in users with role === 'admin' */}
                <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="vehicles" element={<ManageVehicles />} />
                  <Route path="vehicles/add" element={<AddVehicle />} />
                  <Route path="vehicles/edit/:id" element={<EditVehicle />} />
                  <Route path="bookings" element={<ManageBookings />} />
                  <Route path="users" element={<ManageUsers />} />
                  <Route path="payments" element={<Payments />} />
                  <Route path="feedback" element={<ManageFeedback />} />
                  <Route path="reports" element={<Reports />} />
                </Route>

                {/* Public & User Routes with Main Navbar and Footer */}
                <Route
                  path="*"
                  element={
                    <>
                      <Navbar />
                      <main style={{ flex: 1 }}>
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/vehicles" element={<Vehicles />} />
                          <Route path="/vehicles/:id" element={<VehicleDetails />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/contact" element={<Contact />} />
                          
                          <Route path="/login" element={<Login />} />
                          <Route path="/register" element={<Register />} />
                          <Route path="/forgot-password" element={<ForgotPassword />} />

                          {/* Protected Customer Routes */}
                          <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
                          <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
                          <Route path="/bookings/:id" element={<ProtectedRoute><BookingDetails /></ProtectedRoute>} />
                          <Route path="/booking/:id" element={<ProtectedRoute><BookingDetails /></ProtectedRoute>} />
                          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                          <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />

                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </main>
                      <Footer />
                    </>
                  }
                />
              </Routes>
            </div>
          </BrowserRouter>
        </BookingProvider>
      </VehicleProvider>
    </AuthProvider>
  );
};

export default App;
