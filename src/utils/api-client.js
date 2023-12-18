import axios from "axios";


const server = axios.create({
  // baseURL: "http://localhost:8080",
  // baseURL: "http://localhost:3000/api",
  // baseURL: "https://altisima-scoreboard.onrender.com/api",
  baseURL: "https://altisima-spring-backend.onrender.com",
});

const setAuthToken = (token) => {
  if (token) {
    server.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete server.defaults.headers.common["Authorization"];
  }
};

const api = {
  getGames: () => server.get("/games"),
  getPlayer: (username) => server.get(`/players/${username}`),
  getPlayers: () => server.get("/players"),
  getUnregisteredPlayers: () => server.get("/v1/players"),
  login: (data) => server.post("/users/login", data),
  createUser: (userData) => server.post("/v1/users", userData),
  getUsers: () => server.get("/users"),
  editUser: (username, userData) => server.put(`/users/${username}`, userData),
  deleteUser: (username) => server.delete(`/users/${username}`),
  getAchievements: () => server.get("/achievements"),
  authenticatedRequest: async (url, method, data, token) => {
    setAuthToken(token);
    try {
      const response = await server.request({
        url,
        method,
        data,
      });
      return response.data;
    } catch (e) {
      return e;
    }
  },
};

export default api;
