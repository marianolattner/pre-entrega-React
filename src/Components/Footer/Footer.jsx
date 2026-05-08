import { useEffect, useState } from 'react'
import PersonaCard from '../PersonaCard/PersonaCard'
import styles from './Footer.module.css'

function Footer() {
  const [equipo, setEquipo] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/data/nosotros.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('No se pudo cargar el equipo')
        }
        return res.json()
      })
      .then((data) => {
        setEquipo(data)
        setCargando(false)
      })
      .catch((err) => {
        setError(err.message)
        setCargando(false)
      })
  }, [])

  return (
    <footer className={styles.footer}>
      <div className={styles.info}>
        <h2 className={styles.titulo}>Lara Craft</h2>
        <p className={styles.descripcion}>
          Tienda online de cuadernos pensados para inspirar, organizar y acompañar cada idea.
        </p>
      </div>

      {cargando && <p className={styles.mensaje}>Cargando equipo...</p>}
      {error && <p className={styles.mensaje}>Error: {error}</p>}

      {!cargando && !error && (
        <div className={styles.equipo}>
          {equipo.map((persona) => (
            <PersonaCard
              key={persona.id}
              foto={persona.foto}
              nombre={persona.nombre}
              puesto={persona.puesto}
              email={persona.email}
            />
          ))}
        </div>
      )}

      <p className={styles.copy}>© 2026 Lara Craft - Todos los derechos reservados</p>
    </footer>
  )
}

export default Footer