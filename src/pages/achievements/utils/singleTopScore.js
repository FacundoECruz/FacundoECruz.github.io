/* eslint-disable no-unused-vars */
import Swal from "sweetalert2";
import "./modals.css"

export function singleTopScore(player) {
  const {username, image, gamesWon, score} = player;
  
  Swal.fire({
    title: username,
    text: "Máximo puntaje en una partida: " + score,
    imageUrl: image,
    customClass: {
      container: "highest-score"
    },
    imageWidth: 300,
    imageHeight: 200,
    imageAlt: "Custom image",
  });
}