/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react'

export const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favoritos, setFavoritos] = useState([])

  const toggleFavorito = (producto) => {
    setFavoritos((prev) => {
      const existe = prev.some((item) => item.id === producto.id)

      if (existe) {
        return prev.filter((item) => item.id !== producto.id)
      }

      return [...prev, producto]
    })
  }

  const esFavorito = (id) => {
    return favoritos.some((item) => item.id === id)
  }

  return (
    <FavoritesContext.Provider value={{ favoritos, toggleFavorito, esFavorito }}>
      {children}
    </FavoritesContext.Provider>
  )
}