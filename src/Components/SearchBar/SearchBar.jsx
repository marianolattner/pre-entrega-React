import styles from './SearchBar.module.css'

function SearchBar({ value, onChange }) {
  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        className={styles.input}
        placeholder="Buscar productos..."
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default SearchBar