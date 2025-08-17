import React from 'react'
import { FiDownload, FiEye } from 'react-icons/fi'

const PDFViewer = ({ url, filename }) => {
  const openPdfInNewTab = () => {
    window.open(url, '_blank')
  }

  const downloadPdf = async () => {
    try {
      // Try to fetch and force download as blob
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = filename?.endsWith('.pdf') ? filename : filename || 'document.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
    } catch {
      // Fallback to default behavior
      const link = document.createElement('a')
      link.href = url
      link.download = filename?.endsWith('.pdf') ? filename : filename || 'document.pdf'
      link.target = '_self'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-blue-200 dark:border-purple-700 shadow-md">
      <span className="text-base font-semibold text-blue-700 dark:text-purple-300 truncate flex-1 min-w-[120px]">
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