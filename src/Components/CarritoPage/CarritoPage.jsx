import styles from './CarritoPage.module.css'

function CarritoPage({ carrito }) {
  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  )

  return (
    <section className={styles.page}>
      <h2 className={styles.titulo}>Carrito de compras</h2>

      {carrito.length === 0 ? (
        <p className={styles.vacio}>No hay productos en el carrito.</p>
      ) : (
        <>
          <div className={styles.lista}>
            {carrito.map((item) => (
              <article key={item.id} className={styles.card}>
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className={styles.imagen}
                />

                <div className={styles.info}>
                  <h3 className={styles.nombre}>{item.nombre}</h3>
                  <p className={styles.texto}>Cantidad: {item.cantidad}</p>
                  <p className={styles.texto}>Precio unitario: ${item.precio}</p>
                  <p className={styles.subtotal}>
                    Subtotal: ${item.precio * item.cantidad}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.resumen}>
            <h3 className={styles.total}>Total: ${total}</h3>
          </div>
        </>
      )}
    </section>
  )
}

export default CarritoPage