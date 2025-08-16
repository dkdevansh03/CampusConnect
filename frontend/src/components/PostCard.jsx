import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { FiUser, FiClock, FiTag, FiFile, FiArrowRight, FiImage, FiMoreVertical, FiEdit, FiTrash2 } from 'react-icons/fi'
import PDFViewer from './PDFViewer.jsx'
import { getUploadUrl } from '../config/config.js'

export default function PostCard({ post, onDelete, onEdit }) {
  const { user } = useAuth()
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef()
  
  const canEdit = user?._id === post.author?._id || user?.role === 'admin'
  const canDelete = user?._id === post.author?._id || user?.role === 'admin'

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false)
      }
    }
    
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])
  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'teacher': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'student': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  const getUploadUrl = (url) => {
    // You can add transformations here if needed
    return url;
  };

  const renderAttachment = (url, index) => {
    // PDF detect
    if (url.endsWith('.pdf')) {
      return (
        <div key={index} className="w-full">
          <PDFViewer url={url} filename={`Document ${index + 1}.pdf`} />
        </div>
      );
    }

    // Images
    if (url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      return (
        <div
          key={index}
          className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center overflow-hidden"
        >
          <img
            src={url}
            alt="attachment"
            className="w-full h-full object-cover"
          />
        </div>
      );
    }

    // Other files
    return (
      <div
        key={index}
        className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center"
      >
        <FiFile className="w-6 h-6 text-gray-500" />
      </div>
    );
  };

  return (
    <div className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg">
            {post.author?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-white">{post.author?.name}</div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <FiClock className="w-3 h-3" />
              {new Date(post.createdAt).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="relative" ref={menuRef}>
          { (canEdit || canDelete) && (
            <button onClick={() => setShowMenu(s => !s)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <FiMoreVertical />
            </button>
          )}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
              {canEdit && (
                <button onClick={() => onEdit(post)} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                  <FiEdit className="text-blue-500" /> Edit
                </button>
              )}
              {canDelete && (
                <button onClick={() => onDelete(post._id)} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                  <FiTrash2 className="text-red-500" /> Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{post.title}</h2>
      
      {/* Content */}
      <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>

      {/* Tags */}
      {!!post.tags?.length && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <FiTag className="w-4 h-4 text-gray-400" />
          {post.tags.map((t, i) => (
            <span key={i} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-sm">{t}</span>
          ))}
        </div>
      )}

      {/* Attachments */}
      {!!post.attachments?.length && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {post.attachments.map((url, index) => renderAttachment(url, index))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <Link to={`/posts/${post._id}`} className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
          Read more <FiArrowRight className="w-4 h-4" />
        </Link>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(post.author?.role)}`}>
          {post.author?.role || 'user'}
        </span>
      </div>
    </div>
  )
}
  )
}
