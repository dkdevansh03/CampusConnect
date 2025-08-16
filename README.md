# CampusConnect

CampusConnect is a web application designed for campus communities to share resources, events, posts, messages, and documents. It integrates with Cloudinary for file storage and provides a user-friendly interface for students and staff.

## Features

- **Posts:** Create, view, and interact with campus posts.
- **Events:** Discover and manage campus events.
- **Messages:** Send and receive messages within the campus community.
- **PDF & Document Management:** Upload, store, and view PDFs and other documents using Cloudinary.
- **Secure File Delivery:** Ensures only authorized users can access private resources.

## Technologies Used

- **Frontend:** React, JavaScript, HTML, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **File Uploads:** Multer (for handling uploads in Node.js)
- **Cloud Storage:** Cloudinary (for PDFs and other files)
- **Other:** Axios (API requests), JWT (authentication), etc.

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/CampusConnect.git
   cd CampusConnect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   - Set up your database connection in the config file.
   - Add your Cloudinary credentials to `.env` or config.
   - Configure other environment variables as needed.

4. **Cloudinary Setup**
   - Create a Cloudinary account.
   - Upload PDFs and documents as resource type **raw**.
   - Set files to **Public** for open access or configure access control for private files.
   - Add your domain to Cloudinary CORS whitelist if needed.

5. **Run the application**
   ```bash
   npm start
   ```

## Usage

- **Posts:** Users can create and view posts about campus activities.
- **Events:** Users can browse upcoming events and RSVP.
- **Messages:** Users can chat with others in the campus community.
- **PDFs/Documents:** Users can upload and view documents.  
  Example function to open PDFs in a new tab:
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

## Troubleshooting

- **401 Unauthorized (PDFs):**  
  Set Cloudinary file access to Public and remove "Blocked for delivery".
- **CORS errors:**  
  Add your domain to Cloudinary CORS whitelist.
- **Database issues:**  
  Check your database connection settings.
- **PDF not loading:**  
  Test the direct PDF URL in your browser.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT

## Author

Your Name  
[GitHub Profile](https://github.com/yourusername)