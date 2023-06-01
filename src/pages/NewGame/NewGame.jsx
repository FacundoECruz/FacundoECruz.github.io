import players from "../../assets/players.js";
import PlayerGrid from "./PlayerGrid.jsx";
import "../../stylesheets/NewGame.css";

function NewGame() {

  return (
    <>
      <h1>New Game page</h1>
      <main>
        {players.map((p) => {
          return <PlayerGrid key={p.name} player={p} onSubmit={handleRound}/>;
        })}
      </main>
      <button onClick={handleRound}>Next Round</button>
    </>
  );
}

export default NewGame;
