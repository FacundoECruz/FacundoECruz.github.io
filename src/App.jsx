import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/index";
import Players from "./pages/players/Players";
import PlayerDetails from "./pages/playerDetails";
import Games from "./pages/games/Games";
import GameDetails from "./pages/gameDetails/GameDetails";
import NewGame from "./pages/newGame";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
import { AuthProvider } from "./utils/AuthContext";
import RequireAuth from "./utils/requireAuth";

function App() {

  return (
    <>
      <AuthProvider>
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/players" element={<Players />} />
            <Route path="/players/:username" element={<PlayerDetails />} />
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
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
