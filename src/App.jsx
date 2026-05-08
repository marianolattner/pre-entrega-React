import './App.css'
import Layout from './Components/Layout/Layout'
import ItemListContainer from './Components/ItemListContainer/ItemListContainer'

function App() {
  return (
    <Layout>
      <ItemListContainer
        mensaje="Nuestros cuadernos"
        subtitulo="Descubrí diseños únicos para organizar tus ideas con estilo."
      />
    </Layout>
  )
}

export default App