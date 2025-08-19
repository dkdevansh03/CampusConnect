import { useEffect, useState, useRef } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../api/client.js'
import { FiSend, FiUser, FiMessageCircle, FiSearch, FiArrowLeft } from 'react-icons/fi'

export default function Messages() {
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState('')
  const [unreadFrom, setUnreadFrom] = useState([])
  const messagesEndRef = useRef(null)

  // Load all users for messaging
  async function loadUsers() {
    try {
      const { data } = await api.get('/users')
      setUsers(data.users || [])
      // Fetch unread summary
      const unreadRes = await api.get('/messages/unread-summary')
      setUnreadFrom(unreadRes.data.unread.map(u => u._id))
    } catch (error) {
      console.error('Failed to load users:', error)
    }
  }

  // Load conversation with selected user
  async function loadMessages(userId) {
    if (!userId) return
    setLoading(true)
    try {
      const { data } = await api.get(`/messages/with/${userId}`)
      setMessages(data.messages || [])
    } catch (error) {
      console.error('Failed to load messages:', error)
    } finally {
      setLoading(false)
    }
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Send message
  async function sendMessage(e) {
    e.preventDefault()
    if (!text.trim() || !selectedUser) return

    try {
      await api.post('/messages', { to: selectedUser._id, content: text })
      setText('')
      loadMessages(selectedUser._id)
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  // Select user to chat with
  async function selectUser(user) {
    setSelectedUser(user)
    await loadMessages(user._id)
    // Remove highlight for this user
    setUnreadFrom(prev => prev.filter(id => id !== user._id))
    // Optionally, notify Navbar to reset badge if no unread remain
    if (window.dispatchEvent) window.dispatchEvent(new Event('messages-read'))
  }

  useEffect(() => {
    // Listen for messages-read event to reset Navbar badge
    function handleRead() {
      // No-op, Navbar will refetch unread summary
    }
    window.addEventListener('messages-read', handleRead)
    return () => window.removeEventListener('messages-read', handleRead)
  }, [])

  // Filter users based on search
  const filteredUsers = users.filter(u =>
    u._id !== user?._id &&
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    loadUsers()
  }, [])

  // Add polling for new messages when chat is open
  useEffect(() => {
    if (!selectedUser) return
    const interval = setInterval(() => {
      loadMessages(selectedUser._id)
    }, 2000) // fetch every 2 seconds for snappier updates
    return () => clearInterval(interval)
  }, [selectedUser])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
          
          {/* Users List */}
          <div className="border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex flex-col h-[600px]">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <FiMessageCircle className="w-5 h-5" />
                Messages
              </h2>
              
              {/* Search */}
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Users */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {filteredUsers.map((u) => (
                <div
                  key={u._id}
                  onClick={() => selectUser(u)}
                  className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    selectedUser?._id === u._id
                      ? 'bg-blue-50 dark:bg-blue-900/30 border-r-4 border-r-blue-500'
                      : unreadFrom.includes(u._id)
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-l-yellow-500'
                        : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">{u.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{u.role}</p>
                    </div>
                  </div>
                </div>
              ))}
              {filteredUsers.length === 0 && (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No users found
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2 flex flex-col h-[600px]">
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedUser(null)}
                      className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                      <FiArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {selectedUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{selectedUser.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{selectedUser.role}</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900 custom-scrollbar">
                  {loading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : messages.length > 0 ? (
                    <>
                      {messages.map((message) => (
                        <div
                          key={message._id}
                          className={`flex ${message.from === user?._id ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                              message.from === user?._id
                                ? 'bg-blue-600 text-white border-2 border-blue-400 shadow-lg'
                                : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.from === user?._id ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </>
                  ) : (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                      <FiMessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No messages yet. Start a conversation!</p>
                    </div>
                  )}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
                  <form onSubmit={sendMessage} className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      type="submit"
                      disabled={!text.trim()}
                      className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                      <FiSend className="w-4 h-4" />
                      Send
                    </button>
                  </form>
                </div>
              </>
            ) : (
              /* Welcome Screen */
              <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                  <FiMessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Welcome to Messages
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Select a user from the list to start chatting
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
