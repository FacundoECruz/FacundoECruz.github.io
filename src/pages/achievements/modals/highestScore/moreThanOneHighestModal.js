/* eslint-disable no-unused-vars */
import Swal from "sweetalert2";

export function moreThanOneTopScoreModal(players, instance) {
  const { username: name1, image: img1, score } = players[0];
  const { username: name2, image: img2 } = players[1];

  Swal.fire({
    title: name1,
    text: `Máximo puntaje en una ${instance}: ` + score,
    imageUrl: img1,
    imageWidth: 300,
    imageHeight: 200,
    imageAlt: "Custom image",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Hay Mas!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: name2,
        text: "Tambien hizo " + score + ` puntos en una ${instance}`,
        imageUrl: img2,
        imageWidth: 300,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
    }
  });
}
