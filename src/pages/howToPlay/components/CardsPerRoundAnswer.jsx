function CardsPerRoundAnswer() {
  return (
    <div>
      <p>
        En cada ronda se reparten un número especificado de cartas, que irá
        variando en cada una de las rondas.
      </p>
      <p>
        La cantidad de cartas por ronda no puede ser menor a 3, mientras que el
        máximo de cartas por ronda estará dado por la división entre el total de
        cartas en el mazo (40) y la cantidad de jugadores (en esta aplicación,
        la cantidad de cartas por ronda se determina aleatoriamente, siendo
        regla general que en la última ronda se juega con el máximo de cartas
        posible).
      </p>
      <p>
        Ejemplo: si son 5 jugadores, el máximo de cartas por ronda será 8
        <i>(40/5=8)</i> la última ronda debería ser de 8 cartas.
      </p>
    </div>
  );
}

export default CardsPerRoundAnswer;
