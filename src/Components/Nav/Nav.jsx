import styles from "./Nav.module.css";

function Nav() {
  return (
    <nav className={styles.nav}>
      <a href="#" className={styles.link}>Inicio</a>
      <a href="#" className={styles.link}>Cuadernos</a>
      <a href="#" className={styles.link}>Ofertas</a>
      <a href="#" className={styles.link}>Contacto</a>
      <a href="#" className={styles.link}>Carrito</a>
    </nav>
  );
}

export default Nav;