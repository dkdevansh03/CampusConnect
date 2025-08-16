import { FiFile, FiDownload } from 'react-icons/fi'

export default function PDFViewer({ url, filename }) {
  
  const downloadPdf = () => {
    // Convert image upload URL to raw upload URL for PDFs
    let finalUrl = url
    if (finalUrl.includes('cloudinary.com/image/upload')) {
      finalUrl = finalUrl.replace('/image/upload/', '/raw/upload/')
    }
    
    // Add .pdf extension to force proper content type
    if (finalUrl.includes('cloudinary.com') && !finalUrl.endsWith('.pdf')) {
      finalUrl += '.pdf'
    }
    
    console.log('Downloading PDF URL:', finalUrl)
    
    // Create a temporary link and trigger download
    const link = document.createElement('a')
    link.href = finalUrl
    link.download = filename || 'document.pdf'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div style={{ width: '100%', marginBottom: '8px' }}>
      <div style={{ 
        padding: '12px', 
        backgroundColor: '#f9fafb', 
        border: '1px solid #e5e7eb', 
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          backgroundColor: '#fef2f2',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <FiFile style={{ width: '20px', height: '20px', color: '#dc2626' }} />
        </div>
        
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontWeight: '500', color: '#111827' }}>
            {filename || 'PDF Document'}
          </p>
          <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
            PDF Document
          </p>
        </div>
        
        <button
          onClick={downloadPdf}
          style={{
            padding: '8px 16px',
            backgroundColor: '#dcfce7',
            color: '#16a34a',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '14px',
            fontWeight: '500'
          }}
          title="Download PDF"
        >
          <FiDownload style={{ width: '16px', height: '16px' }} />
          Download
        </button>
      </div>
    </div>
  )
}