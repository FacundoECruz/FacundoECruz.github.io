import "../../stylesheets/PlayerGrid.css";

function PlayerGrid() {

  return (
    <section className="player-grid-container">
      <div className="player-header">
        {/* <h2>{name}</h2> */}
        {/* <h3>{playerScore}</h3> */}
      </div>
      <div className="player-history">
        {/* {playerBetHistory.map((res, i) => {
          return <p key={i} className={res > 0 ? "win" : "lose"}>{res}</p>
        })} */}
      </div>
      <div className="controls-container">
        <p>Apuesta</p>
        {/* <h3>{playerBet}</h3> */}
        <div className="buttons-container">
          {/* <button onClick={() => setPlayerBet(playerBet += 1)}>+</button> */}
          {/* <button onClick={() => setPlayerBet(playerBet -= 1)}>-</button> */}
        </div>
      </div>
      <div className="controls-container">
        <p>Pierde</p>
        {/* <h3>{playerLose}</h3> */}
        <div className="buttons-container">
          {/* <button onClick={() => setPlayerLose(playerLose += 1)}>+</button> */}
          {/* <button onClick={() => setPlayerLose(playerLose -= 1)}>-</button> */}
        </div>
      </div>
    </section>
  );
}

export default PlayerGrid;
