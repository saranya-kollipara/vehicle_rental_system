-- DriveEase Vehicle Rental Management System Database Schema
-- Database Creation
CREATE DATABASE IF NOT EXISTS vehicle_rental;
USE vehicle_rental;

-- Clean existing tables for fresh setup
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS feedback;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS vehicles;
DROP TABLE IF EXISTS users;

-- 1. USERS TABLE
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_users_email (email),
  INDEX idx_users_role (role)
);

-- 2. VEHICLES TABLE
CREATE TABLE vehicles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  brand VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  category VARCHAR(50) NOT NULL,
  registration_number VARCHAR(20) NOT NULL UNIQUE,
  year INT NOT NULL,
  price_per_day DECIMAL(10, 2) NOT NULL,
  fuel_type VARCHAR(30) NOT NULL,
  transmission VARCHAR(30) NOT NULL,
  seats INT NOT NULL,
  mileage VARCHAR(30) DEFAULT '15 kmpl',
  description TEXT,
  image VARCHAR(500) NOT NULL,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_vehicles_category (category),
  INDEX idx_vehicles_available (available),
  INDEX idx_vehicles_price (price_per_day)
);

-- 3. BOOKINGS TABLE
CREATE TABLE bookings (
  id VARCHAR(30) PRIMARY KEY,
  user_id INT NOT NULL,
  vehicle_id INT NOT NULL,
  pickup_location VARCHAR(150) NOT NULL,
  dropoff_location VARCHAR(150) NOT NULL,
  pickup_date DATE NOT NULL,
  return_date DATE NOT NULL,
  total_days INT NOT NULL,
  rental_amount DECIMAL(10, 2) NOT NULL,
  tax_amount DECIMAL(10, 2) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  booking_status ENUM('Pending', 'Confirmed', 'Completed', 'Cancelled') DEFAULT 'Confirmed',
  payment_status ENUM('Pending', 'Paid', 'Failed', 'Refunded') DEFAULT 'Paid',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
  INDEX idx_bookings_user_id (user_id),
  INDEX idx_bookings_vehicle_id (vehicle_id),
  INDEX idx_bookings_dates (pickup_date, return_date),
  INDEX idx_bookings_status (booking_status)
);

-- 4. FEEDBACK TABLE
CREATE TABLE feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  vehicle_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  status ENUM('Visible', 'Hidden') DEFAULT 'Visible',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
  INDEX idx_feedback_vehicle_id (vehicle_id),
  INDEX idx_feedback_user_id (user_id)
);

-- 5. PAYMENTS TABLE
CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id VARCHAR(30) NOT NULL,
  user_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  payment_status ENUM('Pending', 'Paid', 'Failed', 'Refunded') DEFAULT 'Paid',
  transaction_reference VARCHAR(100) NOT NULL,
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_payments_booking_id (booking_id),
  INDEX idx_payments_user_id (user_id)
);

-- SAMPLE DATA INSERTS
INSERT INTO users (id, name, email, phone, password, role, status) VALUES
(1, 'Demo Customer', 'user@demo.com', '+91 98765 43210', '$2a$10$wE99K3w1iQvQx6/aCj3yU.4u4hH2Yp5O5uYd4m1z3E8m0n2o4p6qW', 'user', 'active'),
(2, 'System Admin', 'admin@demo.com', '+91 98000 11122', '$2a$10$wE99K3w1iQvQx6/aCj3yU.4u4hH2Yp5O5uYd4m1z3E8m0n2o4p6qW', 'admin', 'active');

INSERT INTO vehicles (id, name, brand, model, category, registration_number, year, price_per_day, fuel_type, transmission, seats, mileage, description, image, available) VALUES
(1, 'Mahindra Thar 4x4', 'Mahindra', 'Thar LX', 'SUV', 'TS-09-THAR-404', 2023, 3500.00, 'Diesel', 'Manual', 4, '13 kmpl', 'Iconic off-road SUV built for adventure trips with hardtop roof.', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80', TRUE),
(2, 'Tata Nexon EV Max', 'Tata', 'Nexon EV', 'Electric', 'TS-07-EV-9999', 2024, 2800.00, 'Electric', 'Automatic', 5, '453 km/charge', 'Premium electric compact SUV with long range and zero emissions.', 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80', TRUE),
(3, 'Toyota Fortuner Legender', 'Toyota', 'Fortuner', 'Luxury', 'TS-09-LEGEND-07', 2023, 6500.00, 'Diesel', 'Automatic', 7, '12 kmpl', 'Ultimate flagship 7-seater SUV for high-end luxury business travel.', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80', TRUE),
(4, 'Hyundai Verna Turbo', 'Hyundai', 'Verna SX', 'Sedan', 'TS-08-VERNA-555', 2023, 2400.00, 'Petrol', 'Automatic', 5, '18 kmpl', 'Sleek futuristic sedan with ventilated seats and ADAS safety features.', 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80', TRUE),
(5, 'Maruti Swift ZXi+', 'Maruti Suzuki', 'Swift', 'Hatchback', 'TS-10-SWIFT-101', 2023, 1600.00, 'Petrol', 'Manual', 5, '22 kmpl', 'Fuel-efficient nimble city hatchback, easy to park and drive.', 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80', TRUE),
(6, 'Kia Carens Prestige', 'Kia', 'Carens Luxury', 'MUV', 'TS-07-CARENS-707', 2024, 3200.00, 'Diesel', 'Automatic', 7, '16 kmpl', 'Spacious 7-seater family MPV with captain seats and sunshades.', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80', TRUE),
(7, 'BMW 3 Series Gran Limousine', 'BMW', '330Li', 'Luxury', 'TS-09-BMW-3333', 2023, 8500.00, 'Petrol', 'Automatic', 5, '14 kmpl', 'Executive luxury sedan with panoramic sunroof and Harman Kardon sound.', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80', TRUE),
(8, 'Mahindra XUV700 AX7 L', 'Mahindra', 'XUV700', 'SUV', 'TS-08-XUV-7000', 2023, 4200.00, 'Diesel', 'Automatic', 7, '14 kmpl', 'Feature-packed premium SUV with AWD and dual 10.25-inch screens.', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80', TRUE),
(9, 'Honda City e:HEV Hybrid', 'Honda', 'City Hybrid', 'Sedan', 'TS-09-CITY-888', 2023, 2700.00, 'Hybrid', 'Automatic', 5, '26 kmpl', 'Ultra efficient self-charging hybrid sedan for comfortable highway cruises.', 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80', TRUE),
(10, 'Hyundai Creta SX Tech', 'Hyundai', 'Creta', 'SUV', 'TS-10-CRETA-202', 2024, 3000.00, 'Petrol', 'Automatic', 5, '17 kmpl', 'India\'s favorite compact SUV with panoramic sunroof and Bose speakers.', 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80', TRUE);

