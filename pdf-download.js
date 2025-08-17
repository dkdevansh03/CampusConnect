function openPdfInNewTab(fileUrl) {
    window.open(fileUrl, '_blank');
}

function downloadFile(fileUrl, filename) {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = filename || 'download';
    link.target = '_self'; // Force browser to download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}