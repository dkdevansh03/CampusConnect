import express from 'express';
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Create a comment
router.post('/posts/:postId/comments', requireAuth, async (req, res, next) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const comment = await Comment.create({ post: post._id, author: req.user._id, content });
    res.status(201).json({ comment });
  } catch (err) { next(err); }
});

// List comments for a post
router.get('/posts/:postId/comments', requireAuth, async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'name role')
      .sort({ createdAt: -1 });
    res.json({ comments });
  } catch (err) { next(err); }
});

export default router;
