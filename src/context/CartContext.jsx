/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useEffect, useState } from 'react'
import { useAuth } from './useAuth'

export const CartContext = createContext()

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [carrito, setCarrito] = useState([])

  const storageKey = user ? `carrito_${user.uid}` : null

  useEffect(() => {
    if (!user || !storageKey) {
      setCarrito([])
      return
    }

    const carritoGuardado = localStorage.getItem(storageKey)

    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado))
    } else {
      setCarrito([])
    }
  }, [user, storageKey])

  useEffect(() => {
    if (!user || !storageKey) return
    localStorage.setItem(storageKey, JSON.stringify(carrito))
  }, [carrito, user, storageKey])

  const agregarAlCarrito = (producto, cantidad) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id)

      if (existente) {
        return prev.map((item) => {
          if (item.id !== producto.id) return item

          const nuevaCantidad = item.cantidad + cantidad
          const cantidadFinal = Math.min(nuevaCantidad, producto.stock ?? nuevaCantidad)

          return {
            ...item,
            cantidad: cantidadFinal,
          }
        })
      }

      return [
        ...prev,
        {
          ...producto,
          cantidad: Math.min(cantidad, producto.stock ?? cantidad),
        },
      ]
    })
  }

  const incrementarCantidad = (id) => {
    setCarrito((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item
        if (item.cantidad >= item.stock) return item

        return {
          ...item,
          cantidad: item.cantidad + 1,
        }
      })
    )
  }

  const decrementarCantidad = (id) => {
    setCarrito((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item

          return {
            ...item,
            cantidad: item.cantidad - 1,
          }
        })
        .filter((item) => item.cantidad > 0)
    )
  }

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id))
  }

  const vaciarCarrito = () => {
    setCarrito([])
  }

  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)

  const precioTotal = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  )

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        incrementarCantidad,
        decrementarCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        cantidadTotal,
        precioTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}