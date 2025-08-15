// Configuration file for the application
export const config = {
  // Backend API URL - use environment variable or fallback to localhost
  BACKEND_URL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  
  // Frontend URL - use environment variable or fallback to localhost
  FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL || 'http://localhost:3000',
  
  // Uploads URL (for file access) - use environment variable or fallback to localhost
  UPLOADS_URL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  
  // API endpoints - use environment variable or fallback to localhost
  API_BASE: import.meta.env.VITE_API_URL || 'http://localhost:4000',
}

// Helper function to get full URL for uploads
export const getUploadUrl = (path) => {
  if (!path) return ''
  
  // If it's already a full URL (Cloudinary), return as is
  if (path.startsWith('http')) return path
  
  // For any other path, just return as is
  return path
}

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  if (!endpoint) return ''
  if (endpoint.startsWith('http')) return endpoint
  return `${config.API_BASE}${endpoint}`
}
