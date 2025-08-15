import { useAuth } from '../context/AuthContext.jsx'

export default function RoleGate({ roles = [], children }) {
  const { user } = useAuth()
  if (!user || (roles.length && !roles.includes(user.role))) {
    return <div className="text-sm text-red-500">You don't have access to view this page.</div>
  }
  return children
}
