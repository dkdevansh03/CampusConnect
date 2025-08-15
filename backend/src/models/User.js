import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
  avatarUrl: { type: String },
  bio: { type: String }
}, { timestamps: true });

userSchema.methods.comparePassword = async function (plain) {
  return bcrypt.compare(plain, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
