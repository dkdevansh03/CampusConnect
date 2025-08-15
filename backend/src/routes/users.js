import express from 'express';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/roles.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Current user
router.get('/me', requireAuth, async (req, res) => {
  res.json({ user: req.user });
});

// Admin: create user
router.post('/', requireAuth, requireRole('admin'), async (req, res, next) => {
  try {
    const { name, email, password, role = 'student' } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });

    // return safe user object (no password)
    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    next(err);
  }
});

// Get a user public profile
router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) { next(err); }
});

// Get all users (for messaging - public list)
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const users = await User.find().select('-password -email').sort({ name: 1 });
    res.json({ users });
  } catch (err) { next(err); }
});

// Admin: list users with full details
router.get('/admin/list', requireAuth, requireRole('admin'), async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ users });
  } catch (err) { next(err); }
});

export default router;
