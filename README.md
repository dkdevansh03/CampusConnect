# CampusConnect

A full-stack social media platform designed for campus communities to connect, share, and collaborate. Built with React, Node.js, MongoDB Atlas, and Supabase Storage.

Live Demo: [https://campus-connect-seven-ruby.vercel.app](https://campus-connect-seven-ruby.vercel.app)

---

## 🚀 Features

- **User Authentication** — JWT-based auth with role-based access (Student, Teacher, Admin)
- **Posts & Feed** — Create, edit, delete posts with rich text and file attachments
- **Comments** — Threaded/nested commenting system on posts
- **Events** — Campus event management and discovery
- **Messages** — Real-time messaging between users
- **File Uploads** — Images and PDFs stored in Supabase Storage
- **Search & Filter** — Text search and tag-based filtering
- **Dark Mode** — Toggle between light and dark themes
- **Responsive Design** — Mobile-first design with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend

- **React 18** — Modern UI library
- **Vite** — Fast build tool and dev server
- **Tailwind CSS** — Utility-first CSS framework
- **React Router DOM** — Client-side routing
- **Axios** — HTTP client for API calls
- **React Icons** — Icon library

### Backend

- **Node.js** — JavaScript runtime
- **Express.js** — Web framework
- **MongoDB Atlas** — Cloud NoSQL database
- **Mongoose** — MongoDB object modeling
- **JWT** — Authentication tokens
- **bcryptjs** — Password hashing
- **Multer** — File upload middleware
- **Supabase Storage** — File storage for images/PDFs
- **Helmet** — Security middleware
- **CORS** — Cross-origin resource sharing
- **Morgan** — HTTP request logger

---

## 📁 Project Structure

```
CampusConnect/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── config/          # Configuration files
│   │   └── api/             # API client setup
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
├── backend/                  # Node.js backend application
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   ├── models/          # MongoDB schemas
│   │   ├── middleware/      # Custom middleware
│   │   ├── seed/            # Database seeding
│   └── server.js            # Main server file
├── .env.example              # Example environment variables
└── README.md                 # Project documentation
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (for cloud database)
- Supabase account (for file uploads)

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
   cp env.example .env
   # Edit .env with your Atlas and Supabase configuration
   ```

4. **Environment Variables**

   In `backend/.env`:
   ```env
   PORT=4000
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/campusconnect?retryWrites=true&w=majority
   JWT_SECRET=your-jwt-secret
   CLIENT_URL=http://localhost:3000
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

   In `frontend/.env`:
   ```env
   VITE_API_URL=https://your-backend-app-name.onrender.com/api
   VITE_FRONTEND_URL=https://your-frontend-app-name.vercel.app
   ```

5. **Seed admin user (optional)**
   > Run this command inside the `backend` folder to create the admin user in your Atlas database.
   ```bash
   cd backend
   npm run seed:admin
   ```
   - Default admin credentials:
     - Email: `admin@campusconnect.test`
     - Password: `Admin@123`

6. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000/api

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` — User registration
- `POST /api/auth/login` — User login
- `GET /api/auth/me` — Get current user

### Posts
- `GET /api/posts` — Get all posts (with search/filter)
- `POST /api/posts` — Create new post
- `GET /api/posts/:id` — Get single post
- `PATCH /api/posts/:id` — Update post
- `DELETE /api/posts/:id` — Delete post

### Comments
- `GET /api/posts/:postId/comments` — Get post comments (nested)
- `POST /api/posts/:postId/comments` — Add comment or reply

### Events
- `GET /api/events` — Get all events
- `POST /api/events` — Create event

### File Upload
- `POST /api/upload` — Upload files to Supabase Storage

---

## 🔧 Configuration

### Supabase Storage Setup

1. Create a project at [supabase.com](https://supabase.com/)
2. Create a bucket named `uploads`
3. Add these environment variables to backend:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Uploaded files are stored in Supabase Storage and served via public URLs.

### MongoDB Atlas Setup

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Get your connection string and set it in `MONGO_URI` in `.env`

---

## 🚀 Deployment

See `DEPLOYMENT.md` for full deployment instructions.

### Frontend (Vercel)
- Connect your GitHub repo to Vercel
- Set build command: `cd frontend && npm install && npm run build`
- Set output directory: `frontend/dist`
- Add environment variables

### Backend (Render)
- Connect your GitHub repo to Render
- Set root directory: `backend`
- Set build command: `npm install`
- Set start command: `npm start`
- Add environment variables

---

## 🐛 Troubleshooting

### PDF Upload Issues
- Ensure Supabase bucket `uploads` exists and is public
- Check file access is set to public in Supabase dashboard

### CORS Errors
- Add your frontend domain to backend CORS configuration
- Check environment variables are properly set

### Database Connection
- Verify MongoDB Atlas URI in environment variables
- Ensure Atlas cluster is running and accessible

### Environment Variables
- Never commit `.env` files to GitHub (they are in `.gitignore`)
- Set secrets in Render/Vercel dashboard for production

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

## 👨‍💻 Author

**DEVANSH GUPTA**  
[GitHub Profile](https://github.com/dkdevansh03)

*Built with ❤️ for campus communities*


