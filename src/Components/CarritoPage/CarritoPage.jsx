import { Helmet } from 'react-helmet-async'
import Swal from 'sweetalert2'
import { useCart } from '../../context/useCart'
import { descontarStockCompra } from '../../services/products'
import styles from './CarritoPage.module.css'

function CarritoPage() {
  const {
    carrito,
    precioTotal,
    incrementarCantidad,
    decrementarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
  } = useCart()

  const finalizarCompra = async () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: 'Carrito vacío',
        text: 'No hay productos para comprar.',
        icon: 'info',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#2f8f63',
        background: '#0e2b1f',
        color: '#ecf8f1',
      })
      return
    }

    const result = await Swal.fire({
      title: '¿Finalizar compra?',
      text: 'Se descontará el stock de los productos comprados.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, comprar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#2f8f63',
      cancelButtonColor: '#d45b76',
      background: '#0e2b1f',
      color: '#ecf8f1',
    })

    if (!result.isConfirmed) return

    try {
      await descontarStockCompra(carrito)
      vaciarCarrito()

      Swal.fire({
        title: '¡Compra realizada!',
        text: 'Tu compra fue finalizada correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#2f8f63',
        background: '#0e2b1f',
        color: '#ecf8f1',
      })
    } catch (error) {
      Swal.fire({
        title: 'No se pudo completar la compra',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#d45b76',
        background: '#0e2b1f',
        color: '#ecf8f1',
      })
    }
  }

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
                  <p className={styles.texto}>Precio unitario: ${item.precio}</p>
                  <p className={styles.texto}>Stock disponible: {item.stock}</p>

                  <div className={styles.contador}>
                    <button
                      className={styles.botonCantidad}
                      onClick={() => decrementarCantidad(item.id)}
                    >
                      -
                    </button>

                    <span className={styles.cantidad}>{item.cantidad}</span>

                    <button
                      className={styles.botonCantidad}
                      onClick={() => incrementarCantidad(item.id)}
                      disabled={item.cantidad >= item.stock}
                    >
                      +
                    </button>
                  </div>

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

            <div className={styles.resumenBotones}>
              <button className={styles.vaciar} onClick={vaciarCarrito}>
                Vaciar carrito
              </button>

              <button className={styles.finalizar} onClick={finalizarCompra}>
                Finalizar compra
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default CarritoPage