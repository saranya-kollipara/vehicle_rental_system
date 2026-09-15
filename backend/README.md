# DriveEase Backend API

Node.js, Express.js, and MySQL backend for the DriveEase Vehicle Rental Management System.

## Architecture
- **Config**: MySQL pool and auto-initializer (`config/db.js`, `config/initDb.js`, `config/schema.sql`)
- **Controllers**: Handlers for auth, vehicles, bookings, users, admin, feedback, payments
- **Models**: Parameterized SQL query models
- **Middleware**: JWT authentication, admin authorization, centralized error handling

## Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Run Database Setup (Creates database & seeds demo data)
npm run init-db

# 3. Start Development Server
npm run dev
```

Server runs on `http://localhost:5000`.
Test API endpoint: `http://localhost:5000/api/test`
