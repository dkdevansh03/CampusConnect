# CampusConnect Deployment Guide

This guide will help you deploy CampusConnect to Vercel (Frontend) and Render (Backend).

## Prerequisites

1. **GitHub Repository**: Your code should be pushed to GitHub
2. **MongoDB Atlas**: Set up a MongoDB database (free tier available)
3. **Vercel Account**: For frontend deployment
4. **Render Account**: For backend deployment

## Step 1: Backend Deployment (Render)

### 1.1 Set up MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string (replace `<password>` with your actual password)

### 1.2 Deploy to Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `campusconnect-backend`
   - **Root Directory**: `backend` (if your backend is in a subdirectory)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 1.3 Set Environment Variables in Render
In your Render service dashboard, go to "Environment" tab and add:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/campusconnect?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
CLIENT_URL=https://your-frontend-app-name.vercel.app
NODE_ENV=production
UPLOAD_DIR=uploads
```

### 1.4 Deploy
Click "Create Web Service" and wait for deployment.

## Step 2: Frontend Deployment (Vercel)

### 2.1 Deploy to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `/` (root directory - Vercel will automatically detect the frontend subdirectory)
   - **Build Command**: `cd frontend && npm install && npm run build` (or leave empty to use vercel.json)
   - **Output Directory**: `frontend/dist` (or leave empty to use vercel.json)

### 2.2 Set Environment Variables in Vercel
In your Vercel project dashboard, go to "Settings" → "Environment Variables" and add:

```
VITE_API_URL=https://your-backend-app-name.onrender.com
VITE_FRONTEND_URL=https://your-frontend-app-name.vercel.app
```

### 2.3 Deploy
Click "Deploy" and wait for deployment.

## Step 3: Update URLs

After both deployments are complete:

1. **Update Backend CORS**: In Render, update `CLIENT_URL` with your actual Vercel frontend URL
2. **Update Frontend API URL**: In Vercel, update `VITE_API_URL` with your actual Render backend URL

## Step 4: Test Your Application

1. Visit your Vercel frontend URL
2. Try to register/login
3. Test all features (posts, events, messages, etc.)

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure `CLIENT_URL` in backend matches your frontend URL exactly
2. **API Connection Issues**: Verify `VITE_API_URL` points to your Render backend
3. **MongoDB Connection**: Check your MongoDB Atlas connection string
4. **Build Failures**: Check the build logs in Vercel/Render for specific errors
5. **Vercel Permission Error**: If you get "Permission denied" error during build:
   - Make sure you're deploying from the root directory (not frontend subdirectory)
   - The `vercel.json` file should be in the root directory
   - Build command should be: `cd frontend && npm install && npm run build`
   - Output directory should be: `frontend/dist`

### Environment Variables Checklist:

**Backend (Render):**
- ✅ `MONGO_URI`
- ✅ `JWT_SECRET`
- ✅ `CLIENT_URL`
- ✅ `NODE_ENV=production`
- ✅ `UPLOAD_DIR=uploads`

**Frontend (Vercel):**
- ✅ `VITE_API_URL`
- ✅ `VITE_FRONTEND_URL`

## File Uploads

The uploads directory is configured to store files locally. For production, consider using:
- AWS S3
- Cloudinary
- Firebase Storage

## Security Notes

1. Never commit `.env` files to Git
2. Use strong JWT secrets
3. Enable MongoDB Atlas network access restrictions
4. Consider adding rate limiting for production

## Support

If you encounter issues:
1. Check the deployment logs in Vercel/Render
2. Verify all environment variables are set correctly
3. Test the API endpoints directly using tools like Postman
