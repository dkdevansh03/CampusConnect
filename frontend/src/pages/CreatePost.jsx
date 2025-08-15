import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/client.js'
import { FiEdit3, FiTag, FiPaperclip, FiSend, FiX, FiFile, FiImage } from 'react-icons/fi'

export default function CreatePost() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [files, setFiles] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

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
      await api.post('/posts', { title, content, tags: tags.split(',').map(t=>t.trim()).filter(Boolean), attachments })
      setTitle(''); setContent(''); setTags(''); setFiles([])
      setMessage('Post created successfully! Redirecting to feed...')
      setTimeout(() => navigate('/feed'), 2000)
    } catch (e) {
      setMessage(e?.response?.data?.message || 'Failed to create post')
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

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Create a New Post
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Share your thoughts, ideas, or announcements with your campus community
        </p>
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
              Post Title
            </label>
            <div className="relative">
              <FiEdit3 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300" 
                placeholder="Enter a compelling title for your post" 
                value={title} 
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Post Content
            </label>
            <textarea 
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 resize-none" 
              placeholder="Write your post content here..." 
              rows="8"
              value={content} 
              onChange={e => setContent(e.target.value)}
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            <div className="relative">
              <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300" 
                placeholder="Enter tags separated by commas (e.g., technology, campus, events)" 
                value={tags} 
                onChange={e => setTags(e.target.value)}
              />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Tags help others discover your post
            </p>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Attachments
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

          {/* File Preview */}
          {files.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Selected Files ({files.length})
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
              type="submit"
              disabled={loading}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Publishing...
                </>
              ) : (
                <>
                  <FiSend className="w-4 h-4" />
                  Publish Post
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/feed')}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
