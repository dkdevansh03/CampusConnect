import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/client.js'
import { FiUser, FiClock, FiTag, FiFile, FiMessageCircle, FiArrowLeft, FiSend } from 'react-icons/fi'
import PDFViewer from '../components/PDFViewer.jsx'

export default function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [commentLoading, setCommentLoading] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const p = await api.get(`/posts/${id}`)
      setPost(p.data.post)
      const c = await api.get(`/posts/${id}/comments`)
      setComments(c.data.comments || [])
    } catch (error) {
      console.error('Failed to load post:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [id])

  async function addComment(e) {
    e.preventDefault()
    if (!text.trim()) return
    
    setCommentLoading(true)
    try {
      await api.post(`/posts/${id}/comments`, { content: text })
      setText('')
      load()
    } catch (error) {
      console.error('Failed to add comment:', error)
    } finally {
      setCommentLoading(false)
    }
  }

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
        <div key={index} className="group">
          <div className="relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600">
            <img 
              src={url} 
              alt={`attachment ${index + 1}`} 
              className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
          </div>
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
      <a 
        key={index}
        href={url} 
        target="_blank" 
        rel="noreferrer"
        className="block p-4 bg-white dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-500 hover:shadow-md transition-shadow duration-300"
      >
        <FiFile className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center">Document</p>
      </a>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The post you're looking for doesn't exist or has been removed.</p>
        <Link to="/feed" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
          <FiArrowLeft className="w-4 h-4" />
          Back to Feed
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back Button */}
      <div>
        <Link 
          to="/feed" 
          className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Feed
        </Link>
      </div>

      {/* Post Content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Post Header */}
        <div className="p-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {post.author?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <FiUser className="w-4 h-4" />
                    {post.author?.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock className="w-4 h-4" />
                    {new Date(post.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getRoleColor(post.author?.role)}`}>
              {post.author?.role}
            </span>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium flex items-center gap-1">
                  <FiTag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Post Body */}
        <div className="p-8">
          <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
            <p className="whitespace-pre-wrap">{post.content}</p>
          </div>

          {/* Attachments */}
          {post.attachments && post.attachments.length > 0 && (
            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FiFile className="w-5 h-5" />
                Attachments ({post.attachments.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {post.attachments.map((url, index) => renderAttachment(url, index))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <FiMessageCircle className="w-6 h-6 text-blue-600" />
          Comments ({comments.length})
        </h2>

        {/* Add Comment Form */}
        <form onSubmit={addComment} className="mb-8">
          <div className="flex gap-4">
            <input 
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300" 
              placeholder="Write a comment..." 
              value={text} 
              onChange={e => setText(e.target.value)}
              required
            />
            <button 
              type="submit"
              disabled={commentLoading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {commentLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <FiSend className="w-4 h-4" />
                  Comment
                </>
              )}
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment._id} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                  {comment.author?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {comment.author?.name}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(comment.author?.role)}`}>
                      {comment.author?.role}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <FiMessageCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No comments yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Be the first to share your thoughts on this post!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
