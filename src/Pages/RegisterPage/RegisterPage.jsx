import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/useAuth'
import styles from './RegisterPage.module.css'

function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [cargando, setCargando] = useState(false)

  const { register } = useAuth()
  const navigate = useNavigate()

  const manejarSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password || !confirmPassword) {
      toast.error('Completá todos los campos')
      return
    }

    if (password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden')
      return
    }

    try {
      setCargando(true)
      await register(email, password)
      toast.success('Registro exitoso')
      navigate('/')
    } catch (error) {
      toast.error('No se pudo registrar la cuenta')
      console.error(error)
    } finally {
      setCargando(false)
    }
  }

  return (
    <section className={styles.page}>
      <Helmet>
        <title>Registro | Lara Craft</title>
        <meta name="description" content="Creá tu cuenta en Lara Craft." />
      </Helmet>

      <div className={styles.card}>
        <h2 className={styles.titulo}>Crear cuenta</h2>

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

          <label className={styles.label}>Confirmar contraseña</label>
          <input
            type="password"
            className={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="********"
          />

          <button type="submit" className={styles.boton} disabled={cargando}>
            {cargando ? 'Registrando...' : 'Registrarme'}
          </button>
        </form>

        <p className={styles.texto}>
          ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
        </p>
      </div>
    </section>
  )
}

export default RegisterPage