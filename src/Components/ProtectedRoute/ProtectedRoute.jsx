import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAdmin, loadingAuth } = useAuth()

  if (loadingAuth) {
    return <LoadingSpinner mensaje="Verificando permisos..." />
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />
  }

  return children
}

export default ProtectedRoute