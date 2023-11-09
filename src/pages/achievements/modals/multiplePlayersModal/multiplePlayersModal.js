import Swal from "sweetalert2";

export function multiplePlayersModal(players, title) {
  let html = "";
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    let scoreHtml = !title.includes("ronda") ? `: <p>${player.score}</p>` : "";
    let playerHtml = `<div class="user-card">
    <img src=${players[i].image} alt="Usuario ${i}" width="150" height="150"/>
    <h2>${players[i].username} ${scoreHtml} </h2>
  </div>`;
    html += playerHtml;
  }

  Swal.fire({
    title: title,
    html: html,
    showCloseButton: true,
    showConfirmButton: false,
    customClass: "custom-modal-class",
  });
}
