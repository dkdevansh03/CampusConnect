import { useEffect, useState } from 'react'
import api from '../api/client.js'

function UserRow({ u }) {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
      <td className="p-3">{u.name}</td>
      <td className="p-3">{u.email}</td>
      <td className="p-3">{u.role}</td>
      <td className="p-3">{new Date(u.createdAt).toLocaleString()}</td>
    </tr>
  )
}

export default function Admin() {
  const [users, setUsers] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => { loadUsers() }, [])

  async function loadUsers() {
    try {
      const { data } = await api.get('/users')
      setUsers(data.users || [])
    } catch (e) { console.error(e) }
  }

  async function handleCreate(e) {
    e.preventDefault()
    setMessage('')
    if (!form.name || !form.email || !form.password) {
      setMessage('Fill name, email and password.')
      return
    }
    setLoading(true)
    try {
      const { data } = await api.post('/users', form)
      setUsers(prev => [data.user, ...prev])
      setForm({ name: '', email: '', password: '', role: 'student' })
      setShowForm(false)
      setMessage('User created.')
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin • Users</h1>
        <div>
          <button onClick={() => setShowForm(s => !s)} className="bg-indigo-600 text-white px-4 py-2 rounded-md">
            {showForm ? 'Close' : '+ Add User'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="card">
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input className="p-2 border rounded" placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
            <input className="p-2 border rounded" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
            <input className="p-2 border rounded" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
            <div className="flex gap-2">
              <select className="p-2 border rounded" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
                <option value="student">student</option>
                <option value="teacher">teacher</option>
                <option value="admin">admin</option>
              </select>
              <button className="px-4 py-2 rounded bg-indigo-600 text-white" disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
            </div>
          </form>
          {message && <div className="mt-2 text-sm">{message}</div>}
        </div>
      )}

      <div className="card overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => <UserRow key={u._id} u={u} />)}
            {!users.length && <tr><td className="p-3" colSpan="4">No users yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
