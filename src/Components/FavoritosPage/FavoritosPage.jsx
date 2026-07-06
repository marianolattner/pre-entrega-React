import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { useFavorites } from '../../context/useFavorites'
import ProductoModal from '../../Components/ProductoModal/ProductoModal'
import styles from './FavoritosPage.module.css'

function FavoritosPage() {
  const { favoritos, toggleFavorito, esFavorito } = useFavorites()
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)

  return (
    <section className={styles.page}>
      <Helmet>
        <title>Favoritos | Lara Craft</title>
        <meta name="description" content="Tus productos favoritos en Lara Craft." />
      </Helmet>

      <h2 className={styles.titulo}>Favoritos</h2>

      {favoritos.length === 0 ? (
        <p className={styles.vacio}>No tenés productos favoritos todavía.</p>
      ) : (
        <div className={styles.grid}>
          {favoritos.map((item) => (
            <article key={item.id} className={styles.card}>
              <div className={styles.imagenWrapper}>
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className={styles.imagen}
                  onClick={() => setProductoSeleccionado(item)}
                />

                <button
                  className={styles.favorito}
                  onClick={() => toggleFavorito(item)}
                  aria-label="Quitar de favoritos"
                >
                  {esFavorito(item.id) ? '❤️' : '🤍'}
                </button>
              </div>

              <h3 className={styles.nombre}>{item.nombre}</h3>
              <p className={styles.descripcion}>{item.descripcion}</p>
              <p className={styles.precio}>${item.precio}</p>
            </article>
          ))}
        </div>
      )}

      {productoSeleccionado && (
        <ProductoModal
          producto={productoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
        />
      )}
    </section>
  )
}

export default FavoritosPage