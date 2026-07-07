import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { getProducts, deleteProduct } from '../../services/products'
import ProductForm from '../../Components/ProductForm/ProductForm'
import styles from './AdminPage.module.css'
import { Helmet } from 'react-helmet-async'
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner'

function AdminPage() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const navigate = useNavigate()

  const cargarProductos = () => {
    setCargando(true)

    getProducts()
      .then((data) => {
        setProductos(data)
      })
      .catch((error) => {
        toast.error('No se pudieron cargar los productos')
        console.error(error)
      })
      .finally(() => {
        setCargando(false)
      })
  }

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProductos(data)
      })
      .catch((error) => {
        toast.error('No se pudieron cargar los productos')
        console.error(error)
      })
      .finally(() => {
        setCargando(false)
      })
  }, [])

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar producto?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d45b76',
      cancelButtonColor: '#2f8f63',
      background: '#0e2b1f',
      color: '#ecf8f1',
    })

    if (!result.isConfirmed) return

    try {
      await deleteProduct(id)
      toast.success('Producto eliminado')
      cargarProductos()
    } catch (error) {
      toast.error('No se pudo eliminar el producto')
      console.error(error)
    }
  }

  return (
    
    <section className={styles.page}>
        <Helmet>
  <title>Gestión de productos | Lara Craft</title>
  <meta
    name="description"
    content="Panel de administración de productos de Lara Craft."
  />
</Helmet>
      <h2 className={styles.titulo}>Administración de productos</h2>

      <ProductForm
        onProductCreated={cargarProductos}
        onCancelar={() => navigate(-1)}
      />

      <div className={styles.listado}>
        <h3 className={styles.subtitulo}>Productos cargados</h3>

        {cargando ? (
  <LoadingSpinner mensaje="Cargando productos..." />
) : (
          <div className={styles.grid}>
            {productos.map((producto) => (
              <article key={producto.id} className={styles.card}>
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className={styles.imagen}
                />

                <div className={styles.info}>
                  <h4 className={styles.nombre}>{producto.nombre}</h4>
                  <p className={styles.texto}>{producto.descripcion}</p>
                </div>

                <div className={styles.infoSecundaria}>
  <p className={styles.texto}>{producto.categoria}</p>
  <p className={styles.texto}>Stock: {producto.stock ?? 'No cargado'}</p>
</div>

                <p className={styles.precio}>${producto.precio}</p>

                <div className={styles.acciones}>
                  <Link
                    to={`/admin/editar/${producto.id}`}
                    className={styles.editar}
                  >
                    Editar
                  </Link>

                  <button
                    className={styles.eliminar}
                    onClick={() => handleDelete(producto.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default AdminPage