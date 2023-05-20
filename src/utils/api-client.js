import axios from "axios";

const client = axios.create({
  baseURL: "/api",
});

const api = {
  getGame: () => client.get("/game"),
  createGame: (gameData) => client.post("/game", gameData),
  getPlayer: () => client.get("/player"),
  createPlayer: (playerData) => client.post("/player", playerData),
  getPlayers: () => client.get("/players"),
};

export default api;
