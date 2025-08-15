import { useState } from 'react'
import { FiFile, FiDownload } from 'react-icons/fi'

export default function PDFViewer({ url, filename }) {
  // Debug logging
  console.log('PDFViewer - Raw URL:', url)
  console.log('PDFViewer - Filename:', filename)

  const handleDownload = () => {
    console.log('Download clicked! URL:', url)
    
    if (url && url.startsWith('http')) {
      console.log('Opening URL in new tab:', url)
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      console.error('Invalid URL:', url)
      alert('PDF URL is invalid. Please check the file.')
    }
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
            <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
              {url}
            </p>
          </div>
          <div className="flex gap-1 flex-shrink-0">
            <button
              onClick={handleDownload}
              className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors"
              title="Open PDF in new tab"
            >
              <FiDownload className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
