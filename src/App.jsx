import './App.css'
import Layout from './Components/Layout/Layout'
import ItemListContainer from './Components/ItemListContainer/ItemListContainer'

function App() {
  return (
    <Layout>
      <ItemListContainer mensaje="Nuestros cuadernos" />
    </Layout>
  )
}

export default App