import { useState } from "react";
import api from "./api-client";

// eslint-disable-next-line react/prop-types
const useAuth = () => {
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
          if (selectedUser.password === data.password) {
            window.localStorage.setItem("user", selectedUser.username);
            setUser(selectedUser.username);
            window.location.reload();
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

  return { user, login, logout, error, register }

}

export default useAuth;