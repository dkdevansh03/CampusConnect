import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { FiSun, FiMoon, FiMenu, FiHome, FiCalendar, FiPlus, FiMessageCircle, FiUsers, FiUser, FiLogOut } from 'react-icons/fi'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { dark, setDark } = useTheme()
  const nav = useNavigate()

  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-lg sticky top-0 z-30 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/feed" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center font-bold text-xl shadow-lg group-hover:bg-white/30 transition-all duration-300">
              🎓
            </div>
            <div className="text-xl font-bold tracking-wide">CampusConnect</div>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 group">
            <FiHome className="w-4 h-4" />
            <span className="font-medium">Home</span>
          </Link>
          <Link to="/feed" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 group">
            <FiHome className="w-4 h-4" />
            <span className="font-medium">Feed</span>
          </Link>
          <Link to="/events" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 group">
            <FiCalendar className="w-4 h-4" />
            <span className="font-medium">Events</span>
          </Link>
          <Link to="/create" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 group">
            <FiPlus className="w-4 h-4" />
            <span className="font-medium">Create</span>
          </Link>
          <Link to="/messages" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 group">
            <FiMessageCircle className="w-4 h-4" />
            <span className="font-medium">Messages</span>
          </Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 group">
              <FiUsers className="w-4 h-4" />
              <span className="font-medium">Admin</span>
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <button
            title="Toggle theme"
            onClick={() => setDark(!dark)}
            className="p-3 rounded-xl hover:bg-white/20 transition-all duration-300 group"
          >
            {dark ? <FiSun className="w-5 h-5 group-hover:rotate-12 transition-transform" /> : <FiMoon className="w-5 h-5 group-hover:rotate-12 transition-transform" />}
          </button>

          {user ? (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => { nav('/profile') }} 
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 group"
              >
                <FiUser className="w-4 h-4" />
                <span className="font-medium">{user.name}</span>
              </button>
              <button
                onClick={() => { logout(); nav('/login') }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FiLogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 font-medium">Login</Link>
              <Link to="/register" className="px-4 py-3 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">Register</Link>
            </div>
          )}

          <div className="lg:hidden ml-2">
            <button className="p-3 rounded-lg hover:bg-white/20 transition-all duration-300">
              <FiMenu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
