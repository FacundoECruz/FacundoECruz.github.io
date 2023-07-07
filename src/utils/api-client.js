import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:3000/api",
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
  nextRound: (playersRound, gameId) =>
    server.patch("/games/next", { playersRound: playersRound, gameId: gameId }),
  prevRound: (gameId) => server.patch("/games/prev", { gameId: gameId }),
  finishGame: (players, gameId, user, winner) =>
    server.patch("/games/finish", {
      players: players,
      gameId: gameId,
      user: user,
      winner: winner,
    }),
};

export default api;
