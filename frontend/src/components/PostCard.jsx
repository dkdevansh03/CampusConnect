import { Link } from 'react-router-dom'
import { FiUser, FiClock, FiTag, FiFile, FiArrowRight, FiImage } from 'react-icons/fi'
import PDFViewer from './PDFViewer.jsx'

export default function PostCard({ post }) {
  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'teacher': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'student': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  const renderAttachment = (url, index) => {
    // Check if it's an image
    if (url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      return (
        <div key={index} className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center overflow-hidden">
          <img src={url} alt="attachment" className="w-full h-full object-cover" />
        </div>
      )
    }
    
    // Check if it's a PDF
    if (url.match(/\.pdf$/i)) {
      return (
        <div key={index} className="w-full">
          <PDFViewer url={url} filename={`Document ${index + 1}`} />
        </div>
      )
    }
    
    // Default file icon
    return (
      <div key={index} className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
        <FiFile className="w-6 h-6 text-gray-500" />
      </div>
    )
  }

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
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(post.author?.role)}`}>
          {post.author?.role}
        </span>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {post.content.slice(0, 200)}{post.content.length > 200 ? '...' : ''}
        </p>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium flex items-center gap-1">
              <FiTag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {post.attachments && post.attachments.length > 0 && (
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
            <FiFile className="w-4 h-4" />
            <span className="font-medium">Attachments ({post.attachments.length})</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.attachments.slice(0, 3).map((url, index) => renderAttachment(url, index))}
            {post.attachments.length > 3 && (
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center text-xs text-gray-500 font-medium">
                +{post.attachments.length - 3}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {post.comments?.length || 0} comments
        </div>
        <Link 
          to={`/posts/${post._id}`} 
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105"
        >
          Read More
          <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}
