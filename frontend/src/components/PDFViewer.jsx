import { FiFile, FiDownload, FiExternalLink } from 'react-icons/fi'
import { getUploadUrl } from '../config/config.js'

export default function PDFViewer({ url, filename }) {
  
  const openPdfInNewTab = () => {
    // Convert image upload URL to raw upload URL for PDFs
    let finalUrl = url
    if (finalUrl.includes('cloudinary.com/image/upload') && finalUrl.toLowerCase().includes('.pdf')) {
      finalUrl = finalUrl.replace('/image/upload/', '/raw/upload/')
    }
    console.log('Opening PDF URL:', finalUrl) // Debug log
    window.open(finalUrl, '_blank')
  }

  const downloadPdf = () => {
    // Convert image upload URL to raw upload URL for PDFs
    let finalUrl = url
    if (finalUrl.includes('cloudinary.com/image/upload') && finalUrl.toLowerCase().includes('.pdf')) {
      finalUrl = finalUrl.replace('/image/upload/', '/raw/upload/')
    }
    
    console.log('Downloading PDF URL:', finalUrl) // Debug log
    
    const link = document.createElement('a')
    link.href = finalUrl
    link.download = filename ? (filename.endsWith('.pdf') ? filename : filename + '.pdf') : 'document.pdf'
    link.target = '_blank' // Open in new tab if download fails
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
              onClick={openPdfInNewTab}
              className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
              title="Open PDF in new tab"
            >
              <FiExternalLink className="w-4 h-4" />
            </button>
            <button
              onClick={downloadPdf}
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