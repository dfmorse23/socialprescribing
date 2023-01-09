import React, { useContext, useState, useEffect } from "react";
import app from '../firebase'

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
} from "firebase/auth";

const AuthContext = React.createContext()
const auth = getAuth(app)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, ] = useState()
  const [loading, ] = useState(true)

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  async function login(email, password, rememberMe) {
    await setUserPersistance(rememberMe)

    return signInWithEmailAndPassword(auth, email, password);
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
   const main = () => {

   }
   
   main()
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    signout,
    resetPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}