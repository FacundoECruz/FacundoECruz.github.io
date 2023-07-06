import axios from "axios";

const server = axios.create({
  baseURL: 'http://localhost:3000/api'
});

const api = {
  getGame: () => server.get("/games"),
  createGame: (players) => server.post("/games", players),
  getGames: () => server.get("/games"),
  getPlayer: (username) => server.get(`/players/${username}`),
  createPlayer: (playerData) => server.post("/players", playerData),
  getPlayers: () => server.get("/players"),
  getUser: (id) => server.get(`/users/${id}`),
  createUser: (userData) => server.post("/users", userData),
  getUsers: () => server.get("/users"),
  editUser: (id, userData) => server.patch(`/users/${id}`, userData),
  deleteUser: (id) => server.delete(`/users/${id}`),
  nextRound: (playersRound, gameId) => server.patch("/games/next", {playersRound: playersRound, gameId: gameId,}),
  prevRound: (currentRound, gameId) => server.post("/games/prev", {currentRound: currentRound, gameId: gameId,}),
  finishGame: (playersRound, gameId, user) => server.patch("/games/finish", {playersRound: playersRound, gameId: gameId, user: user,})
};

export default api;
