/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
import { createContext, useEffect, useState } from 'react'
import { useAuth } from './useAuth'

export const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const { user } = useAuth()
  const [favoritos, setFavoritos] = useState([])

  const storageKey = user ? `favoritos_${user.uid}` : null

  useEffect(() => {
    if (!user || !storageKey) {
      setFavoritos([])
      return
    }

    const favoritosGuardados = localStorage.getItem(storageKey)

    if (favoritosGuardados) {
      setFavoritos(JSON.parse(favoritosGuardados))
    } else {
      setFavoritos([])
    }
  }, [user, storageKey])

  useEffect(() => {
    if (!user || !storageKey) return
    localStorage.setItem(storageKey, JSON.stringify(favoritos))
  }, [favoritos, user, storageKey])

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
    <FavoritesContext.Provider
      value={{ favoritos, toggleFavorito, esFavorito }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}