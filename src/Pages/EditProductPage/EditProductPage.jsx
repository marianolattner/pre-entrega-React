import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ProductForm from '../../Components/ProductForm/ProductForm'
import { getProductById } from '../../services/products'
import styles from './EditProductPage.module.css'
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner'

function EditProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [producto, setProducto] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function cargarProducto() {
      try {
        const data = await getProductById(id)
        setProducto(data)
      } catch (error) {
        toast.error('No se pudo cargar el producto')
        console.error(error)
      } finally {
        setCargando(false)
      }
    }

    cargarProducto()
  }, [id])

  const handleUpdated = () => {
    navigate('/admin')
  }

  if (cargando) {
  return <LoadingSpinner mensaje="Cargando producto..." />
}

  if (!producto) {
    return <p>No se encontró el producto.</p>
  }

  return (
    <section className={styles.page}>
      <h2 className={styles.titulo}>Editar producto</h2>

      <ProductForm
        initialData={producto}
        isEditing={true}
        productId={producto.id}
        onProductCreated={handleUpdated}
        onCancelar={() => navigate('/admin')}
      />
    </section>
  )
}

export default EditProductPage