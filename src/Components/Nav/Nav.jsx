import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCart } from '../../context/useCart'
import { useAuth } from '../../context/useAuth'
import styles from './Nav.module.css'

function Nav() {
  const { cantidadTotal } = useCart()
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [menuAbierto, setMenuAbierto] = useState(false)

  const manejarLogout = async () => {
    try {
      await logout()
      toast.success('Sesión cerrada')
      setMenuAbierto(false)
      navigate('/')
    } catch (error) {
      toast.error('No se pudo cerrar sesión')
      console.error(error)
    }
  }

  const cerrarMenu = () => {
    setMenuAbierto(false)
  }

  return (
    <nav className={styles.nav}>
      <button
        className={styles.hamburguesa}
        onClick={() => setMenuAbierto(!menuAbierto)}
        aria-label="Abrir menú"
      >
        ☰
      </button>

      <div className={`${styles.menu} ${menuAbierto ? styles.menuAbierto : ''}`}>
        <Link to="/" className={styles.link} onClick={cerrarMenu}>
          Inicio
        </Link>

        <Link to="/productos" className={styles.link} onClick={cerrarMenu}>
          Productos
        </Link>

        <Link to="/favoritos" className={styles.link} onClick={cerrarMenu}>
          Favoritos
        </Link>

        <Link to="/carrito" className={styles.link} onClick={cerrarMenu}>
          🛒{cantidadTotal > 0 ? ` ${cantidadTotal}` : ''}
        </Link>

        {isAdmin && (
          <Link to="/admin" className={styles.link} onClick={cerrarMenu}>
            Dashboard
          </Link>
        )}

        {user ? (
          <>
            <span className={styles.user}>{user.email}</span>
            <button className={styles.logout} onClick={manejarLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className={styles.link} onClick={cerrarMenu}>
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Nav