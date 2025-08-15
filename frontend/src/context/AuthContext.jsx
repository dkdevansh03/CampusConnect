import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/client.js'

const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('cc_user') || 'null'))
  const [token, setToken] = useState(() => localStorage.getItem('cc_token'))

  useEffect(() => {
    if (token) {
      localStorage.setItem('cc_token', token)
      api.setToken(token)
      // refresh /me
      api.get('/auth/me').then(({ data }) => setUser(data.user)).catch(() => {})
    } else {
      localStorage.removeItem('cc_token')
      api.setToken(null)
    }
  }, [token])

  useEffect(() => {
    if (user) localStorage.setItem('cc_user', JSON.stringify(user))
    else localStorage.removeItem('cc_user')
  }, [user])

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    setToken(data.token)
    setUser(data.user)
    return data.user
  }

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload)
    setToken(data.token)
    setUser(data.user)
    return data.user
  }

  const logout = () => { setToken(null); setUser(null) }

  return <AuthCtx.Provider value={{ user, token, login, register, logout }}>{children}</AuthCtx.Provider>
}

export function useAuth() { return useContext(AuthCtx) }
