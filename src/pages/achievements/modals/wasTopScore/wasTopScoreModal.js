import Swal from "sweetalert2";

export function wasHighestScoreModal(players) {
  // falta acomodarle el tamanio a las imagenes

  let html = "";
  for (let i = 0; i < players.length; i++) {
    let playerHtml = `<div class="user-card">
    <img src=${players[i].image} alt="Usuario ${i}" />
    <h2>${players[i].username}: ${players[i].score} </h2>
  </div>`;
    html += playerHtml;
  }

  Swal.fire({
    title: "Tuvieron el record de puntaje mas alto",
    html: html,
    showCloseButton: true,
    showConfirmButton: false,
    customClass: "custom-modal-class",
  });
}
