function ScorePointsAnswer() {
  return (
    <div>
      <p>
        Para sumar puntos tenes que cumplir la apuesta que hiciste antes de
        comenzar la ronda.
      </p>
      <p>
        Si el jugador cumplió su apuesta, es decir, ganó exactamente la cantidad
        de manos que dijo que iba a ganar, suma{" "}
        <b>5 puntos + la apuesta. </b>(si el jugador apostó
        que no ganaba nada y cumplió, entonces suma 5 puntos).
      </p>
      <h4>Ejemplo: Un jugador apostó a que ganaba 2 manos</h4>
      <ul>
        {" "}
        <li>
          Si ganó 2 manos, entonces suma 7 puntos <i>(5+2)</i>.
        </li>
        <li>
          Si el jugador no cumplió su apuesta, resta la diferencia entre lo
          apostado y lo ganado. <p>Es decir que si no ganó ninguna mano resta 2
          puntos, si ganó 1 mano resta 1 punto, si ganó 3 manos resta 1 punto,
          si ganó 4 manos resta 2 puntos.</p>
        </li>
      </ul>
    </div>
  );
}

export default ScorePointsAnswer;
