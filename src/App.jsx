import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Index.jsx";
import Players from "./pages/players/Players.jsx";
import PlayerDetails from "./pages/playerDetails/index.jsx";
import Games from "./pages/games/Games.jsx";
import GameDetails from "./pages/gameDetails/GameDetails.jsx";
import NewGame from "./pages/newGame/index.jsx";
import Login from "./pages/login/index.jsx";
import Register from "./pages/register/index.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Edit from "./pages/edit/Edit.jsx";
import PlayersGuide from "./pages/howToPlay/index.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";
import { AuthProvider } from "./utils/AuthContext";
import RequireAuth from "./utils/requireAuth";
import { useEffect } from "react";
import { useState } from "react";
import api from "./utils/api-client.js";

function App() {

  const [dataFromServer, setDataFromServer] = useState("loading");

  useEffect(() => {
    api
      .getPlayers()
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        if (res.data) {
          setDataFromServer("loaded");
        }
      })
      .catch((err) => console.log(err));
  });

  return (
    <>
      <AuthProvider>
        <Navbar dataFromServer={dataFromServer}/>
        <Router basename="/" dataFromServer={dataFromServer}>
          <Routes dataFromServer={dataFromServer}>
            <Route path="/" element={<Home dataFromServer={dataFromServer}/>} />
            <Route path="/players" element={<Players />} />
            <Route path="/players/:username" element={<PlayerDetails />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:id" element={<GameDetails />} />
            <Route
              path="/games/new"
              element={
                <RequireAuth>
                  <NewGame />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/manual" element={<PlayersGuide />} />
          </Routes>
        </Router>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
