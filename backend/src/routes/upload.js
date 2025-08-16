import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for memory storage (for Cloudinary)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only images (jpg, png, webp) and PDFs are allowed'));
  }
};

const upload = multer({ 
  storage, 
  fileFilter, 
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
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
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Determine resource type based on file type
    const resourceType = req.file.mimetype === 'application/pdf' ? 'raw' : 'image';
    
    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer, {
      resource_type: resourceType,
      folder: 'campusconnect', // Organize files in a folder
      public_id: `${Date.now()}-${req.file.originalname.split('.')[0]}`,
      // For PDFs, we want to ensure they can be downloaded
      flags: resourceType === 'raw' ? 'attachment' : undefined
    });

    res.status(201).json({ 
      url: result.secure_url,
      public_id: result.public_id,
      resource_type: result.resource_type
    });
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