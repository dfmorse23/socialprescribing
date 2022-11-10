import React, { useContext, useState, useEffect } from "react";
import Loading from "../components/Loading";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {!loading && children ? children : <Loading />}
    </AuthContext.Provider>
  );
};
export { AuthProvider, AuthContext };
