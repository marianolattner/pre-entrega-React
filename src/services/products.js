import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from './firebase'

const productsRef = collection(db, 'productos')

export async function getProducts() {
  const snapshot = await getDocs(productsRef)

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }))
}

export async function createProduct(producto) {
  await addDoc(productsRef, producto)
}

export async function deleteProduct(id) {
  const productRef = doc(db, 'productos', id)
  await deleteDoc(productRef)
}

export async function getProductById(id) {
  const productRef = doc(db, 'productos', id)
  const snapshot = await getDoc(productRef)

  if (!snapshot.exists()) {
    throw new Error('Producto no encontrado')
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  }
}

export async function updateProduct(id, productoActualizado) {
  const productRef = doc(db, 'productos', id)
  await updateDoc(productRef, productoActualizado)
}

export async function descontarStockCompra(carrito) {
  for (const item of carrito) {
    const productoActual = await getProductById(item.id)

    const stockActual = Number(productoActual.stock ?? 0)

    if (stockActual < item.cantidad) {
      throw new Error(
        `No hay stock suficiente de ${productoActual.nombre}. Stock actual: ${stockActual}`
      )
    }

    await updateProduct(item.id, {
      stock: stockActual - item.cantidad,
    })
  }
}