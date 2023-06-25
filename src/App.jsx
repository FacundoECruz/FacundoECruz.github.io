import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Index";
import Players from "./pages/Players/Players";
import PlayerDetails from "./pages/PlayerDetails";
import Games from "./pages/Games/Games";
import GameDetails from "./pages/GameDetails/GameDetails";
import NewGame from "./pages/NewGame";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { AuthProvider } from "./utils/AuthContext";

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
            <Route path="/games/new" element={<NewGame />} />
            <Route
              path="/login"
              element={<Login />}
            />
          <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
