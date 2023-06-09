import axios from "axios";

const server = axios.create({
  baseURL: 'http://localhost:3000/api'
});

const api = {
  getGame: () => server.get("/games"),
  createGame: (gameData) => server.post("/games", gameData),
  getGames: () => server.get("/games"),
  getPlayer: (id) => server.get(`/players/${id}`),
  createPlayer: (playerData) => server.post("/players", playerData),
  getPlayers: () => server.get("/players"),
  getUser: (id) => server.get(`/users/${id}`),
  createUser: (userData) => server.post("/users", userData),
  getUsers: () => server.get("/users"),
  editUser: (id, userData) => server.patch(`/users/${id}`, userData),
  deleteUser: (id) => server.delete(`/users/${id}`)
};

export default api;
