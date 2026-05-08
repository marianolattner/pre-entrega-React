import Item from '../Item/Item'
import styles from './ItemList.module.css'

function ItemList({ productos }) {
  return (
    <div className={styles.grid}>
      {productos.map((producto) => (
        <Item
          key={producto.id}
          nombre={producto.nombre}
          precio={producto.precio}
          descripcion={producto.descripcion}
          imagen={producto.imagen}
        />
      ))}
    </div>
  )
}

export default ItemList