import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { requireAuth } from '../middleware/auth.js';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure local storage for now
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
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
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// Helper function to upload to Cloudinary
const uploadToCloudinary = (buffer, options) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    }).end(buffer);
  });
};

router.post('/', requireAuth, upload.single('file'), async (req, res) => {
  try {
    // Return the local file path
    const url = `/uploads/${req.file.filename}`;
    res.status(201).json({ url });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      message: 'Upload failed', 
      error: error.message 
    });
  }
});

// Route to get download URL for PDFs
router.get('/download/:publicId', requireAuth, async (req, res) => {
  try {
    const { publicId } = req.params;
    
    // Generate a download URL with attachment flag
    const downloadUrl = cloudinary.url(publicId, {
      resource_type: 'raw',
      flags: 'attachment'
    });
    
    res.json({ downloadUrl });
  } catch (error) {
    console.error('Download URL generation error:', error);
    res.status(500).json({ 
      message: 'Failed to generate download URL', 
      error: error.message 
    });
  }
});

export default router;