import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Layout from './Components/Layout/Layout'
import ItemListContainer from './Components/ItemListContainer/ItemListContainer'
import CarritoPage from './Components/CarritoPage/CarritoPage'
import FavoritosPage from './Components/FavoritosPage/FavoritosPage'

function App() {
  const [carrito, setCarrito] = useState([])
  const [favoritos, setFavoritos] = useState([])

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

  const toggleFavorito = (producto) => {
    setFavoritos((prev) => {
      const yaExiste = prev.some((item) => item.id === producto.id)

      if (yaExiste) {
        return prev.filter((item) => item.id !== producto.id)
      }

      return [...prev, producto]
    })
  }

  return (
    <Layout carritoCantidad={carrito.length}>
      <Routes>
        <Route
          path="/"
          element={
            <ItemListContainer
              mensaje="Nuestros cuadernos"
              subtitulo="Descubrí diseños únicos para organizar tus ideas con estilo."
              agregarAlCarrito={agregarAlCarrito}
              favoritos={favoritos}
              toggleFavorito={toggleFavorito}
            />
          }
        />

        <Route
          path="/productos"
          element={
            <ItemListContainer
              mensaje="Nuestros cuadernos"
              subtitulo="Explorá toda nuestra colección."
              agregarAlCarrito={agregarAlCarrito}
              favoritos={favoritos}
              toggleFavorito={toggleFavorito}
            />
          }
        />

        <Route
          path="/carrito"
          element={<CarritoPage carrito={carrito} />}
        />

        <Route
          path="/favoritos"
          element={<FavoritosPage favoritos={favoritos} />}
        />
      </Routes>
    </Layout>
  )
}

export default App