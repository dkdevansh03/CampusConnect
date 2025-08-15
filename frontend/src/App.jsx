import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Feed from './pages/Feed.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import CreatePost from './pages/CreatePost.jsx'
import EditPost from './pages/EditPost.jsx'
import PostDetail from './pages/PostDetail.jsx'
import Events from './pages/Events.jsx'
import Messages from './pages/Messages.jsx'
import Admin from './pages/Admin.jsx'
import Profile from './pages/Profile.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import RoleGate from './components/RoleGate.jsx'

export default function App() {
  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<ProtectedRoute><Feed/></ProtectedRoute>} />
          <Route path="/posts/:id" element={<ProtectedRoute><PostDetail/></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><CreatePost/></ProtectedRoute>} />
          <Route path="/edit-post" element={<ProtectedRoute><EditPost/></ProtectedRoute>} />
          <Route path="/events" element={<ProtectedRoute><Events/></ProtectedRoute>} />
          <Route path="/messages" element={<ProtectedRoute><Messages/></ProtectedRoute>} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <RoleGate roles={['admin']}><Admin/></RoleGate>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="*" element={<div className="text-center py-20 text-xl font-semibold">404 - Page Not Found</div>} />
        </Routes>
      </div>
      
      {/* Developer Credit Footer */}
      <footer className="text-center py-6 border-t border-gray-200 dark:border-gray-700 mt-20">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Developed by <span className="font-semibold text-blue-600 dark:text-blue-400">DEVANSH GUPTA</span>
        </p>
      </footer>
    </div>
  )
}
