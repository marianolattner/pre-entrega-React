import styles from './Item.module.css'

function Item({ nombre, precio, descripcion, imagen }) {
  return (
    <div className={styles.card}>
      <img src={imagen} alt={nombre} className={styles.imagen} />
      <h3 className={styles.nombre}>{nombre}</h3>
      <p className={styles.descripcion}>{descripcion}</p>
      <p className={styles.precio}>${precio}</p>
      <button className={styles.boton}>Ver producto</button>
    </div>
  )
}

export default Item