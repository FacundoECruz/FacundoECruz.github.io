import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Index.jsx";
import Players from "./pages/players/Players.jsx";
import PlayerDetails from "./pages/playerDetails/index.jsx";
import Games from "./pages/games/index.jsx";
import NewGame from "./pages/newGame/index.jsx";
import Login from "./pages/login/index.jsx";
import Register from "./pages/register/index.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Edit from "./pages/edit/Edit.jsx";
import PlayersGuide from "./pages/howToPlay/index.jsx";
import Footer from "./components/Footer.jsx";
import Achievements from "./pages/achievements/index.jsx";
import Associates from "./pages/associates/Associates.jsx";
import RequireAuth from "./utils/requireAuth";
import { useEffect, useState } from "react";
import api from "./utils/api-client.js";
import { AuthProvider } from "./utils/AuthContext.jsx";

function App() {
  const [dataFromServer, setDataFromServer] = useState("loading");
  const [achievements, setAchievements] = useState(null);

  useEffect(() => {
    api
      .getAchievements()
      .then((res) => {
        setAchievements(res.data);
        setDataFromServer("loaded");
        window.localStorage.setItem("achievements", JSON.stringify(res.data));
      })
      .catch((error) => {
        console.log(error)
        setDataFromServer("authError")
      });
  }, []);

  return (
    <>
      <AuthProvider>
        <Navbar dataFromServer={dataFromServer}/>
        <Router basename="/" dataFromServer={dataFromServer}>
          <Routes dataFromServer={dataFromServer}>
            <Route
              path="/"
              element={<Home dataFromServer={dataFromServer} />}
            />
            <Route path="/players" element={<Players />} />
            <Route path="/players/:username" element={<PlayerDetails />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/games" element={<Games />} />
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
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/associates" element={<Associates />} />
          </Routes>
        </Router>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
