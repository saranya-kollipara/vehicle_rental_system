import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/auth/register - Register new user
router.post('/register', register);

// POST /api/auth/login - User / Admin login
router.post('/login', login);

// GET /api/auth/me - Get logged-in user profile (Protected)
router.get('/me', protect, getMe);

export default router;
