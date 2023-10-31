/* eslint-disable no-unused-vars */
import React from "react";
import { createContext, useContext, useState } from "react";
import api from "./api-client";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children, localStorage = window.localStorage }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser || null;
  });
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);

  const login = (data) => {
    setLoginError(null);
    const validateError = validateLoginData(data);
    if (validateError === "") {
      api
        .login(data)
        .then((res) => {
          const user = res.data.username;
          window.localStorage.setItem("user", user);
          setUser(user);
        })
        .catch((err) => {
          setLoginError(err.response.data);
        });
    } else {
      setLoginError(validateError);
    }
  };

  const register = (formData) => {
    setRegisterError(null);
    const validateError = validateRegisterData(formData);
    if (validateError === "") {
      api
        .createUser(formData)
        .then((res) => {
          const user = res.data.username;
          window.localStorage.setItem("user", user);
          setUser(user);
        })
        .catch((err) => {
          setRegisterError(err.response.data);
        });
    } else {
      setRegisterError(validateError);
    }
  };

  const associate = (formData) => {
    setRegisterError(null);
    const validateError = validateRegisterData(formData);
    if (validateError === "") {
      api
        .associateUser(formData)
        .then((res) => {
          const user = res.data.username;
          window.localStorage.setItem("user", user);
          setUser(user);
        })
        .catch((err) => {
          setRegisterError(err.response.data);
        });
    } else {
      setRegisterError(validateError);
    }
  };

  function validateRegisterData({
    username,
    password,
    email = "",
    image = "",
  }) {
    if (username === "" || password === "" || email === "" || image === "")
      return "Completar todos los campos";

    const regex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*(\.[a-z]{2,4})$/;
    if (!regex.test(email)) return "Email invalido";

    const minLength = 4;
    const maxLength = 12;
    if (password.length <= minLength) return "La contraseña es muy corta";
    else if (password.length > maxLength) {
      return "La contraseña es muy larga";
    }
    return "";
  }

  function validateLoginData({ username, password }) {
    if (username === "" || password === "") 
      return "Completar todos los campos"
    else
      return ""
  }

  const logout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loginError,
        registerError,
        register,
        associate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
