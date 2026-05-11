import Item from '../Item/Item'
import styles from './ItemList.module.css'

function ItemList({ productos, agregarAlCarrito, favoritos, toggleFavorito }) {
  return (
    <div className={styles.grid}>
      {productos.map((producto) => (
        <Item
          key={producto.id}
          producto={producto}
          agregarAlCarrito={agregarAlCarrito}
          favoritos={favoritos}
          toggleFavorito={toggleFavorito}
        />
      ))}
    </div>
  )
}

export default ItemList