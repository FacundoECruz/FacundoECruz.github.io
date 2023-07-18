import axios from "axios";

// const host = import.meta.env.BACKEND_HOST;
// const protocol = import.meta.env.BACKEND_PROTOCOL;

// console.log(host, protocol)

const server = axios.create({
  // baseURL: `${protocol}://${host}/api`,
  baseURL: "https://altisima-scoreboard.onrender.com/api",
});

const api = {
  getGame: () => server.get("/games"),
  createGame: (players) => server.post("/games", players),
  getGames: () => server.get("/games"),
  getPlayer: (username) => server.get(`/players/${username}`),
  createPlayer: (playerData) => server.post("/players", playerData),
  getPlayers: () => server.get("/players"),
  getUser: (username) => server.get(`/users/${username}`),
  createUser: (userData) => server.post("/users", userData),
  getUsers: () => server.get("/users"),
  editUser: (username, userData) => server.patch(`/users/${username}`, userData),
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
