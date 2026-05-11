import styles from './FavoritosPage.module.css'

function FavoritosPage({ favoritos }) {
  return (
    <section className={styles.page}>
      <h2 className={styles.titulo}>Favoritos</h2>

      {favoritos.length === 0 ? (
        <p className={styles.vacio}>No tenés productos favoritos todavía.</p>
      ) : (
        <div className={styles.grid}>
          {favoritos.map((item) => (
            <article key={item.id} className={styles.card}>
              <img
                src={item.imagen}
                alt={item.nombre}
                className={styles.imagen}
              />
              <h3 className={styles.nombre}>{item.nombre}</h3>
              <p className={styles.descripcion}>{item.descripcion}</p>
              <p className={styles.precio}>${item.precio}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default FavoritosPage