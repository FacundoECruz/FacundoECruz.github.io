function DynamicsOfTheRound() {
  return (
    <div>
      <p>
        Una vez que se hayan repartido las cartas y que los jugadores las hayan
        visto, comienza la...
      </p>
      <h3>Ronda de apuestas</h3>
      <p>
        Comenzando por quien esté ubicado a la derecha del mazo, cada uno de los
        jugadores deberá apostar cuántas manos cree que va a ganar en la ronda.
      </p>

      <p>
        {" "}
        Dado que en cada una de las rondas al menos uno tiene que perder,{" "}
        <i>
          la suma total de las apuestas de los jugadores (apuesta general) no
          puede ser nunca igual a la cantidad de cartas que se repartieron en
          dicha ronda.
        </i>
      </p>
      <p>
        Esto se ajusta vetando al último jugador de la ronda la apuesta que
        igualaría la apuesta general con la cantidad de cartas en la ronda.
      </p>
      <p>
        Ejemplo: son 4 jugadores y se repartieron 8 cartas; el primero apostó 2,
        el segundo 2, el tercero 2. Dada esta situación, el último jugador no
        podría apostar 2, puede apostar 0, 1, 3, 4, pero no 2, sino la apuesta
        general seria igual al número de cartas.
      </p>
      <p>Una vez terminada la ronda de apuestas, se procede al juego</p>
      <h3>Juego</h3>
      <p>
        Empezando por quien comenzó la ronda de apuestas, cada uno debera poner
        en mesa una carta. El jugador que sigue en la ronda deberá esperar a que
        el jugador que le precede haya jugado su carta.
      </p>
      <p>
        Una vez que todos los jugadores hayan jugado su carta, aquel que haya
        jugado la carta más alta (en relación a los valores del truco) gana la
        mano. En la siguiente mano comienza el que ganó la mano anterior y se
        procede exactamente igual hasta que se hayan jugado todas las cartas de
        la ronda.
      </p>
    </div>
  );
}

export default DynamicsOfTheRound;
