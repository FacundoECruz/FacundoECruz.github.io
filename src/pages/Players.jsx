import { useState, useEffect } from "react";
import api from "../utils/api-client.js";

function Players() {
  const [players, setPlayers] = useState(null);
  
  console.log(players)

  useEffect(() => {
    api
      .getPlayers()
      .then((response) => setPlayers(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1>Players</h1>
    </>
  )
}

export default Players;
