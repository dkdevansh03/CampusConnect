// Configuration file for the application
export const config = {
  // Backend API URL
  BACKEND_URL: 'http://localhost:5000',
  
  // Frontend URL
  FRONTEND_URL: 'http://localhost:3000',
  
  // Uploads URL (for file access)
  UPLOADS_URL: 'http://localhost:5000',
  
  // API endpoints
  API_BASE: 'http://localhost:5000',
}

// Helper function to get full URL for uploads
export const getUploadUrl = (path) => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  if (path.startsWith('/uploads/')) {
    return `${config.UPLOADS_URL}${path}`
  }
  return path
}

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  if (!endpoint) return ''
  if (endpoint.startsWith('http')) return endpoint
  return `${config.API_BASE}${endpoint}`
}
