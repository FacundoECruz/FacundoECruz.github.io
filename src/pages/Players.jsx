import { useState, useEffect } from "react";
import api from "../utils/api-client.js";

function Players() {
  const [players, setPlayers] = useState(null);

  console.log(players);

  useEffect(() => {
    api
      .getPlayers()
      .then((response) => setPlayers(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1>All Players page</h1>
      {players
        ? players.map((p) => {
            return (
              <div key={p._id}>
                <h3>{p.username}</h3>
                <img src={p.image} />
              </div>
            );
          })
        : null}
    </>
  );
}

export default Players;
