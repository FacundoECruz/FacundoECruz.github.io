import { Grid } from "@mui/material";
import FaqItem from "./FaqItem";

function PlayersGuide() {
  return (
    <Grid container sx={{display: "flex", flexDirection: "column", alignItems: "center", mt: "5px"}}>
      <Grid item md={6} sm={12} >
        <FaqItem  
          question="¿Cómo se juega al Altísima?"
          answer="Altísima se juega a 9 rondas, con un mazo de 40 cartas españolas y toma los valores de las cartas de truco para el desarrollo del juego. Es un juego individual en el que cada jugador persigue su objetivo (sumar puntos y ser el que más sumó al final de las 9 rondas), siendo que en cada ronda va a haber por lo menos un jugador que pierda y por lo tanto reste puntos."
        />
        <FaqItem
          question="¿Cuántas cartas se reparten por ronda?"
          answer="En cada ronda se reparten un número especificado de cartas, que irá variando en cada una de las rondas. La cantidad de cartas por ronda no puede ser menor a 3, mientras que el máximo de cartas por ronda estará dado por la división entre el total de cartas en el mazo (40) y la cantidad de jugadores (en esta aplicación, la cantidad de cartas por ronda se determina aleatoriamente, siendo regla general que en la última ronda se juega con el máximo de cartas posible).
          Ejemplo: si son 5 jugadores, el máximo de cartas por ronda será 8 (40/5=8); la última ronda debería ser de 8 cartas."
        />
        <FaqItem
          question="¿Cuál es la dinámica de la ronda?"
          answer="Una vez que se hayan repartido las cartas y que los jugadores las hayan visto, comienza la ronda de apuestas. Comenzando por quien esté ubicado a la derecha del mazo y en sentido contrario a las agujas del reloj, cada uno de los jugadores deberá apostar cuántas manos cree que va a ganar en la ronda.
Dado que en cada una de las rondas al menos uno tiene que perder, la regla de oro es: la suma de las apuestas de cada uno de los jugadores (apuesta general) no puede ser nunca igual a la cantidad de cartas que se repartieron en dicha ronda. Esto se ajusta vetando al último jugador de la ronda la apuesta que igualaría la apuesta general con la cantidad de cartas en la ronda.
Ejemplo: son 4 jugadores; el primero apostó 1, el segundo 0, el tercero 2. Dada esta situación, el último jugador no podría apostar 1, puede apostar 0, 2, 3, 4, pero no 1, ya que de ser así se estaría rompiendo la regla básica del juego.
Una vez terminada la ronda de apuestas, se procede al juego, empezando por quien comenzó la ronda de apuestas y siguiendo en dirección contraria a las agujas del reloj. El jugador que sigue en la ronda deberá esperar a que el jugador que le precede haya jugado su carta. Una vez que todos los jugadores hayan jugado su carta, aquel que haya jugado la carta más alta (en relación a los valores del truco) se lleva todas las cartas y gana una mano.
En la siguiente mano comienza el que ganó la mano anterior y se procede exactamente igual hasta que se hayan jugado todas las cartas de la ronda."
        />
        <FaqItem
          question="¿Cómo se suman puntos?"
          answer="Los puntos se asignan una vez finalizada la ronda y se definen en relación a si los jugadores cumplieron o no con las apuestas realizadas en la ronda de apuestas.

Si el jugador cumplió su apuesta, es decir, ganó exactamente la cantidad de manos que dijo que iba a ganar, suma 5 puntos + la cantidad de manos apostadas. (esto también incluye la posibilidad de que el jugador haya apostado que no ganaba ninguna mano y efectivamente terminó la ronda sin ganar ninguna, en ese caso sumaría solo los 5 puntos que se otorgan por cumplir la apuesta).
Ejemplo: si un jugador apostó a que ganaba 2 manos y ganó 2 manos, entonces suma 7 puntos (5+2).
Si el jugador no cumplió su apuesta, es decir, terminó la ronda habiendo ganado una cantidad de manos distinta de la que había apostado, resta la diferencia entre lo apostado y lo ganado.
Ejemplo: un jugador apostó que ganaba 2 manos:
si no ganó ninguna mano resta 2 puntos,
si ganó 1 mano resta 1 punto,
si ganó 3 manos resta 1 punto,
si ganó 4 manos resta 2 puntos."
        />
        <FaqItem
          question="¿Cómo se gana una partida de Altísima?"
          answer="Los puntos obtenidos en cada ronda se van acumulando y quien tenga la mayor cantidad de puntos al finalizar la ronda 9 será quien se lleve la partida.
En esta aplicación aún no se toma en consideración el caso de que haya un empate en el primer puesto al finalizar la 9na ronda. En ese caso, queda en manos del grupo resolver qué se hace; generalmente, se juega una ronda más de desempate."
        />
      </Grid>
    </Grid>
  );
}

export default PlayersGuide;
