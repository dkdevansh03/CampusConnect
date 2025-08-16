import express from 'express';
import { upload } from '../utils/cloudinary.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Upload single file
router.post('/', requireAuth, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const isPdf = req.file.mimetype === 'application/pdf';

    // Log upload details for debugging
    console.log('Upload successful:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      cloudinaryUrl: req.file.path,
      size: req.file.size
    });

    // Don't modify the Cloudinary URL - let frontend handle download transformation
    let finalUrl = req.file.path;

    res.json({
      message: 'File uploaded successfully',
      url: finalUrl, // original Cloudinary URL without .pdf
      filename: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

export default router;