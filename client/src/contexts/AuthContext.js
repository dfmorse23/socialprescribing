import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
   const main = () => {

   }
   
   main()
  }, [])

  const value = {
    currentUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}