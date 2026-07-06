import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCart } from '../../context/useCart'
import { useAuth } from '../../context/useAuth'
import styles from './Nav.module.css'

function Nav() {
  const { cantidadTotal } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const manejarLogout = async () => {
    try {
      await logout()
      toast.success('Sesión cerrada')
      navigate('/')
    } catch (error) {
      toast.error('No se pudo cerrar sesión')
      console.error(error)
    }
  }

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.link}>Inicio</Link>
      <Link to="/favoritos" className={styles.link}>Favoritos</Link>
      <Link to="/carrito" className={styles.link}>
        🛒{cantidadTotal > 0 ? ` ${cantidadTotal}` : ''}
      </Link>

      {user ? (
        <>
          <span className={styles.user}>{user.email}</span>
          <button className={styles.logout} onClick={manejarLogout}>
            Logout
          </button>
        </>
      ) : (
        <Link to="/login" className={styles.link}>Login</Link>
      )}
    </nav>
  )
}

export default Nav