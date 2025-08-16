import { FiFile, FiDownload } from 'react-icons/fi'

export default function PDFViewer({ url, filename }) {
  
  const downloadPdf = () => {
    // Convert image upload URL to raw upload URL for PDFs
    let finalUrl = url
    if (finalUrl.includes('cloudinary.com/image/upload') && finalUrl.toLowerCase().includes('.pdf')) {
      finalUrl = finalUrl.replace('/image/upload/', '/raw/upload/')
    }
    
    // Add .pdf extension to force proper content type
    if (!finalUrl.endsWith('.pdf') && finalUrl.includes('cloudinary.com')) {
      finalUrl += '.pdf'
    }
    
    console.log('Downloading PDF URL:', finalUrl) // Debug log
    
    // Force download with proper filename
    const link = document.createElement('a')
    link.href = finalUrl
    link.download = filename ? (filename.endsWith('.pdf') ? filename : filename + '.pdf') : 'document.pdf'
    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'noopener noreferrer')
    
    // Add to DOM, click, and remove
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="relative">
      {/* PDF Preview Card */}
      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
            <FiFile className="w-6 h-6 text-red-600" />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 dark:text-white truncate">
              {filename || 'PDF Document'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              PDF Document • Click to download
            </p>
          </div>
          
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={downloadPdf}
              className="px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors flex items-center gap-1 text-sm font-medium"
              title="Download PDF"
            >
              <FiDownload className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}