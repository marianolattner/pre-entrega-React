/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { createProduct, updateProduct } from '../../services/products'
import { uploadImageToImgBB } from '../../services/imageUpload'
import styles from './ProductForm.module.css'

function ProductForm({
  onProductCreated,
  initialData = null,
  isEditing = false,
  productId = null,
  onCancelar,
}) {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: '',
    categoria: '',
  })

  const [imagenFile, setImagenFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || '',
        precio: initialData.precio || '',
        descripcion: initialData.descripcion || '',
        imagen: initialData.imagen || '',
        categoria: initialData.categoria || '',
      })

      setPreviewUrl(initialData.imagen || '')
      setImagenFile(null)
    }
  }, [initialData])

  useEffect(() => {
    if (!imagenFile) return

    const objectUrl = URL.createObjectURL(imagenFile)
    setPreviewUrl(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [imagenFile])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Seleccioná un archivo de imagen válido')
      return
    }

    setImagenFile(file)
  }

  const resetForm = () => {
    setFormData({
      nombre: '',
      precio: '',
      descripcion: '',
      imagen: '',
      categoria: '',
    })
    setImagenFile(null)
    setPreviewUrl('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !formData.nombre ||
      !formData.precio ||
      !formData.descripcion ||
      !formData.categoria
    ) {
      toast.error('Completá todos los campos obligatorios')
      return
    }

    if (Number(formData.precio) <= 0) {
      toast.error('El precio debe ser mayor a 0')
      return
    }

    try {
      setCargando(true)

      let imageUrl = formData.imagen

      if (imagenFile) {
        imageUrl = await uploadImageToImgBB(imagenFile)
      }

      if (!imageUrl) {
        toast.error('Tenés que seleccionar una imagen')
        setCargando(false)
        return
      }

      const productoFinal = {
        nombre: formData.nombre,
        precio: Number(formData.precio),
        descripcion: formData.descripcion,
        categoria: formData.categoria,
        imagen: imageUrl,
      }

      if (isEditing && productId) {
        await updateProduct(productId, productoFinal)
        toast.success('Producto actualizado correctamente')
      } else {
        await createProduct(productoFinal)
        toast.success('Producto creado correctamente')
        resetForm()
      }

      onProductCreated()
    } catch (error) {
      toast.error(
        isEditing
          ? `No se pudo actualizar el producto: ${error.message}`
          : `No se pudo crear el producto: ${error.message}`
      )
      console.error(error)
    } finally {
      setCargando(false)
    }
  }

  const handleCancelar = () => {
    if (onCancelar) {
      onCancelar()
      return
    }

    if (isEditing && initialData) {
      setFormData({
        nombre: initialData.nombre || '',
        precio: initialData.precio || '',
        descripcion: initialData.descripcion || '',
        imagen: initialData.imagen || '',
        categoria: initialData.categoria || '',
      })
      setPreviewUrl(initialData.imagen || '')
      setImagenFile(null)
      return
    }

    resetForm()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <h3 className={styles.subtitulo}>
          {isEditing ? 'Editar producto' : 'Formulario de producto'}
        </h3>
        <p className={styles.helper}>
          {isEditing
            ? 'Modificá la información del producto'
            : 'Agregá un nuevo producto al catálogo'}
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.col}>
          <label className={styles.label}>Nombre del producto</label>
          <input
            className={styles.input}
            type="text"
            name="nombre"
            placeholder="Ej: Cuaderno Floral"
            value={formData.nombre}
            onChange={handleChange}
          />

          <label className={styles.label}>Precio</label>
          <input
            className={styles.input}
            type="number"
            name="precio"
            placeholder="Ej: 30000"
            value={formData.precio}
            onChange={handleChange}
          />

          <label className={styles.label}>Categoría</label>
          <input
            className={styles.input}
            type="text"
            name="categoria"
            placeholder="Ej: Cuadernos"
            value={formData.categoria}
            onChange={handleChange}
          />
        </div>

        <div className={styles.col}>
          <label className={styles.label}>Imagen del producto</label>

          <label className={styles.uploadBox}>
            <span>{imagenFile || previewUrl ? 'Cambiar imagen' : 'Seleccionar imagen'}</span>
            <input
              className={styles.hiddenInput}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>

          {previewUrl && (
            <img
              src={previewUrl}
              alt="Vista previa"
              className={styles.preview}
            />
          )}
        </div>
      </div>

      <label className={styles.label}>Descripción</label>
      <textarea
        className={styles.textarea}
        name="descripcion"
        placeholder="Descripción del producto"
        value={formData.descripcion}
        onChange={handleChange}
      />

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={handleCancelar}
        >
          Cancelar
        </button>

        <button className={styles.boton} type="submit" disabled={cargando}>
          {cargando
            ? isEditing
              ? 'Actualizando...'
              : 'Creando...'
            : isEditing
            ? 'Guardar cambios'
            : 'Guardar producto'}
        </button>
      </div>
    </form>
  )
}

export default ProductForm