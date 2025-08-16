import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    console.log('Uploading file:', file.originalname, 'Type:', file.mimetype);
    
    // Force PDFs to be uploaded as raw
    if (file.mimetype === 'application/pdf') {
      return {
        folder: 'campus-connect',
        resource_type: 'raw',
        allowed_formats: ['pdf'],
        public_id: `${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, "")}`
      };
    } else {
      return {
        folder: 'campus-connect',
        resource_type: 'auto',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        transformation: [{ quality: 'auto' }]
      };
    }
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow images and PDFs
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only images and PDFs are allowed'), false);
    }
  }
});

// Upload single file
router.post('/', requireAuth, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    console.log('Upload successful:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      path: req.file.path,
      size: req.file.size
    });

    res.json({
      message: 'File uploaded successfully',
      url: req.file.path,
      filename: req.file.originalname,
      size: req.file.size
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

export default router;