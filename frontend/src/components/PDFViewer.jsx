import { useState } from 'react'
import { FiFile, FiDownload, FiExternalLink } from 'react-icons/fi'

export default function PDFViewer({ url, filename }) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    try {
      setIsDownloading(true)
      
      // Create a download link with proper headers
      const response = await fetch(url)
      const blob = await response.blob()
      
      // Create download link
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = filename || 'document.pdf'
      document.body.appendChild(link)
      link.click()
      
      // Cleanup
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error('Download failed:', error)
      // Fallback: open in new tab if download fails
      window.open(url, '_blank')
    } finally {
      setIsDownloading(false)
    }
  }

  const handleView = () => {
    window.open(url, '_blank')
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
            {/* View Button */}
            <button
              onClick={handleView}
              className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
              title="View PDF in new tab"
            >
              <FiExternalLink className="w-4 h-4" />
            </button>
            
            {/* Download Button */}
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Download PDF"
            >
              <FiDownload className={`w-4 h-4 ${isDownloading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}