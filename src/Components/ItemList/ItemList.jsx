import Item from '../Item/Item'
import styles from './ItemList.module.css'

function ItemList({ productos }) {
  return (
    <div className={styles.grid}>
      {productos.map((producto) => (
        <Item key={producto.id} producto={producto} />
      ))}
    </div>
  )
}

export default ItemList