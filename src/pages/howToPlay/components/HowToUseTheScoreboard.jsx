import anotador from "../../../assets/faqs/anotador.jpg";
import nextRound from "../../../assets/faqs/nextRound.jpg";
import back from "../../../assets/faqs/back.jpg";

function HowToUseTheScoreboard() {
  return (
    <div>
      <p>
        Quien use el anotador debera ingresar los datos a la aplicación cada vez
        que finalice una ronda.
      </p>
      <img src={anotador} />
      <p>
        Si el jugador cumplió la apuesta debe ingresar en APUESTA la cantidad de
        manos que apostó. Si no la cumplió debe ingresar en PIERDE la diferencia
        entre lo que apostó y lo que ganó.
      </p>
      <br />
      <p>Al presionar en:</p>
      <img src={nextRound} />
      <p>Se actualizará la tabla de posiciones</p>
      <br />
      <p>
        En caso de querer revisar si los datos ingresados en la ultima ronda
        fueron correctos podes pulsar el boton:
      </p>
      <img src={back}/>
      <p>
        Que habilitará el VAR y te permitirá modificar los valores en caso de ser necesario.
      </p>
    </div>
  );
}

export default HowToUseTheScoreboard;
