import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

dotenv.config();

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const email = 'admin@campusconnect.test';
    const exists = await User.findOne({ email });
    if (exists) {
      console.log('Admin already exists:', email);
    } else {
      const password = await bcrypt.hash('Admin@123', 10);
      const user = await User.create({ name: 'Admin', email, password, role: 'admin' });
      console.log('Admin created:', user.email, 'password: Admin@123');
    }
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
