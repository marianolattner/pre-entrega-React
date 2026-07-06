import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import ItemList from '../ItemList/ItemList'
import SearchBar from '../SearchBar/SearchBar'
import Pagination from '../Pagination/Pagination'
import { getProducts } from '../../services/products'
import styles from './ItemListContainer.module.css'

function ItemListContainer({ mensaje, subtitulo }) {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 6

  useEffect(() => {
    async function cargarProductos() {
      try {
        const data = await getProducts()
        setProductos(data)
      } catch (err) {
        setError('Error al cargar los productos')
        console.error(err)
      } finally {
        setCargando(false)
      }
    }

    cargarProductos()
  }, [])

  const productosFiltrados = useMemo(() => {
    return productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [productos, searchTerm])

  const totalPages = Math.ceil(productosFiltrados.length / itemsPerPage)

  const productosPaginados = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return productosFiltrados.slice(start, end)
  }, [productosFiltrados, currentPage])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  return (
    <section className={styles.container}>
      <Helmet>
        <title>Lara Craft | Cuadernos y papelería</title>
        <meta
          name="description"
          content="Explorá cuadernos y productos de papelería en Lara Craft."
        />
      </Helmet>

      <h2 className={styles.titulo}>{mensaje}</h2>
      {subtitulo && <p className={styles.subtitulo}>{subtitulo}</p>}

      <SearchBar value={searchTerm} onChange={handleSearchChange} />

      {cargando && <p className={styles.mensaje}>Cargando productos...</p>}
      {error && <p className={styles.mensaje}>{error}</p>}

      {!cargando && !error && (
        <>
          {productosFiltrados.length === 0 ? (
            <p className={styles.mensaje}>No se encontraron productos.</p>
          ) : (
            <>
              <ItemList productos={productosPaginados} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </>
      )}
    </section>
  )
}

export default ItemListContainer