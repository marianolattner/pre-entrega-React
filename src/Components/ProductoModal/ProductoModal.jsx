import styles from './ProductoModal.module.css'

function ProductoModal({ producto, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.cerrar} onClick={onClose}>
          ×
        </button>

        <div className={styles.contenido}>
          <div className={styles.imagenContainer}>
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className={styles.imagen}
            />
          </div>

          <div className={styles.info}>
            <span className={styles.badge}>
              {producto.categoria || 'Sin categoría'}
            </span>

            <h2 className={styles.titulo}>{producto.nombre}</h2>

            <p className={styles.descripcion}>{producto.descripcion}</p>

            <p className={styles.precio}>${producto.precio}</p>

            <p className={styles.stock}>
              Stock disponible: {producto.stock ?? 'No cargado'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductoModal