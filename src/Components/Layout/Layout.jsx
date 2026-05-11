import Header from '../Header/Header'
import Nav from '../Nav/Nav'
import Footer from '../Footer/Footer'
import styles from './Layout.module.css'

function Layout({ children, carritoCantidad }) {
  return (
    <div className={styles.layout}>
      <Header />
      <Nav carritoCantidad={carritoCantidad} />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout