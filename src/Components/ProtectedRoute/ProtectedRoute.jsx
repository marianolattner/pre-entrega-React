import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

function ProtectedRoute({ children }) {
  const { user, loadingAuth } = useAuth()

  if (loadingAuth) {
    return <p>Cargando autenticación...</p>
  }

  return user ? children : <Navigate to="/login" />
}

export default ProtectedRoute