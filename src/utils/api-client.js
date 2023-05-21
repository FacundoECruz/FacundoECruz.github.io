import axios from "axios";

const api = {
  getGame: () => axios.get("/game"),
  createGame: (gameData) => axios.post("/game", gameData),
  getPlayer: () => axios.get("/player"),
  createPlayer: (playerData) => axios.post("/player", playerData),
  getPlayers: () => axios.get("/players"),
};

export default api;
