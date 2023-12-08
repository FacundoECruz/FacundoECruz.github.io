/* eslint-disable no-unused-vars */
import React from "react";
import { createContext, useContext, useState } from "react";
import api from "./api-client";
import Swal from "sweetalert2";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children, localStorage = window.localStorage }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser || null;
  });
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);

  const login = async (data) => {
    setLoginError(null);
    const validateError = validateLoginData(data);
    if (validateError === "") {
      api
        .login(data)
        .then((res) => {
          window.localStorage.setItem("token", res.data.token);
          window.localStorage.setItem("user", data.username);
          setUser(data.username);
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
          Swal.fire({
            position: "top-end",
            icon: "success",
            text: "Registrado correctamente",
            showConfirmButton: false,
            timer: 1500,
            width: "50%",
          });
          window.localStorage.setItem("token", res.data.token);
          window.localStorage.setItem("user", formData.username);
          setUser(formData.username);
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
    const token = window.localStorage.getItem("token")
    const validateError = validateRegisterData(formData);
    if (validateError === "") {
      api
        .acuthenticatedRequest("/v1/users/associate", "POST", formData, token)
        .then((res) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            text: "Asociado correctamente",
            showConfirmButton: false,
            timer: 1500,
            width: "50%",
          });
          window.localStorage.setItem("user", res.data.token);
          setUser(formData.username);
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
    if (username === "" || password === "") return "Completar todos los campos";
    else return "";
  }

  const logout = () => {
    Swal.fire({
      text: "Nos vemo!",
      imageUrl:
        "https://res.cloudinary.com/dfknsvqer/image/upload/v1698851914/altisima/diegote_o4bxs8.jpg",
      imageWidth: 150,
      imageHeight: 150,
      imageAlt: "bye bye image",
      width: "50%",
      timer: 1000,
      showConfirmButton: false,
    });
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");
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
