import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiUsers, FiCalendar, FiMessageCircle, FiBookOpen, FiStar, FiTrendingUp } from 'react-icons/fi'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Connect with Campus",
      description: "Build meaningful connections with students, teachers, and staff across your campus community."
    },
    {
      icon: <FiCalendar className="w-8 h-8" />,
      title: "Discover Events",
      description: "Stay updated with campus events, workshops, and activities happening around you."
    },
    {
      icon: <FiMessageCircle className="w-8 h-8" />,
      title: "Share & Engage",
      description: "Share your thoughts, ideas, and announcements with the entire campus community."
    },
    {
      icon: <FiBookOpen className="w-8 h-8" />,
      title: "Learn Together",
      description: "Collaborate on projects, share resources, and learn from each other's experiences."
    }
  ]

  const stats = [
    { number: "1000+", label: "Active Users" },
    { number: "500+", label: "Posts Shared" },
    { number: "50+", label: "Events Created" },
    { number: "24/7", label: "Community Support" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <div className="text-center">
            {/* Animated Logo */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="mx-auto w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl mb-8 animate-pulse">
                <FiBookOpen className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className={`text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Welcome to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CampusConnect
              </span>
            </h1>

            {/* Subtitle */}
            <p className={`text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              The ultimate social platform for students, teachers, and staff to connect, collaborate, and stay updated with everything happening on your campus.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Link 
                to="/register" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 transform"
              >
                Get Started Free
                <FiArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/login" 
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
              >
                Already have an account?
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-indigo-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose CampusConnect?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the power of a connected campus community with our innovative features
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${800 + index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${1200 + index * 200}ms` }}
              >
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className={`bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 lg:p-16 text-white transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Connect with Your Campus?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of students and teachers already using CampusConnect to build a stronger, more connected campus community.
            </p>
            <Link 
              to="/register" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Your Journey Today
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
