import { useEffect, useState } from 'react'
import ItemList from '../ItemList/ItemList'
import styles from './ItemListContainer.module.css'

function ItemListContainer({
  mensaje,
  subtitulo,
  agregarAlCarrito,
  favoritos,
  toggleFavorito
}) {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/data/productos.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error al cargar los productos')
        }
        return res.json()
      })
      .then((data) => {
        setProductos(data)
        setCargando(false)
      })
      .catch((err) => {
        setError(err.message)
        setCargando(false)
      })
  }, [])

  return (
    <section className={styles.container}>
      <h2 className={styles.titulo}>{mensaje}</h2>
      {subtitulo && <p className={styles.subtitulo}>{subtitulo}</p>}

      {cargando && <p className={styles.mensaje}>Cargando productos...</p>}
      {error && <p className={styles.mensaje}>Error: {error}</p>}

      {!cargando && !error && (
        <ItemList
          productos={productos}
          agregarAlCarrito={agregarAlCarrito}
          favoritos={favoritos}
          toggleFavorito={toggleFavorito}
        />
      )}
    </section>
  )
}

export default ItemListContainer