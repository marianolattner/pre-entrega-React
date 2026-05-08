import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Lara Craft</h1>
      <p className={styles.slogan}>Cuadernos con estilo</p>
    </header>
  );
}

export default Header;