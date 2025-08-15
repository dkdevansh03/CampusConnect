import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { FiUser, FiMail, FiAward, FiCalendar, FiShield } from 'react-icons/fi'
import ChangePasswordModal from '../components/ChangePasswordModal.jsx'

export default function Profile() {
  const { user } = useAuth()
  const [showChangePassword, setShowChangePassword] = useState(false)
  
  if (!user) return null

  const getRoleIcon = (role) => {
    switch(role) {
      case 'admin': return '👑'
      case 'teacher': return '👨‍🏫'
      case 'student': return '🎓'
      default: return '👤'
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

  const getRoleDescription = (role) => {
    switch(role) {
      case 'admin': return 'Full system access and user management'
      case 'teacher': return 'Can create events and moderate content'
      case 'student': return 'Can post, comment, and participate in events'
      default: return 'Basic user access'
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Your Profile
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Manage your account and view your profile information
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center text-4xl backdrop-blur-sm">
            {getRoleIcon(user.role)}
          </div>
          <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
          <span className={`px-4 py-2 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm`}>
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </span>
        </div>

        {/* Profile Details */}
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FiUser className="w-5 h-5 text-blue-600" />
                Personal Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <FiUser className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                    <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <FiMail className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                    <p className="font-medium text-gray-900 dark:text-white">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <FiAward className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
                    <p className="font-medium text-gray-900 dark:text-white capitalize">{user.role}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FiShield className="w-5 h-5 text-green-600" />
                Account Details
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                    <FiCalendar className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {new Date(user.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Role Permissions</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {getRoleDescription(user.role)}
                  </p>
                </div>

                {user.bio && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Bio</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{user.bio}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                Edit Profile
              </button>
              <button 
                onClick={() => setShowChangePassword(true)}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal 
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </div>
  )
}
