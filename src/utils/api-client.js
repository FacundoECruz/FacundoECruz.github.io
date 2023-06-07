import axios from "axios";

const server = axios.create({
  baseURL: 'http://localhost:3000'
});

const api = {
  getGame: () => server.get("/api/games"),
  createGame: (gameData) => server.post("/api/games", gameData),
  getGames: () => server.get("/api/games"),
  getPlayer: (id) => server.get(`/api/players/${id}`),
  createPlayer: (playerData) => server.post("/api/players", playerData),
  getPlayers: () => server.get("/api/players"),
};

export default api;
