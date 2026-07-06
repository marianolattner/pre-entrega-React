/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react'

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([])

  const agregarAlCarrito = (producto, cantidad) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id)

      if (existente) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        )
      }

      return [...prev, { ...producto, cantidad }]
    })
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