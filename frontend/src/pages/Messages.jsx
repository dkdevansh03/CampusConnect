import { useEffect, useState } from 'react'
import api from '../api/client.js'

export default function Messages() {
  const [otherId, setOtherId] = useState('')
  const [list, setList] = useState([])
  const [text, setText] = useState('')

  async function load() {
    if (!otherId) return
    const { data } = await api.get(`/messages/with/${otherId}`)
    setList(data.messages || [])
  }

  async function send(e) {
    e.preventDefault()
    await api.post('/messages', { to: otherId, content: text })
    setText('')
    load()
  }

  useEffect(() => { load() }, [otherId])

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold mb-3">Private Messages</h1>
      <div className="flex gap-2 mb-3">
        <input className="w-full border rounded p-2 dark:bg-gray-900" placeholder="Recipient User ID" value={otherId} onChange={e=>setOtherId(e.target.value)} />
        <button onClick={load} className="px-3 rounded bg-gray-900 text-white dark:bg-white dark:text-gray-900">Load</button>
      </div>
      <div className="p-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 max-h-96 overflow-auto space-y-2">
        {list.map(m => (
          <div key={m._id} className="text-sm">
            <span className="opacity-70">{new Date(m.createdAt).toLocaleString()}:</span> {m.content}
          </div>
        ))}
        {!list.length && <div className="text-sm opacity-70">No messages.</div>}
      </div>
      <form onSubmit={send} className="flex gap-2 mt-3">
        <input className="flex-1 border rounded p-2 dark:bg-gray-900" placeholder="Type a message..." value={text} onChange={e=>setText(e.target.value)} />
        <button className="px-3 rounded bg-gray-900 text-white dark:bg-white dark:text-gray-900">Send</button>
      </form>
    </div>
  )
}
