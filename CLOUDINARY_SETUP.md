# Cloudinary Setup Guide for CampusConnect

This guide will help you set up Cloudinary for file uploads in production.

## Step 1: Create Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com/)
2. Click "Sign Up For Free"
3. Create your account (free tier available)
4. Verify your email

## Step 2: Get Your Credentials

1. Login to Cloudinary Dashboard
2. Go to "Dashboard" → "API Environment variable"
3. Copy these values:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

## Step 3: Set Environment Variables

### Render Dashboard (Backend)
1. Go to your Render backend service
2. Environment tab
3. Add these variables:
   ```
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

### Local Development
1. Copy `backend/env.example` to `backend/.env`
2. Update the Cloudinary values:
   ```
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

## Step 4: Deploy Changes

1. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Add Cloudinary file upload support"
   git push origin main
   ```

2. Render will automatically redeploy

## Step 5: Test File Upload

1. Go to your Vercel frontend
2. Create a new post
3. Upload an image or PDF
4. Check if file uploads successfully

## Features

✅ **Image Optimization**: Automatic resizing and compression  
✅ **PDF Support**: Direct PDF uploads  
✅ **CDN**: Fast global delivery  
✅ **Free Tier**: 25GB storage, 25GB bandwidth/month  
✅ **Secure**: HTTPS URLs only  

## File Types Supported

- **Images**: JPG, JPEG, PNG, WebP
- **Documents**: PDF
- **Size Limit**: 10MB per file

## Troubleshooting

### Upload Fails
- Check Cloudinary credentials in Render
- Verify file size (max 10MB)
- Check file type (images/PDF only)

### Images Not Loading
- Check if Cloudinary URLs are being returned
- Verify CORS settings
- Check browser console for errors

### PDF Download Issues
- PDFs are stored as regular files in Cloudinary
- Download functionality should work normally
- Check if PDF URL is accessible

## Alternative Solutions

If Cloudinary doesn't work for you:

1. **AWS S3**: Professional solution
2. **Firebase Storage**: Google ecosystem
3. **Local Storage**: For development only

## Support

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Free Tier Limits](https://cloudinary.com/pricing)
- [API Reference](https://cloudinary.com/documentation/admin_api)
