/* eslint-disable no-unused-vars */
import React from "react";
import { createContext, useContext, useState } from "react";
import api from "./api-client";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = window.localStorage.getItem("user");
    return storedUser || null;
  });
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);

  const login = (data) => {
    setLoginError(null);
    api
      .login(data)
      .then((res) => {
        const user = res.data.username;
        window.localStorage.setItem("user", user);
        setUser(user);
      })
      .catch((err) => setLoginError(err.response.data.message));
  };

  const register = (formData) => {
    setRegisterError(null);
    api
      .createUser(formData)
      .then((res) => {
        console.log(res.data.username);
        const user = res.data.username;
        window.localStorage.setItem("user", user);
        setUser(user);
      })
      .catch((err) => {
        setRegisterError(err.response.data.error);
      });
  };

  const logout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loginError, registerError, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
