/* eslint-disable no-unused-vars */
import Swal from "sweetalert2";

export function singleTopScoreModal(player) {
  const {username, image, score} = player;
  
  Swal.fire({
    title: username,
    text: "Máximo puntaje en una partida: " + score,
    imageUrl: image,
    imageWidth: 300,
    imageHeight: 200,
    imageAlt: "Custom image",
  });
}