import { useState } from 'react'
import Swal from 'sweetalert2'
import styles from './Item.module.css'

function Item({ nombre, precio, descripcion, imagen }) {
  const [cantidad, setCantidad] = useState(0)
  const [esFavorito, setEsFavorito] = useState(false)

  const incrementar = () => {
    setCantidad(cantidad + 1)
  }

  const decrementar = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1)
    }
  }

  const toggleFavorito = () => {
    setEsFavorito(!esFavorito)
  }

  const agregarAlCarrito = () => {
    if (cantidad === 0) {
      Swal.fire({
        title: 'Cantidad inválida',
        text: 'Primero seleccioná al menos una unidad.',
        icon: 'warning',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#2f5d50',
        background: '#f7f4ed',
        color: '#2e2e2e',
      })
      return
    }

    Swal.fire({
      title: 'Producto agregado',
      text: `Agregaste ${cantidad} unidad/es de ${nombre} al carrito.`,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#2f5d50',
      background: '#f7f4ed',
      color: '#2e2e2e',
    })

    setCantidad(0)
  }

  return (
    <article className={styles.card}>
      <div className={styles.imagenWrapper}>
        <img src={imagen} alt={nombre} className={styles.imagen} />
        <button
          className={styles.favorito}
          onClick={toggleFavorito}
          aria-label="Marcar como favorito"
        >
          {esFavorito ? '❤️' : '🤍'}
        </button>
      </div>

      <div className={styles.contenido}>
        <h3 className={styles.nombre}>{nombre}</h3>
        <p className={styles.descripcion}>{descripcion}</p>
      </div>

      <div className={styles.acciones}>
        <p className={styles.precio}>${precio}</p>

        <div className={styles.contador}>
          <button className={styles.botonCantidad} onClick={decrementar}>
            -
          </button>
          <span className={styles.cantidad}>{cantidad}</span>
          <button className={styles.botonCantidad} onClick={incrementar}>
            +
          </button>
        </div>

        <button className={styles.boton} onClick={agregarAlCarrito}>
          Agregar al carrito
        </button>
      </div>
    </article>
  )
}

export default Item