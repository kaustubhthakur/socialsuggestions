import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [query, setQuery] = useState();
  const [profile, setProfile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let token = localStorage.getItem("jwt");
        console.log(token);
        if (token) {
          const { data } = await axios.get(
            "http://localhost:9000/users/profile",
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(data.user);
          setProfile(data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchQuery = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:9000/queries",
          { withCredentials: true }
        );
        console.log(data);
        setQuery(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuery();
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        query,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
