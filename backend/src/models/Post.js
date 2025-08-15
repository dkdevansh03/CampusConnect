import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  attachments: [{ type: String }], // URLs of uploaded files
}, { timestamps: true });

// Only text fields in text index (no arrays)
postSchema.index({ title: 'text', content: 'text' });

const Post = mongoose.model('Post', postSchema);
export default Post;
