# CampusConnect 
A full-stack social media platform designed for campus communities to connect, share, and collaborate. Built with React, Node.js, and MongoDB.
Link - - https://campus-connect-seven-ruby.vercel.app

## 🚀 Features

- **User Authentication** - JWT-based auth with role-based access (Student, Teacher, Admin)
- **Posts & Feed** - Create, edit, delete posts with rich text and file attachments
- **Comments** - Threaded commenting system on posts
- **Events** - Campus event management and discovery
- **Messages** - Real-time messaging between users
- **File Uploads** - Support for images and PDFs via local storage
- **Search & Filter** - Text search and tag-based filtering
- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Mobile-first design with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Icons** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Multer** - File upload middleware
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

## 📁 Project Structure

```
CampusConnect/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── config/         # Configuration files
│   │   └── api/            # API client setup
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── backend/                # Node.js backend application
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── models/         # MongoDB schemas
│   │   ├── middleware/     # Custom middleware
│   │   ├── scripts/        # Utility scripts
│   │   └── seed/           # Database seeding
│   └── server.js           # Main server file
└── README.md              # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dkdevansh03/CampusConnect.git
   cd CampusConnect
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Backend setup**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Environment Variables**
   Create `.env` in the backend directory:
   ```env
   PORT=4000
   MONGO_URI=mongodb://localhost:27017/campusconnect
   JWT_SECRET=your-jwt-secret
   CLIENT_URL=http://localhost:3000
   ```

5. **Create frontend environment**
   Create `.env` in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:4000/api
   VITE_FRONTEND_URL=http://localhost:3000
   ```

6. **Seed admin user (optional)**
   ```bash
   cd backend
   npm run seed:admin
   ```

7. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

8. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get all posts (with search/filter)
- `POST /api/posts` - Create new post
- `GET /api/posts/:id` - Get single post
- `PATCH /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Comments
- `GET /api/posts/:postId/comments` - Get post comments
- `POST /api/posts/:postId/comments` - Add comment

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event

### File Upload
- `POST /api/upload` - Upload files to Supabase Storage

## 🔧 Configuration

### Supabase Storage Setup
1. Create a project at [supabase.com](https://supabase.com/)
2. Create a bucket named `uploads`
3. Add these environment variables to backend:
   - SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY
4. Uploaded files are stored in Supabase Storage and served via public URLs.

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repo to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables

### Backend (Render)
1. Connect your GitHub repo to Render
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables

## 🐛 Troubleshooting

### PDF Upload Issues
- Ensure the `/uploads` folder exists and is writable.
- Check file access is set to public in your backend.

### CORS Errors
- Add your frontend domain to backend CORS configuration.
- Check environment variables are properly set

### Database Connection
- Verify MongoDB URI in environment variables
- Ensure MongoDB service is running

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## 👨‍💻 Author

**DEVANSH GUPTA**  
[GitHub Profile](https://github.com/dkdevansh03)


*Built with ❤️ for campus communities*


## 📝 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

