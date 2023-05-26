import cuatros from "../../assets/cuatros.jpg";
import messi from "../../assets/messi.jpg"
import "../../stylesheets/MainHome.css"

function MainHome() {
  return (
    <main>
      <img src={cuatros} />
      <img src={messi}/>
    </main>
  );
}

export default MainHome;
