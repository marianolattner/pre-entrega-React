import { Helmet } from 'react-helmet-async'
import { useCart } from '../../context/useCart'
import styles from './CarritoPage.module.css'

function CarritoPage() {
  const { carrito, precioTotal, eliminarDelCarrito, vaciarCarrito } = useCart()

  return (
    <section className={styles.page}>
      <Helmet>
        <title>Carrito | Lara Craft</title>
        <meta name="description" content="Revisá tu carrito de compras en Lara Craft." />
      </Helmet>

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

                  <button
                    className={styles.eliminar}
                    onClick={() => eliminarDelCarrito(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.resumen}>
            <h3 className={styles.total}>Total: ${precioTotal}</h3>
            <button className={styles.vaciar} onClick={vaciarCarrito}>
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </section>
  )
}

export default CarritoPage