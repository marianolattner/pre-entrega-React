import styles from "./PersonaCard.module.css";

function PersonaCard({ foto, nombre, puesto, email }) {
  return (
    <div className={styles.card}>
      <img src={foto} alt={nombre} className={styles.imagen} />
      <h3 className={styles.nombre}>{nombre}</h3>
      <p className={styles.puesto}>{puesto}</p>
      <p className={styles.email}>{email}</p>
    </div>
  );
}

export default PersonaCard;