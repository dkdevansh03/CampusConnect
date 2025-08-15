import express from 'express';
import Event from '../models/Event.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Create event (teachers/admins can create; students can view)
router.post('/', requireAuth, async (req, res, next) => {
  try {
    if (!['teacher', 'admin'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Only teachers/admin can create events' });
    }
    const { title, description, date, location, attachments = [] } = req.body;
    const event = await Event.create({ title, description, date, location, attachments, createdBy: req.user._id });
    res.status(201).json({ event });
  } catch (err) { next(err); }
});

// List events with search and date filters
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const { q, from, to, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (q) filter.$text = { $search: q };
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) filter.date.$lte = new Date(to);
    }
    const skip = (Number(page) - 1) * Number(limit);
    const events = await Event.find(filter).populate('createdBy', 'name role')
      .sort({ date: 1 }).skip(skip).limit(Number(limit));
    const total = await Event.countDocuments(filter);
    res.json({ events, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) { next(err); }
});

router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'name role');
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ event });
  } catch (err) { next(err); }
});

router.patch('/:id', requireAuth, async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (String(event.createdBy) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const { title, description, date, location, attachments } = req.body;
    if (title !== undefined) event.title = title;
    if (description !== undefined) event.description = description;
    if (date !== undefined) event.date = date;
    if (location !== undefined) event.location = location;
    if (attachments !== undefined) event.attachments = attachments;
    await event.save();
    res.json({ event });
  } catch (err) { next(err); }
});

router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (String(event.createdBy) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await event.deleteOne();
    res.json({ ok: true });
  } catch (err) { next(err); }
});

export default router;
