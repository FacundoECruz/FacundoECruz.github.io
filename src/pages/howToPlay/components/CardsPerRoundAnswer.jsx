import roundsImage from "../../../assets/faqs/ronda-cartas.jpg";

function CardsPerRoundAnswer() {
  return (
    <div>
      <p>
        En cada ronda se reparten un número especificado de cartas, que irá
        variando en cada una de las rondas.
      </p>
      <p>
        La aplicación te va a indicar cuantas cartas se reparten.
      </p>
      
      <img src={roundsImage} style={{width: "80%"}}/>
    </div>
  );
}

export default CardsPerRoundAnswer;
