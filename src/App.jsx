import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Index.jsx";
import Players from "./pages/Players/Players.jsx";
import PlayerDetails from "./pages/PlayerDetails/index.jsx";
import Games from "./pages/Games/Games.jsx";
import GameDetails from "./pages/GameDetails/GameDetails.jsx";
import NewGame from "./pages/NewGame/index.jsx";
import Login from "./pages/Login/index.jsx";
import Register from "./pages/Register/index.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import "./App.css";
import { AuthProvider } from "./utils/AuthContext";
import RequireAuth from "./utils/requireAuth";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Router basename="/">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="#/players" element={<Players />} />
            <Route path="#/players/:username" element={<PlayerDetails />} />
            <Route path="#/games" element={<Games />} />
            <Route path="#/games/:id" element={<GameDetails />} />
            <Route
              path="#/games/new"
              element={
                <RequireAuth>
                  <NewGame />
                </RequireAuth>
              }
            />
            <Route path="#/login" element={<Login />} />
            <Route path="#/register" element={<Register />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
