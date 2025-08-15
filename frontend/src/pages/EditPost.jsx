import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import api from '../api/client.js'
import { FiEdit3, FiTag, FiPaperclip, FiSend, FiX, FiFile, FiImage, FiArrowLeft } from 'react-icons/fi'

export default function EditPost() {
  const navigate = useNavigate()
  const location = useLocation()
  const post = location.state?.post

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [files, setFiles] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  // Initialize form with existing post data
  useEffect(() => {
    if (post) {
      setTitle(post.title || '')
      setContent(post.content || '')
      setTags((post.tags || []).join(', '))
    }
  }, [post])

  async function uploadFile(file) {
    const form = new FormData()
    form.append('file', file)
    const { data } = await api.post('/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } })
    return data.url
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')
    setLoading(true)
    
    try {
      const attachments = []
      for (const f of files) {
        const url = await uploadFile(f)
        attachments.push(url)
      }

      // Combine existing attachments with new ones
      const allAttachments = [...(post.attachments || []), ...attachments]

      await api.patch(`/posts/${post._id}`, { 
        title, 
        content, 
        tags: tags.split(',').map(t => t.trim()).filter(Boolean), 
        attachments: allAttachments 
      })
      
      setMessage('Post updated successfully! Redirecting...')
      setTimeout(() => navigate('/feed'), 2000)
    } catch (e) {
      setMessage(e?.response?.data?.message || 'Failed to update post')
    } finally {
      setLoading(false)
    }
  }

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) return <FiImage className="w-6 h-6 text-blue-500" />
    return <FiFile className="w-6 h-6 text-gray-500" />
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Post not found
        </h2>
        <button
          onClick={() => navigate('/feed')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Feed
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/feed')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <FiArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Post</h1>
          <p className="text-gray-600 dark:text-gray-400">Update your post content and details</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
        {message && (
          <div className={`mb-6 p-4 rounded-xl text-sm ${
            message.includes('successfully') 
              ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300'
              : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
              placeholder="Enter post title..."
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 resize-none"
              placeholder="Write your post content..."
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            <div className="relative">
              <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
                placeholder="Enter tags separated by commas..."
              />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Separate tags with commas (e.g., study, exam, tips)
            </p>
          </div>

          {/* Existing Attachments */}
          {post.attachments && post.attachments.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Existing Attachments ({post.attachments.length})
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {post.attachments.map((url, index) => (
                  <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border">
                    <div className="flex items-center gap-2">
                      <FiFile className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                        Attachment {index + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Add New Attachments
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
              <FiPaperclip className="mx-auto w-8 h-8 text-gray-400 mb-2" />
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Drop files here or click to browse
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                Supports images (JPG, PNG, WebP) and PDFs up to 10MB
              </p>
              <input 
                type="file" 
                multiple 
                accept="image/*,application/pdf" 
                onChange={e => setFiles(Array.from(e.target.files))}
                className="hidden"
                id="file-upload"
              />
              <label 
                htmlFor="file-upload"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                <FiPaperclip className="w-4 h-4" />
                Choose Files
              </label>
            </div>
          </div>

          {/* New File Preview */}
          {files.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                New Files ({files.length})
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {files.map((file, index) => (
                  <div key={index} className="relative p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border">
                    <div className="flex items-center gap-2">
                      {getFileIcon(file)}
                      <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                        {file.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <FiX className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/feed')}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Updating...
                </>
              ) : (
                <>
                  <FiEdit3 className="w-4 h-4" />
                  Update Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
