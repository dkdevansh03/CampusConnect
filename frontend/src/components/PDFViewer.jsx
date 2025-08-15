import { useState } from 'react'
import { FiFile, FiDownload, FiAlertCircle } from 'react-icons/fi'
import { getUploadUrl } from '../config/config.js'

export default function PDFViewer({ url, filename }) {
  // Get full URL for PDF using config
  const fullUrl = getUploadUrl(url)
  
  // Check if file is accessible
  const isFileAccessible = fullUrl && fullUrl.startsWith('http')

  // Debug logging
  console.log('PDFViewer props:', { url, filename, fullUrl, isFileAccessible })

  const handleDownload = async (e) => {
    e.preventDefault()
    
    try {
      if (fullUrl.includes('cloudinary.com')) {
        // For Cloudinary URLs, fetch the file and download as blob
        const response = await fetch(fullUrl)
        const blob = await response.blob()
        
        // Create download link
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = filename || 'document.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        // Clean up
        window.URL.revokeObjectURL(downloadUrl)
      } else {
        // For other URLs, use normal download
        window.open(fullUrl, '_blank')
      }
    } catch (error) {
      console.error('Download failed:', error)
      alert('Download failed. Please try again.')
    }
  }

  if (!isFileAccessible) {
    return (
      <div className="relative">
        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
              <FiAlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {filename || 'PDF Document'}
              </p>
              <p className="text-xs text-red-500 dark:text-red-400">
                File not accessible
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* PDF Preview Card - Compact Version */}
      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
            <FiFile className="w-5 h-5 text-red-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {filename || 'PDF Document'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PDF Document
            </p>
          </div>
          <div className="flex gap-1 flex-shrink-0">
            <button
              onClick={handleDownload}
              className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors"
              title="Download PDF"
            >
              <FiDownload className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
