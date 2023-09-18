function DynamicsOfTheRound() {
  return (
    <div>
      <p>
        Una vez que se hayan repartido las cartas y que los jugadores las hayan
        visto, comienza la...
      </p>
      <h3>Ronda de apuestas</h3>
      <p>
        Comenzando por quien esté ubicado a la derecha del mazo y en sentido
        contrario a las agujas del reloj, cada uno de los jugadores deberá
        apostar cuántas manos cree que va a ganar en la ronda.
      </p>

      <p>
        {" "}
        Dado que en cada una de las rondas al menos uno tiene que perder, la
        regla de oro es:{" "}
        <i>
          la suma de las apuestas de cada uno de los jugadores (apuesta general)
          no puede ser nunca igual a la cantidad de cartas que se repartieron en
          dicha ronda.
        </i>
      </p>
      <p>
        Esto se ajusta vetando al último jugador de la ronda la apuesta que
        igualaría la apuesta general con la cantidad de cartas en la ronda.
      </p>
      <p>
        Ejemplo: son 4 jugadores; el primero apostó 1, el segundo 0, el tercero
        2. Dada esta situación, el último jugador no podría apostar 1, puede
        apostar 0, 2, 3, 4, pero no 1, ya que de ser así se estaría rompiendo la
        regla básica del juego.
      </p>
      <p>Una vez terminada la ronda de apuestas, se procede al juego</p>
      <h3>Juego</h3>
      <p>
        Empezando por quien comenzó la ronda de apuestas y siguiendo en
        dirección contraria a las agujas del reloj, cada uno debera poner en
        mesa una carta. El jugador que sigue en la ronda deberá esperar a que el
        jugador que le precede haya jugado su carta.
      </p>
      <p>
        Una vez que todos los jugadores hayan jugado su carta, aquel que haya
        jugado la carta más alta (en relación a los valores del truco) se lleva
        todas las cartas y gana una mano. En la siguiente mano comienza el que
        ganó la mano anterior y se procede exactamente igual hasta que se hayan
        jugado todas las cartas de la ronda.
      </p>
    </div>
  );
}

export default DynamicsOfTheRound;
