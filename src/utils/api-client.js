import axios from "axios";


const server = axios.create({
  // baseURL: "http://localhost:8080",
  // baseURL: "http://localhost:3000/api",
  // baseURL: "https://altisima-scoreboard.onrender.com/api",
  baseURL: "https://altisima-spring-backend.onrender.com",
});

const setAuthToken = (token) => {
  if (token) {
    server.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete server.defaults.headers.common["Authorization"];
  }
};

const api = {
  getGames: () => server.get("/games"),
  // createGame: (players) => server.post("/v1/games", players),
  getPlayer: (username) => server.get(`/players/${username}`),
  // createPlayer: (playerData) => server.post("/v1/players", playerData),
  // getAssociatedPlayers: (user) => server.get(`/v1/players/${user}`),
  getPlayers: () => server.get("/players"),
  getUnregisteredPlayers: () => server.get("/v1/players"),
  // getUser: (username) => server.get(`/users/${username}`),
  login: (data) => server.post("/users/login", data),
  createUser: (userData) => server.post("/v1/users", userData),
  getUsers: () => server.get("/users"),
  editUser: (username, userData) => server.put(`/users/${username}`, userData),
  // associateUser: (userData) => server.post("/v1/users/associate", userData),
  deleteUser: (username) => server.delete(`/users/${username}`),
  // nextRound: (playersRound, gameId) =>
  //   server.put("/v1/games/next", {
  //     playersRound: playersRound,
  //     gameId: gameId,
  //   }),
  // prevRound: (gameId) => server.put("/v1/games/prev", { id: gameId }),
  getAchievements: () => server.get("/achievements"),
  authenticatedRequest: async (url, method, data, token) => {
    setAuthToken(token);
    try {
      const response = await server.request({
        url,
        method,
        data,
      });
      return response.data;
    } catch (e) {
      console.log(e)
    }
  },
};

// {
//   createGame: (players) => server.post("/v1/games", players),
//   createPlayer: (playerData) => server.post("/v1/players", playerData),
//   getAssociatedPlayers: (user) => server.get(`/v1/players/${user}`),
//   getUser: (username) => server.get(`/users/${username}`),
//   editUser: (username, userData) => server.put(`/users/${username}`, userData),
//   associateUser: (userData) => server.post("/v1/users/associate", userData),
//   nextRound: (playersRound, gameId) =>server.put("/v1/games/next", {playersRound: playersRound,gameId: gameId,}),
//   prevRound: (gameId) => server.put("/v1/games/prev", { id: gameId }),
// }

export default api;
