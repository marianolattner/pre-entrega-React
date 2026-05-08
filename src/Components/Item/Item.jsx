import styles from './Item.module.css'

function Item({ nombre, precio, descripcion, imagen }) {
  return (
    <article className={styles.card}>
      <img src={imagen} alt={nombre} className={styles.imagen} />

      <div className={styles.contenido}>
        <h3 className={styles.nombre}>{nombre}</h3>
        <p className={styles.descripcion}>{descripcion}</p>
      </div>

      <div className={styles.acciones}>
        <p className={styles.precio}>${precio}</p>
        <button className={styles.boton}>Ver producto</button>
      </div>
    </article>
  )
}

export default Item