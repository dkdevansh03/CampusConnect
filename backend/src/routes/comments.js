import express from 'express';
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Create a comment or reply
router.post('/posts/:postId/comments', requireAuth, async (req, res, next) => {
  try {
    const { content, parent } = req.body;
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const comment = await Comment.create({ post: post._id, author: req.user._id, content, parent: parent || null });
    res.status(201).json({ comment });
  } catch (err) { next(err); }
});

// List comments for a post (nested)
router.get('/posts/:postId/comments', requireAuth, async (req, res, next) => {
  try {
    const allComments = await Comment.find({ post: req.params.postId })
      .populate('author', 'name role')
      .sort({ createdAt: 1 });

    // Build nested tree
    const map = {};
    allComments.forEach(c => map[c._id] = { ...c.toObject(), replies: [] });
    const tree = [];
    allComments.forEach(c => {
      if (c.parent) {
        map[c.parent]?.replies.push(map[c._id]);
      } else {
        tree.push(map[c._id]);
      }
    });
    res.json({ comments: tree });
  } catch (err) { next(err); }
});

export default router;
