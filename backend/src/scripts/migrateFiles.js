import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Post from '../models/Post.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected for migration');
}).catch((err) => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});

async function migrateFiles() {
  try {
    console.log('Starting file migration...');
    
    // Find all posts with local file paths
    const postsWithLocalFiles = await Post.find({
      attachments: { $regex: /^\/uploads\// }
    });
    
    console.log(`Found ${postsWithLocalFiles.length} posts with local file paths`);
    
    if (postsWithLocalFiles.length === 0) {
      console.log('No posts need migration');
      return;
    }
    
    // Update posts to remove local file paths
    for (const post of postsWithLocalFiles) {
      const updatedAttachments = post.attachments.filter(url => !url.startsWith('/uploads/'));
      
      if (updatedAttachments.length !== post.attachments.length) {
        await Post.findByIdAndUpdate(post._id, {
          attachments: updatedAttachments
        });
        console.log(`Updated post ${post._id}: removed ${post.attachments.length - updatedAttachments.length} local files`);
      }
    }
    
    console.log('Migration completed successfully!');
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run migration
migrateFiles();
