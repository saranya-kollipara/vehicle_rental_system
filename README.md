# 🚗 DriveEase — Vehicle Rental Management System

A full-stack vehicle rental management web application built with **React.js**, **Node.js**, **Express.js**, and **MySQL**.

---

## 🌟 System Overview

**DriveEase** provides a modern, seamless vehicle rental platform for customers and administrators.

- **Customer Features:** Browse fleet, search & filter by category/price/fuel/transmission/seats, check dynamic date-based vehicle availability, book vehicles with automatic 18% GST tax calculation, view rental receipts, manage bookings, update profile, and post reviews.
- **Admin Features:** High-level business KPI dashboard, real-time revenue analytics, fleet management (add/edit/delete vehicles with registration uniqueness), booking status management, user account controls (activate/deactivate), feedback moderation, and payment status updates.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, React Router DOM v6, Axios, Context API, Lucide React Icons, Vanilla CSS3 |
| **Backend** | Node.js, Express.js (Modular Router / Controller / Model architecture) |
| **Database** | MySQL 8.0, `mysql2/promise` with Connection Pooling & Parameterized SQL |
| **Authentication & Security** | JSON Web Tokens (JWT), `bcryptjs` password hashing, CORS protection |

---

## 📂 Project Architecture

```text
RentalSystem/
│
├── src/                          # React Frontend Source
│   ├── components/               # Reusable UI components
│   │   ├── admin/                # Admin tables, cards, sidebar, header
│   │   ├── booking/              # Booking forms, cards, summaries
│   │   ├── common/               # Buttons, modals, loaders
│   │   ├── home/                 # Hero, categories, features, testimonials
│   │   ├── layout/               # Navbar, Footer, AdminLayout
│   │   ├── user/                 # Booking history, profile cards
│   │   └── vehicles/             # Vehicle grid, filters, cards
│   │
│   ├── context/                  # React Context State Providers
│   │   ├── AuthContext.jsx       # Auth state & JWT session management
│   │   ├── VehicleContext.jsx    # Vehicle fleet state & search filters
│   │   └── BookingContext.jsx    # Reservation state & creation
│   │
│   ├── services/                 # Axios REST API Clients
│   │   ├── api.js                # Base Axios instance & Bearer interceptors
│   │   ├── authService.js        # Auth login, register, profile calls
│   │   ├── vehicleService.js     # Vehicle CRUD calls
│   │   ├── bookingService.js     # Booking creation & cancellation calls
│   │   ├── userService.js        # User management API calls
│   │   ├── feedbackService.js     # Customer reviews API calls
│   │   ├── paymentService.js     # Payment tracking API calls
│   │   └── adminService.js       # Dashboard KPIs & report calls
│   │
│   ├── pages/                    # Route pages (Public, Auth, User, Admin)
│   ├── styles/                   # Modular CSS stylesheets
│   ├── App.jsx                   # Main Router component
│   └── main.jsx                  # Vite React entry point
│
├── backend/                      # Node.js / Express Backend
│   ├── config/
│   │   ├── db.js                 # MySQL promise pool & query helper
│   │   ├── initDb.js             # Automated database setup script
│   │   └── schema.sql            # Full DDL schema & sample seed data
│   │
│   ├── controllers/              # Business logic & request handling
│   │   ├── authController.js
│   │   ├── vehicleController.js
│   │   ├── bookingController.js
│   │   ├── userController.js
│   │   ├── adminController.js
│   │   ├── feedbackController.js
│   │   └── paymentController.js
│   │
│   ├── models/                   # SQL query models (Parameterized)
│   │   ├── userModel.js
│   │   ├── vehicleModel.js
│   │   ├── bookingModel.js
│   │   ├── feedbackModel.js
│   │   └── paymentModel.js
│   │
│   ├── middleware/               # Security & Error middlewares
│   │   ├── authMiddleware.js     # JWT verification & admin check
│   │   └── errorMiddleware.js    # 404 & global JSON error handler
│   │
│   ├── routes/                   # Express routes
│   │   ├── authRoutes.js
│   │   ├── vehicleRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── userRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── feedbackRoutes.js
│   │   └── paymentRoutes.js
│   │
│   ├── .env                      # Backend environment variables
│   ├── .gitignore                # Environment & node_modules exclusion
│   ├── package.json              # Backend dependencies
│   └── server.js                 # Express server application
│
├── .env                          # Frontend environment variables
├── package.json                  # Frontend dependencies
├── vite.config.js                # Vite build configuration
└── README.md                     # Comprehensive project documentation
```

---

## ⚡ Setup & Installation Guide

### Prerequisites
- Node.js (v18.x or higher)
- MySQL Server (v8.0 or higher) running locally on port 3306

---

### Step 1: Database Setup
1. Ensure MySQL is running locally.
2. Configure database credentials in [`backend/.env`](file:///c:/Users/saran/RentalSystem/backend/.env):
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=YOUR_MYSQL_PASSWORD
   DB_NAME=vehicle_rental
   JWT_SECRET=driveease_jwt_secret_key_2026_super_secure
   ```
3. Run the automated database initializer script:
   ```bash
   cd backend
   npm run init-db
   ```

---

### Step 2: Backend Setup & Execution
1. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Start the Express server in development mode:
   ```bash
   npm run dev
   ```
   *The backend will run on `http://localhost:5000`.*

---

### Step 3: Frontend Setup & Execution
1. Open a new terminal in the project root (`RentalSystem/`).
2. Verify environment configuration in [`.env`](file:///c:/Users/saran/RentalSystem/.env):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
3. Install dependencies & start Vite development server:
   ```bash
   npm install
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173`.*

---

## 🔑 Demo Account Credentials

| Role | Email | Password | Access Privileges |
| :--- | :--- | :--- | :--- |
| **Customer** | `user@demo.com` | `password123` | Vehicle browsing, reservation creation, user dashboard, booking history, feedback submission |
| **Admin** | `admin@demo.com` | `password123` | Full admin portal access, vehicle CRUD, reservation status management, user controls, financial reports |

---

## 📡 API Endpoints Reference

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Register a new customer account
- `POST /api/auth/login` — Authenticate customer or admin & receive JWT
- `GET /api/auth/me` — Retrieve current authenticated user profile

### Vehicles (`/api/vehicles`)
- `GET /api/vehicles` — Get fleet list (Supports `search`, `category`, `maxPrice`, `fuelType`, `transmission`, `seats`, `pickupDate`, `returnDate`, `sortBy`)
- `GET /api/vehicles/:id` — Get single vehicle details
- `POST /api/vehicles` — Admin: Add a new vehicle
- `PUT /api/vehicles/:id` — Admin: Edit vehicle details
- `DELETE /api/vehicles/:id` — Admin: Remove a vehicle from fleet

### Bookings (`/api/bookings`)
- `POST /api/bookings` — Create a reservation (Calculates days, 18% GST tax, server total price, checks date overlaps)
- `GET /api/bookings/my` — Get logged-in user's reservation history
- `GET /api/bookings/:id` — Get single booking receipt details
- `PUT /api/bookings/:id/cancel` — Cancel customer reservation
- `GET /api/bookings/admin/all` — Admin: View all system reservations
- `PUT /api/bookings/admin/:id/status` — Admin: Update booking status (`Pending`, `Confirmed`, `Completed`, `Cancelled`)

### User Management (`/api/users`)
- `GET /api/users/profile` — Get profile info
- `PUT /api/users/profile` — Update customer name and phone
- `GET /api/users/admin/all` — Admin: View all registered customer accounts
- `PUT /api/users/admin/:id/status` — Admin: Activate/deactivate user accounts

### Admin Dashboard & Reports (`/api/admin`)
- `GET /api/admin/dashboard` — Real-time business KPI metrics (total vehicles, available, rented, total revenue, booking status counters)
- `GET /api/admin/reports/revenue` — Monthly revenue growth & vehicle category earnings
- `GET /api/admin/reports/bookings` — Booking trends and status distributions

---

## 🚀 Deployment Preparation Checklist

1. **Environment Variables**: Use strong production secrets for `JWT_SECRET` and secure database credentials.
2. **CORS Policy**: Restrict CORS origins in `server.js` to your deployed frontend domain.
3. **Production Build**: Generate optimized frontend static bundle via:
   ```bash
   npm run build
   ```
4. **Database Connection Pool**: Production connection limits configured in `backend/config/db.js`.

---

## 📄 License
This project is open-source and available under the **ISC License**.
