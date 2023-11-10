/* eslint-disable no-unused-vars */
import Swal from "sweetalert2";

export function singleTopScoreModal(player, instance) {
  const {username, image, score} = player;
  
  Swal.fire({
    title: `Máximo puntaje en una ${instance}`,
    text:  username + ": " + score,
    imageUrl: image,
    imageWidth: 300,
    imageHeight: 200,
    imageAlt: "Custom image",
  });
}