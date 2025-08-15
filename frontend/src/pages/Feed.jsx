import { useEffect, useState } from 'react'
import api from '../api/client.js'
import PostCard from '../components/PostCard.jsx'
import { FiSearch, FiFilter, FiRefreshCw } from 'react-icons/fi'

export default function Feed() {
  const [posts, setPosts] = useState([])
  const [q, setQ] = useState('')
  const [tag, setTag] = useState('')
  const [loading, setLoading] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const { data } = await api.get('/posts', { params: { q, tag } })
      setPosts(data.posts || [])
    } catch (error) {
      console.error('Failed to load posts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Welcome to CampusConnect
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Connect with your campus community. Share ideas, discover events, and stay updated with what's happening around you.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300" 
              placeholder="Search posts by title or content..." 
              value={q} 
              onChange={e => setQ(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && load()}
            />
          </div>
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              className="w-full lg:w-48 pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300" 
              placeholder="Filter by tag" 
              value={tag} 
              onChange={e => setTag(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && load()}
            />
          </div>
          <button 
            onClick={load} 
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <FiRefreshCw className="w-4 h-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <FiSearch className="w-4 h-4" />
                Search
              </>
            )}
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="space-y-6">
        {posts.length > 0 ? (
          <div className="grid gap-6">
            {posts.map(post => <PostCard key={post._id} post={post} />)}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <FiSearch className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {q || tag ? 'No posts found' : 'No posts yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {q || tag 
                ? 'Try adjusting your search terms or filters'
                : 'Be the first to share something with your campus community!'
              }
            </p>
            {!q && !tag && (
              <button 
                onClick={() => window.location.href = '/create'}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Create Your First Post
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
