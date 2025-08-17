import React from 'react'
import { FiDownload, FiEye } from 'react-icons/fi'

const PDFViewer = ({ url, filename }) => {
  const openPdfInNewTab = () => {
    window.open(url, '_blank')
  }

  const downloadPdf = () => {
    // Force download to local
    const link = document.createElement('a')
    link.href = url
    link.download = filename?.endsWith('.pdf') ? filename : filename || 'document.pdf'
    link.target = '_self' // Use _self to force browser download
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-blue-200 dark:border-purple-700 shadow-md">
      <span className="text-base font-semibold text-blue-700 dark:text-purple-300 truncate flex-1">
        {filename || 'PDF Document'}
      </span>
      <button
        onClick={openPdfInNewTab}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow transition-all duration-200"
        title="View PDF"
      >
        <FiEye className="w-5 h-5" />
        View
      </button>
      <button
        onClick={downloadPdf}
        className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold shadow transition-all duration-200"
        title="Download PDF"
      >
        <FiDownload className="w-5 h-5" />
        Download
      </button>
    </div>
  )
}

export default PDFViewer