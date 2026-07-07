/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '../services/firebase'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)

      if (currentUser) {
        try {
          const userRef = doc(db, 'usuarios', currentUser.uid)
          const userSnap = await getDoc(userRef)

          if (userSnap.exists()) {
            setUserData(userSnap.data())
          } else {
            setUserData({ role: 'user', email: currentUser.email })
          }
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error)
          setUserData(null)
        }
      } else {
        setUserData(null)
      }

      setLoadingAuth(false)
    })

    return () => unsubscribe()
  }, [])

  const register = async (email, password) => {
    const credenciales = await createUserWithEmailAndPassword(auth, email, password)

    await setDoc(doc(db, 'usuarios', credenciales.user.uid), {
      email,
      role: 'user',
      createdAt: new Date().toISOString(),
    })

    return credenciales
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  const isAdmin = userData?.role === 'admin'

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        isAdmin,
        loadingAuth,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}