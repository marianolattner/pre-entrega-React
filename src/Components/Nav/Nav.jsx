import { Link } from 'react-router-dom'
import styles from './Nav.module.css'

function Nav({ carritoCantidad }) {
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.link}>Inicio</Link>
      <Link to="/favoritos" className={styles.link}>Favoritos</Link>
      <Link to="/carrito" className={styles.link}>
        🛒{carritoCantidad > 0 ? ` ${carritoCantidad}` : ''}
      </Link>
    </nav>
  )
}

export default Nav