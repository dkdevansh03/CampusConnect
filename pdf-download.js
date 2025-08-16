function openPdfInNewTab(fileUrl) {
    // Check if it's a PDF or image
    const isPdf = fileUrl.toLowerCase().includes('.pdf') || fileUrl.toLowerCase().endsWith('.pdf');
    const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(fileUrl);
    
    // For PDFs: Ensure Cloudinary URL uses 'raw' resource type
    if (isPdf && fileUrl.includes('cloudinary.com/image/upload')) {
        fileUrl = fileUrl.replace('/image/upload/', '/raw/upload/');
    }
    
    // For PDFs: Don't add .pdf extension - let Cloudinary handle it
    // For images: Keep as is (they should use /image/upload/)
    // For other files: Open as is
    
    window.open(fileUrl, '_blank');
}

// Alternative function names for clarity
function openFileInNewTab(fileUrl) {
    return openPdfInNewTab(fileUrl); // Reuse the same logic
}

function downloadFile(fileUrl, filename) {
    // Create Cloudinary download URL with fl_attachment parameter
    let downloadUrl = fileUrl;
    
    if (fileUrl.includes('cloudinary.com')) {
        const parts = fileUrl.split('/');
        const uploadIndex = parts.findIndex(part => part === 'upload');
        
        if (uploadIndex !== -1) {
            const beforeUpload = parts.slice(0, uploadIndex + 1);
            const afterUpload = parts.slice(uploadIndex + 1);
            
            const safeFilename = (filename || 'download').replace(/[^a-zA-Z0-9.-]/g, '_');
            
            downloadUrl = [
                ...beforeUpload,
                `fl_attachment:${safeFilename}`,
                ...afterUpload
            ].join('/');
        }
    }
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || 'download';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
