import { useState } from 'react'
import Swal from 'sweetalert2'
import ProductoModal from '../ProductoModal/ProductoModal'
import { useCart } from '../../context/useCart'
import { useFavorites } from '../../context/useFavorites'
import styles from './Item.module.css'

function Item({ producto }) {
  const [cantidad, setCantidad] = useState(0)
  const [modalAbierto, setModalAbierto] = useState(false)

  const { carrito, agregarAlCarrito } = useCart()
  const { toggleFavorito, esFavorito } = useFavorites()

  const productoEnCarrito = carrito.find((item) => item.id === producto.id)
  const cantidadEnCarrito = productoEnCarrito ? productoEnCarrito.cantidad : 0
  const stockDisponible = Math.max((producto.stock ?? 0) - cantidadEnCarrito, 0)

  const incrementar = () => {
    if (cantidad >= stockDisponible) {
      Swal.fire({
        title: 'Stock máximo alcanzado',
        text: `Ya tenés ${cantidadEnCarrito} en el carrito y solo quedan ${stockDisponible} unidad/es disponibles para agregar.`,
        icon: 'info',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#2f8f63',
        background: '#0e2b1f',
        color: '#ecf8f1',
      })
      return
    }

    setCantidad(cantidad + 1)
  }

  const decrementar = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1)
    }
  }

  const manejarAgregarAlCarrito = () => {
    if (cantidad === 0) {
      Swal.fire({
        title: 'Cantidad inválida',
        text: 'Primero seleccioná al menos una unidad.',
        icon: 'warning',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#2f8f63',
        background: '#0e2b1f',
        color: '#ecf8f1',
      })
      return
    }

    if (cantidad > stockDisponible) {
      Swal.fire({
        title: 'Stock insuficiente',
        text: `Ya tenés ${cantidadEnCarrito} en el carrito. Solo podés agregar ${stockDisponible} unidad/es más.`,
        icon: 'warning',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#2f8f63',
        background: '#0e2b1f',
        color: '#ecf8f1',
      })
      return
    }

    agregarAlCarrito(producto, cantidad)

    Swal.fire({
      title: 'Producto agregado',
      text: `Agregaste ${cantidad} unidad/es de ${producto.nombre} al carrito.`,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#2f8f63',
      background: '#0e2b1f',
      color: '#ecf8f1',
    })

    setCantidad(0)
  }

  return (
    <>
      <article className={styles.card}>
        <div className={styles.imagenWrapper}>
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className={styles.imagen}
            onClick={() => setModalAbierto(true)}
          />

          <button
            className={styles.favorito}
            onClick={() => toggleFavorito(producto)}
            aria-label="Marcar como favorito"
          >
            {esFavorito(producto.id) ? '❤️' : '🤍'}
          </button>
        </div>

        <div className={styles.contenido}>
          <h3 className={styles.nombre}>{producto.nombre}</h3>
          <p className={styles.descripcion}>{producto.descripcion}</p>

          <div className={styles.meta}>
            <span className={styles.badge}>{producto.categoria || 'Sin categoría'}</span>
            <span className={styles.stock}>
              Stock total: {producto.stock ?? 'No cargado'}
            </span>
            <span className={styles.stockDisponible}>
              Disponible para agregar: {stockDisponible}
            </span>
          </div>
        </div>

        <div className={styles.acciones}>
          <p className={styles.precio}>${producto.precio}</p>

          <div className={styles.contador}>
            <button className={styles.botonCantidad} onClick={decrementar}>
              -
            </button>
            <span className={styles.cantidad}>{cantidad}</span>
            <button
              className={styles.botonCantidad}
              onClick={incrementar}
              disabled={stockDisponible === 0}
            >
              +
            </button>
          </div>

          <button
            className={styles.boton}
            onClick={manejarAgregarAlCarrito}
            disabled={stockDisponible === 0}
          >
            {stockDisponible === 0 ? 'Sin stock disponible' : 'Agregar al carrito'}
          </button>
        </div>
      </article>

      {modalAbierto && (
        <ProductoModal
          producto={producto}
          onClose={() => setModalAbierto(false)}
        />
      )}
    </>
  )
}

export default Item