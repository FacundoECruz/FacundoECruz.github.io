import axios from "axios";

const api = {
  getGame: () => axios.get("/api/games"),
  createGame: (gameData) => axios.post("/api/games", gameData),
  getGames: () => axios.get("/api/games"),
  getPlayer: (id) => axios.get(`/api/players/${id}`),
  createPlayer: (playerData) => axios.post("/api/players", playerData),
  getPlayers: () => axios.get("/api/players"),
};

export default api;
