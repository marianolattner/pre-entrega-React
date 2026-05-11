import styles from './ProductoModal.module.css'

function ProductoModal({ producto, onClose }) {
  if (!producto) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.cerrar} onClick={onClose}>✕</button>
        <img src={producto.imagen} alt={producto.nombre} className={styles.imagen} />
        <h2 className={styles.nombre}>{producto.nombre}</h2>
        <p className={styles.descripcion}>{producto.descripcion}</p>
        <p className={styles.precio}>${producto.precio}</p>
      </div>
    </div>
  )
}

export default ProductoModal