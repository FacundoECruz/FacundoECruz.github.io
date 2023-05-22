import axios from "axios";

const api = {
  getGame: () => axios.get("/api/game"),
  createGame: (gameData) => axios.post("/api/game", gameData),
  getGames: () => axios.get("/api/games"),
  getPlayer: () => axios.get("/api/player"),
  createPlayer: (playerData) => axios.post("/api/player", playerData),
  getPlayers: () => axios.get("/api/players"),
};

export default api;
