import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../utils/api-client.js";
import DefaultPlayerCard from "./components/DefaultPlayerCard.jsx";

function PlayerDetails() {
  const { id } = useParams();

  const [player, setPlayer] = useState(null);

  useEffect(() => {
    api
      .getPlayer(id)
      .then((response) => setPlayer(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <>
      {player ? (
        <div key={player._id}>
          <h1>{player.username}</h1>
          <img width="100" height="100" alt="player-image" src={player.image} />
          <div className="player-data">
            <p>Played Games: {player.gamesPlayed}</p>
            <p>Won Games: {player.gamesWon}</p>
            <p>Created Games: {player.createdGames}</p>
            <p>Total Score: {player.totalScore}</p>
            <p>Average: {player.totalScore / player.gamesPlayed}</p>
          </div>
        </div>
      ) : <DefaultPlayerCard />}
    </>
  );
}

export default PlayerDetails;
