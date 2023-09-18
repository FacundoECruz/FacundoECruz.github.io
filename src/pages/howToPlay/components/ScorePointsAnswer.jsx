function ScorePointsAnswer() {
  return (
    <div>
      <p>
        Los puntos se asignan una vez finalizada la ronda y se definen en
        relación a si los jugadores cumplieron o no con las apuestas realizadas
        en la ronda de apuestas.{" "}
      </p>
      <p>
        Si el jugador cumplió su apuesta, es decir, ganó exactamente la cantidad
        de manos que dijo que iba a ganar, suma{" "}
        <b>5 puntos + la cantidad de manos apostadas. </b>(esto también incluye
        la posibilidad de que el jugador haya apostado que no ganaba ninguna
        mano y efectivamente terminó la ronda sin ganar ninguna, en ese caso
        sumaría solo los 5 puntos que se otorgan por cumplir la apuesta).
      </p>
      <h4>Ejemplo: Un jugador apostó a que ganaba 2 manos</h4>
      <ul>
        {" "}
        <li>
          Si ganó 2 manos, entonces suma 7 puntos <i>(5+2)</i>.
        </li>
        <li>
          Si el jugador no cumplió su apuesta, es decir, terminó la ronda
          habiendo ganado una cantidad de manos distinta de la que había
          apostado, resta la diferencia entre lo apostado y lo ganado.
        </li>
        <li>
          Es decir que si no ganó ninguna mano resta 2 puntos, si ganó 1 mano
          resta 1 punto, si ganó 3 manos resta 1 punto, si ganó 4 manos resta 2
          puntos.
        </li>
      </ul>
    </div>
  );
}

export default ScorePointsAnswer;
