import styles from './LoadingSpinner.module.css'

function LoadingSpinner({ mensaje = 'Cargando...' }) {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.cuaderno}>
        <div className={styles.espiral}></div>
        <div className={styles.tapa}></div>
      </div>
      <p className={styles.mensaje}>{mensaje}</p>
    </div>
  )
}

export default LoadingSpinner