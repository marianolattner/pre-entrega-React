import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import CarritoPage from './Components/CarritoPage/CarritoPage'
import FavoritosPage from './Components/FavoritosPage/FavoritosPage'
import ItemListContainer from './Components/ItemListContainer/ItemListContainer'
import LoginPage from './Pages/LoginPage/LoginPage'
import RegisterPage from './Pages/RegisterPage/RegisterPage'
import AdminPage from './Pages/AdminPage/AdminPage'
import EditProductPage from './Pages/EditProductPage/EditProductPage'
import HomePage from './Pages/HomePage/HomePage'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />

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
            <ProtectedRoute adminOnly={true}>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/editar/:id"
          element={
            <ProtectedRoute adminOnly={true}>
              <EditProductPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  )
}

export default App