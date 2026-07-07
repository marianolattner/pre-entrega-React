import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import ItemList from '../../Components/ItemList/ItemList'
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner'
import { getProducts } from '../../services/products'
import styles from './HomePage.module.css'

function HomePage() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function cargarDestacados() {
      try {
        const data = await getProducts()
        setProductos(data.slice(0, 2))
      } catch (err) {
        setError('No se pudieron cargar los productos destacados')
        console.error(err)
      } finally {
        setCargando(false)
      }
    }

    cargarDestacados()
  }, [])

  return (
    <section className={styles.home}>
      <Helmet>
        <title>Inicio | Lara Craft</title>
        <meta
          name="description"
          content="Bienvenida a Lara Craft. Descubrí cuadernos únicos, productos destacados y nuestro catálogo completo."
        />
      </Helmet>

      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>Papelería con estilo</span>
          <h1 className={styles.titulo}>Bienvenidos a Lara Craft</h1>
          <p className={styles.descripcion}>
            Descubrí cuadernos originales, diseños creativos y productos pensados
            para organizar tus ideas con personalidad.
          </p>

          <div className={styles.actions}>
            <Link to="/productos" className={styles.primaryButton}>
              Ver todos los productos
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.destacados}>
        <h2 className={styles.subtitulo}>Productos destacados</h2>

        {cargando && <LoadingSpinner mensaje="Cargando destacados..." />}
        {error && <p className={styles.mensaje}>{error}</p>}

        {!cargando && !error && <ItemList productos={productos} />}
      </div>
    </section>
  )
}

export default HomePage