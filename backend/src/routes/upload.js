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

    // Cloudinary raw PDFs don't always include .pdf in url, force it
    let finalUrl = req.file.path;
    if (isPdf && !finalUrl.endsWith('.pdf')) {
      finalUrl += '.pdf';
      console.log('Added .pdf extension to URL:', finalUrl);
    }

    res.json({
      message: 'File uploaded successfully',
      url: finalUrl, // always correct url
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