import express from 'express';
import Message from '../models/Message.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Send a message (simple REST; real-time can be added later with socket.io)
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { to, content } = req.body;
    if (!to || !content) return res.status(400).json({ message: 'Missing fields' });
    const msg = await Message.create({ from: req.user._id, to, content });
    res.status(201).json({ message: msg });
  } catch (err) { next(err); }
});

// Get conversation between current user and another user
router.get('/with/:userId', requireAuth, async (req, res, next) => {
  try {
    const other = req.params.userId;
    const messages = await Message.find({
      $or: [
        { from: req.user._id, to: other },
        { from: other, to: req.user._id }
      ]
    }).sort({ createdAt: 1 });
    res.json({ messages });
  } catch (err) { next(err); }
});

export default router;
