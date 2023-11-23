/* eslint-disable react/prop-types */
import "../../stylesheets/MainHome.css"
import ButtonBases from "./StartGameButton.jsx";

function MainHome({showTutorial}) {
  return (
    <main>
      <ButtonBases showTutorial={showTutorial}/>
    </main>
  );
}

export default MainHome;
