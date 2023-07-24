import { createContext, useState } from "react";
import api from "./api-client";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = window.localStorage.getItem("user");
    return storedUser || null;
  });
  const [error, setError] = useState(null);

  const login = (data) => {
    api
      .getUsers()
      .then((allUsers) => {
        const selectedUser = allUsers.data.find(
          (el) => el.username === data.username
        );
        if (!selectedUser) {
          setError("Invalid Username or Password");
        } else {
          if (selectedUser.password === data.get("password")) {
            window.localStorage.setItem("user", selectedUser.username);
            setUser(selectedUser.username);
          } else {
            setError("Invalid Username or Password");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    window.localStorage.removeItem("user");
    setUser(null);
  };

  const register = (formData) => {
    api
      .createUser(formData)
      .then(() => {
        window.localStorage.setItem("user", formData.username);
        setUser(formData.username);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error, register }}>
      {children}
    </AuthContext.Provider>
  );
}
