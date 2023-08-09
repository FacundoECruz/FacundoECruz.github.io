import { createContext, useState } from "react";
import api from "./api-client";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = window.localStorage.getItem("user");
    return storedUser || null;
  });
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);

  function handleUserResponse(data) {
    const user = data.data.username;
    window.localStorage.setItem("user", user);
    setUser(user);
    return user;
  }

  const login = (data) => {
    api
      .login(data)
      .then(handleUserResponse)
      .catch((err) => setLoginError(err.response.data.message));
  };

  const logout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  const register = (formData) => {
    api
      .createUser(formData)
      .then(handleUserResponse)
      .catch((err) => setRegisterError(err.response.data.message));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loginError, registerError, register }}>
      {children}
    </AuthContext.Provider>
  );
}
