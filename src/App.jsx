import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Players from "./pages/Players";
import PlayerDetails from "./pages/PlayerDetails";
import NewPlayer from "./pages/NewPlayer";
import Games from "./pages/Games";
import GameDetails from "./pages/GameDetails";
import NewGame from "./pages/NewGame";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/players" element={<Players />} />
        <Route path="/players/:id" element={<PlayerDetails />} />
        <Route path="/players/new" element={<NewPlayer />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:id" element={<GameDetails />} />
        <Route path="/games/new" element={<NewGame />} />
      </Routes>
    </Router>
  );
}

export default App;
