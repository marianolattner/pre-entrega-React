import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ItemListContainer from './Components/ItemListContainer/ItemListContainer'
import CarritoPage from './Components/CarritoPage/CarritoPage'
import FavoritosPage from './Components/FavoritosPage/FavoritosPage'
import LoginPage from './Pages/LoginPage/LoginPage'
import RegisterPage from './Pages/RegisterPage/RegisterPage'
import AdminPage from './Pages/AdminPage/AdminPage'
import EditProductPage from './Pages/EditProductPage/EditProductPage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <ItemListContainer
              mensaje="Nuestros cuadernos"
              subtitulo="Descubrí diseños únicos para organizar tus ideas con estilo."
            />
          }
        />

        <Route
          path="/productos"
          element={
            <ItemListContainer
              mensaje="Nuestros cuadernos"
              subtitulo="Explorá toda nuestra colección."
            />
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/favoritos"
          element={
            <ProtectedRoute>
              <FavoritosPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/carrito"
          element={
            <ProtectedRoute>
              <CarritoPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/editar/:id"
          element={
            <ProtectedRoute>
              <EditProductPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  )
}

export default App