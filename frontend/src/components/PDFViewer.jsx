import React from 'react'
import { FiDownload } from 'react-icons/fi'

const PDFViewer = ({ url, filename }) => {
  const downloadPdf = () => {
    const finalUrl = url // backend already fixed
    console.log('Downloading PDF URL:', finalUrl)

    const link = document.createElement('a')
    link.href = finalUrl
    link.download = filename || 'document.pdf'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
      <span className="text-sm truncate">{filename || 'PDF Document'}</span>
      <button
        onClick={downloadPdf}
        className="p-1 text-gray-600 dark:text-gray-200 hover:text-blue-500"
      >
        <FiDownload size={16} />
      </button>
    </div>
  )
}

export default PDFViewer