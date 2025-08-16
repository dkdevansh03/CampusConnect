function openPdfInNewTab(fileUrl) {
    // Check if it's a PDF or image
    const isPdf = fileUrl.toLowerCase().includes('.pdf') || fileUrl.toLowerCase().endsWith('.pdf');
    const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(fileUrl);
    
    // For PDFs: Ensure Cloudinary URL uses 'raw' resource type
    if (isPdf && fileUrl.includes('cloudinary.com/image/upload')) {
        fileUrl = fileUrl.replace('/image/upload/', '/raw/upload/');
    }
    
    // For PDFs: Add .pdf extension if missing
    if (isPdf && fileUrl.includes('cloudinary.com') && !fileUrl.endsWith('.pdf')) {
        fileUrl += '.pdf';
    }
    
    // For images: Keep as is (they should use /image/upload/)
    // For other files: Open as is
    
    window.open(fileUrl, '_blank');
}

// Alternative function names for clarity
function openFileInNewTab(fileUrl) {
    return openPdfInNewTab(fileUrl); // Reuse the same logic
}

function downloadFile(fileUrl, filename) {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = filename || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
