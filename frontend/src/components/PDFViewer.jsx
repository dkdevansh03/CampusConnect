import React from 'react'
import { FiDownload } from 'react-icons/fi'

const PDFViewer = ({ url, filename }) => {
  const openPdfInNewTab = () => {
    window.open(url, '_blank')
  }

  const downloadPdf = () => {
    // Force download with .pdf extension
    const link = document.createElement('a')
    link.href = url
    link.download = filename?.endsWith('.pdf') ? filename : filename || 'document.pdf'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
      <span className="text-sm truncate">{filename || 'PDF Document'}</span>
      <button
        onClick={openPdfInNewTab}
        className="p-1 text-gray-600 dark:text-gray-200 hover:text-blue-500 transition-colors"
        title={`View ${filename || 'PDF Document'}`}
      >
        View
      </button>
      <button
        onClick={downloadPdf}
        className="p-1 text-gray-600 dark:text-gray-200 hover:text-green-600 transition-colors"
        title={`Download ${filename || 'PDF Document'}`}
      >
        <FiDownload size={16} />
      </button>
    </div>
  )
}

export default PDFViewer