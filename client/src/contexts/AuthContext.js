import React, { useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from '../firebase'

const AuthContext = React.createContext()
const auth = getAuth(app)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()

  function signup(email, password) {
    console.log('signup')
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    console.log('login')
    return signInWithEmailAndPassword(auth, email, password)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      console.log(user)
      setCurrentUser(user)
    })

    return unsubscribe
  }, [])



  const value = {
    currentUser,
    signup,
    login
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}