import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

async function fixIndexes() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    
    // Get the Post collection
    const Post = mongoose.connection.collection('posts');
    
    // Drop all existing indexes
    console.log('Dropping existing indexes...');
    await Post.dropIndexes();
    console.log('All indexes dropped successfully');
    
    // Create new clean indexes
    console.log('Creating new indexes...');
    await Post.createIndex({ title: 'text', content: 'text' });
    await Post.createIndex({ tags: 1 });
    await Post.createIndex({ author: 1 });
    await Post.createIndex({ createdAt: -1 });
    
    console.log('New indexes created successfully');
    
  } catch (error) {
    console.error('Error fixing indexes:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
    process.exit(0);
  }
}

fixIndexes();
