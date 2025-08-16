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

// Use memory storage for Cloudinary uploads
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

// Upload route
router.post('/', requireAuth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto', // Automatically detect file type
          folder: 'campus-connect', // Organize files in a folder
          public_id: `${Date.now()}-${req.file.originalname.split('.')[0]}`,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      
      uploadStream.end(req.file.buffer);
    });

    // Return the Cloudinary URL
    res.status(201).json({ 
    url: result.secure_url,
    public_id: result.public_id,
    resource_type: result.resource_type
  });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

// Download route - generates download URL with proper headers
router.get('/download/:public_id', requireAuth, async (req, res) => {
  try {
    const { public_id } = req.params;
    
    // Generate a download URL with attachment flag
    const downloadUrl = cloudinary.url(public_id, {
      resource_type: 'auto',
      flags: 'attachment'
    });
    
    res.json({ downloadUrl });
  } catch (error) {
    console.error('Download URL generation error:', error);
    res.status(500).json({ message: 'Failed to generate download URL' });
  }
});

export default router;