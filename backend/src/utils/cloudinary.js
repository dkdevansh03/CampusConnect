import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    const timestamp = Date.now();
    const originalName = file.originalname.replace(/\.[^/.]+$/, ""); // Remove extension
    
    console.log('Processing upload:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      timestamp
    });
    
    // Handle PDF uploads - force raw resource type
    if (file.mimetype === 'application/pdf') {
      const config = {
        folder: 'campus-connect',
        resource_type: 'raw',
        allowed_formats: ['pdf'],
        public_id: `${timestamp}-${originalName}`,
        // No transformations for PDFs
      };
      
      console.log('PDF upload config:', config);
      return config;
    }
    
    // Handle image uploads - use image resource type
    if (file.mimetype.startsWith('image/')) {
      const config = {
        folder: 'campus-connect',
        resource_type: 'image',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
        public_id: `${timestamp}-${originalName}`,
        transformation: [{ quality: 'auto' }]
      };
      
      console.log('Image upload config:', config);
      return config;
    }
    
    // Fallback for other files
    console.warn('Unexpected file type:', file.mimetype);
    return {
      folder: 'campus-connect',
      resource_type: 'auto',
      public_id: `${timestamp}-${originalName}`
    };
  }
});

export const upload = multer({ 
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
