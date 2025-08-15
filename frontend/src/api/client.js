import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL?.replace(/\/$/, '') + '/api'
})

let token = null
function setToken(t) {
  token = t
}
instance.interceptors.request.use((config) => {
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default {
  get: (...args) => instance.get(...args),
  post: (...args) => instance.post(...args),
  patch: (...args) => instance.patch(...args),
  delete: (...args) => instance.delete(...args),
  setToken
}
