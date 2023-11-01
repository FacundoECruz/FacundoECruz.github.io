import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:8080",
  // baseURL: "http://localhost:3000/api",
  // baseURL: "https://altisima-scoreboard.onrender.com/api",
  // baseURL: "https://altisima-spring-backend.onrender.com",
});

//OJO CON LOS V1 CUANDO CAMBIAMOS DE SERVIDOR!!!

const api = {
  getGames: () => server.get("/games"),
  createGame: (players) => server.post("/v1/games", players),
  getPlayer: (username) => server.get(`/players/${username}`),
  createPlayer: (playerData) => server.post("/v1/players", playerData),
  getPlayers: () => server.get("/players"),
  getUnregisteredPlayers: () => server.get("/v1/players"),
  getUser: (username) => server.get(`/users/${username}`),
  login: (data) => server.post("/users/login", data),
  createUser: (userData) => server.post("/v1/users", userData),
  getUsers: () => server.get("/users"),
  editUser: (username, userData) =>
    server.put(`/users/${username}`, userData),
  associateUser: (userData) => server.post("/v1/users/associate", userData),
  deleteUser: (username) => server.delete(`/users/${username}`),
  nextRound: (playersRound, gameId) =>
    server.put("/v1/games/next", { playersRound: playersRound, gameId: gameId }),
  prevRound: (gameId) => server.put("/v1/games/prev", { id: gameId }),
  finishGame: (players, gameId, user, winner) =>
    server.put("/v1/games/finish", {
      players: players,
      gameId: gameId,
      user: user,
      winner: winner,
    }),
    getAchievements: () => server.get("/achievements")
};

export default api;
