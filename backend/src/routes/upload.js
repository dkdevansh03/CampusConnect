import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'campusconnect',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'pdf'],
    // Only apply transformations to images, not PDFs
    transformation: (req, file) => {
      // If it's an image, apply transformations
      if (file.mimetype.startsWith('image/')) {
        return [
          { width: 1000, height: 1000, crop: 'limit' },
          { quality: 'auto' }
        ]
      }
      // For PDFs, return no transformations
      return []
    }
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg','image/png','image/webp','application/pdf'];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error('Only images (jpg,png,webp) and PDFs are allowed'));
};

const upload = multer({ 
  storage, 
  fileFilter, 
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

router.post('/', requireAuth, upload.single('file'), (req, res) => {
  try {
    // Return the Cloudinary URL
    const url = req.file.path;
    res.status(201).json({ url });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed' });
  }
});

export default router;
