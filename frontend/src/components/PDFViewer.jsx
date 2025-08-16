import React from 'react'
import { FiDownload } from 'react-icons/fi'

const PDFViewer = ({ url, filename }) => {
  const downloadPdf = () => {
    // Create Cloudinary download URL with fl_attachment parameter
    let downloadUrl = url

    // For Cloudinary URLs, add the fl_attachment parameter
    if (url.includes('cloudinary.com')) {
      // Extract parts of the URL
      const parts = url.split('/')
      const uploadIndex = parts.findIndex(part => part === 'upload')

      if (uploadIndex !== -1) {
        // Insert fl_attachment parameter after 'upload'
        const beforeUpload = parts.slice(0, uploadIndex + 1)
        const afterUpload = parts.slice(uploadIndex + 1)

        // Create safe filename for Cloudinary
        const safeFilename = (filename || 'document.pdf').replace(
          /[^a-zA-Z0-9.-]/g,
          '_'
        )

        // Reconstruct URL with fl_attachment
        downloadUrl = [
          ...beforeUpload,
          `fl_attachment:${safeFilename}`,
          ...afterUpload,
        ].join('/')
      }
    }

    console.log('Original URL:', url)
    console.log('Download URL:', downloadUrl)

    // Create download link
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = filename || 'document.pdf'
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
      <span className="text-sm truncate">{filename || 'PDF Document'}</span>
      <button
        onClick={downloadPdf}
        className="p-1 text-gray-600 dark:text-gray-200 hover:text-blue-500 transition-colors"
        title={`Download ${filename || 'PDF Document'}`}
      >
        <FiDownload size={16} />
      </button>
    </div>
  )
}

export default PDFViewer