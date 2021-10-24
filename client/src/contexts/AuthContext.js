import React, { useContext, useState, useEffect } from "react";
import app from '../firebase'

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  GoogleAuthProvider,
  signInWithPopup,
  browserSessionPersistence,
  sendPasswordResetEmail,
} from "firebase/auth";

const AuthContext = React.createContext()
const provider = new GoogleAuthProvider();
const auth = getAuth(app)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  async function login(email, password, rememberMe) {
    await setUserPersistance(rememberMe)

    return signInWithEmailAndPassword(auth, email, password);
  }

  async function googleOAuth(rememberMe) {
    await setUserPersistance(rememberMe)

    return signInWithPopup(auth, provider)
  }

  async function setUserPersistance(rememberMe) {
    // Firebase sets default persistance to remember users (inMemoryPersistence)
    // So if the user doesnt want to be remembered we change persistance to (browserSessionPersistence)
    if (!rememberMe) {
      await setPersistence(auth, browserSessionPersistence)
    }
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  function signout() {
    auth.signOut()
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    signout,
    googleOAuth,
    resetPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}