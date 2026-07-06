import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/useAuth'
import styles from './LoginPage.module.css'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cargando, setCargando] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const manejarSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Completá email y contraseña')
      return
    }

    try {
      setCargando(true)
      await login(email, password)
      toast.success('Inicio de sesión exitoso')
      navigate('/')
    } catch (error) {
      toast.error('No se pudo iniciar sesión')
      console.error(error)
    } finally {
      setCargando(false)
    }
  }

  return (
    <section className={styles.page}>
      <Helmet>
        <title>Ingresar | Lara Craft</title>
        <meta name="description" content="Ingresá a tu cuenta en Lara Craft." />
      </Helmet>

      <div className={styles.card}>
        <h2 className={styles.titulo}>Iniciar sesión</h2>

        <form className={styles.form} onSubmit={manejarSubmit}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tuemail@mail.com"
          />

          <label className={styles.label}>Contraseña</label>
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />

          <button type="submit" className={styles.boton} disabled={cargando}>
            {cargando ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className={styles.texto}>
          ¿No tenés cuenta? <Link to="/register">Registrate</Link>
        </p>
      </div>
    </section>
  )
}

export default LoginPage