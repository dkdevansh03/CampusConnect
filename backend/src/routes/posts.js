import express from 'express';
import Post from '../models/Post.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Create post
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { title, content, tags = [], attachments = [] } = req.body;
    const post = await Post.create({ author: req.user._id, title, content, tags, attachments });
    res.status(201).json({ post });
  } catch (err) { next(err); }
});

// List posts with search + filters
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const { q, tag, author, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (q) filter.$text = { $search: q };
    if (tag) filter.tags = tag;
    if (author) filter.author = author;
    const skip = (Number(page) - 1) * Number(limit);
    const posts = await Post.find(filter).populate('author', 'name role').sort({ createdAt: -1 }).skip(skip).limit(Number(limit));
    const total = await Post.countDocuments(filter);
    res.json({ posts, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) { next(err); }
});

// Get one
router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name role');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ post });
  } catch (err) { next(err); }
});

// Update (author or admin)
// Only author or admin can update
router.patch('/:id', requireAuth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (String(post.author) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const { title, content, tags, attachments } = req.body;
    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    if (tags !== undefined) post.tags = tags;
    if (attachments !== undefined) post.attachments = attachments;
    await post.save();
    res.json({ post });
  } catch (err) { next(err); }
});

// Delete
// Only author or admin can delete
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (String(post.author) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await post.deleteOne();
    res.json({ ok: true });
  } catch (err) { next(err); }
});

export default router;
