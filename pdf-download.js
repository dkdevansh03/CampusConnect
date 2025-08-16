function openPdfInNewTab(pdfUrl) {
    // Ensure Cloudinary URL uses 'raw' resource type for PDFs
    if (pdfUrl.includes('cloudinary.com/image/upload') && pdfUrl.endsWith('.pdf')) {
        pdfUrl = pdfUrl.replace('/image/upload/', '/raw/upload/');
    }
    if (pdfUrl.includes('cloudinary.com') && !pdfUrl.endsWith('.pdf')) {
        pdfUrl += '.pdf';
    }
    window.open(pdfUrl, '_blank');
}
