# CampusConnect

CampusConnect is a web app for managing and sharing campus resources, including PDF documents stored on Cloudinary.

## Features

- Upload and view PDFs via Cloudinary
- Open PDFs in a new browser tab
- Simple integration and usage

## Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/CampusConnect.git
   cd CampusConnect
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Cloudinary:
   - Create a Cloudinary account.
   - Upload PDFs as resource type **raw**.
   - Set files to **Public** (not blocked for delivery).
   - Add your domain to Cloudinary CORS whitelist if needed.

4. Start the app:
   ```bash
   npm start
   ```

## PDF Download Functionality

- Use this function to open PDFs in a new tab:
  ```javascript
  // ...existing code...
  function openPdfInNewTab(pdfUrl) {
      if (pdfUrl.includes('cloudinary.com/image/upload')) {
          pdfUrl = pdfUrl.replace('/image/upload/', '/raw/upload/');
      }
      if (pdfUrl.includes('cloudinary.com') && !pdfUrl.endsWith('.pdf')) {
          pdfUrl += '.pdf';
      }
      window.open(pdfUrl, '_blank');
  }
  // ...existing code...
  ```
- Make sure your Cloudinary PDF URLs are public and accessible.

## Troubleshooting

- **401 Unauthorized:**  
  Set Cloudinary file access to Public and remove "Blocked for delivery".
- **CORS errors:**  
  Add your domain to Cloudinary CORS whitelist.
- **PDF not loading:**  
  Test the direct PDF URL in your browser.

## License

MIT

## Author

DEVANSH GUPTA