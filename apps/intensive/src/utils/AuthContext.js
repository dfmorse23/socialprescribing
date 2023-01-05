import React, { useState, useEffect, createContext } from "react";
import { useQuery } from "react-query";
import { checkAuth } from "../api";
import Loading from "../components/Loading";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data, status } = useQuery("session", checkAuth);

  useEffect(() => {
    if (status === "success") {
      setUser(data.user);
      setLoading(false);
    } else if (status === "error") {
      setLoading(false);
    }
  }, [status, data]);


  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children ? children : <Loading />}
    </AuthContext.Provider>
  );
};
export { AuthProvider, AuthContext };
