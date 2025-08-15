import { useEffect, useState } from 'react'
import api from '../api/client.js'
import { useAuth } from '../context/AuthContext.jsx'
import { FiSearch, FiCalendar, FiMapPin, FiPlus, FiClock, FiUser, FiFilter } from 'react-icons/fi'

export default function Events() {
  const [events, setEvents] = useState([])
  const [q, setQ] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [form, setForm] = useState({ title: '', description: '', date: '', location: '' })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  async function load() {
    setLoading(true)
    try {
      const { data } = await api.get('/events', { params: { q, from, to } })
      setEvents(data.events || [])
    } catch (error) {
      console.error('Failed to load events:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function createEvent(e) {
    e.preventDefault()
    setMessage('')
    setLoading(true)
    try {
      await api.post('/events', form)
      setForm({ title: '', description: '', date: '', location: '' })
      setMessage('Event created successfully!')
      load()
    } catch (e) {
      setMessage(e?.response?.data?.message || 'Failed to create event')
    } finally {
      setLoading(false)
    }
  }

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'teacher': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Campus Events
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover and join exciting events happening on your campus. From workshops to social gatherings, there's always something interesting going on.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Events List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Filter */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300" 
                  placeholder="Search events..." 
                  value={q} 
                  onChange={e => setQ(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && load()}
                />
              </div>
              <div className="relative">
                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  className="w-full lg:w-40 pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300" 
                  type="date" 
                  value={from} 
                  onChange={e => setFrom(e.target.value)}
                />
              </div>
              <div className="relative">
                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  className="w-full lg:w-40 pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300" 
                  type="date" 
                  value={to} 
                  onChange={e => setTo(e.target.value)}
                />
              </div>
              <button 
                onClick={load} 
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <FiSearch className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>

          {/* Events Grid */}
          <div className="space-y-4">
            {events.length > 0 ? (
              events.map(ev => (
                <div key={ev._id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {ev.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-2">
                          <FiCalendar className="w-4 h-4" />
                          {new Date(ev.date).toLocaleDateString('en-US', { 
                            weekday: 'long',
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                        {ev.location && (
                          <div className="flex items-center gap-2">
                            <FiMapPin className="w-4 h-4" />
                            {ev.location}
                          </div>
                        )}
                      </div>
                      {ev.description && (
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {ev.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(ev.createdBy?.role)}`}>
                        {ev.createdBy?.role}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <FiUser className="w-4 h-4" />
                    Created by {ev.createdBy?.name}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <FiCalendar className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {q || from || to ? 'No events found' : 'No events yet'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {q || from || to 
                    ? 'Try adjusting your search terms or filters'
                    : 'Be the first to create an event for your campus!'
                  }
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Create Event Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <FiPlus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Create Event
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Organize and share events with your campus community
              </p>
            </div>

            {user?.role !== 'teacher' && user?.role !== 'admin' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <FiCalendar className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Only teachers and administrators can create events
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Contact your teacher or admin to request an event
                </p>
              </div>
            ) : (
              <form onSubmit={createEvent} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Event Title
                  </label>
                  <input 
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300" 
                    placeholder="Enter event title" 
                    value={form.title} 
                    onChange={e => setForm({ ...form, title: e.target.value })} 
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea 
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 resize-none" 
                    placeholder="Describe your event..." 
                    rows="3"
                    value={form.description} 
                    onChange={e => setForm({ ...form, description: e.target.value })} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date & Time
                  </label>
                  <input 
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300" 
                    type="datetime-local" 
                    value={form.date} 
                    onChange={e => setForm({ ...form, date: e.target.value })} 
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <input 
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300" 
                    placeholder="Event location" 
                    value={form.location} 
                    onChange={e => setForm({ ...form, location: e.target.value })} 
                  />
                </div>
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <FiPlus className="w-4 h-4" />
                      Create Event
                    </>
                  )}
                </button>
                {message && (
                  <div className={`p-3 rounded-xl text-sm ${
                    message.includes('successfully') 
                      ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300'
                      : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
                  }`}>
                    {message}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
