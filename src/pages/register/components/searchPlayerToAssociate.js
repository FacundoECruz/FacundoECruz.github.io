import Swal from "sweetalert2";

export function openSearchPlayerToAssociate(
  options,
  setUsernameValue,
  setRemovePlayerToAssociate
) {
  const searchPlayerToAssociateProps = {
    title: "Asociar jugador",
    text: "Tenés que pedirle al usuario que creó tu jugador que te dé de alta",
    input: "select",
    inputPlaceholder: "Seleccionar jugador",
    showCancelButton: true,
  };

  Swal.fire(searchPlayerToAssociateProps).then((result) => {
    if (result.isConfirmed) {
      if (result.value !== "") {
        const selectedValue = result.value;
        setUsernameValue(options[selectedValue]);
        setRemovePlayerToAssociate(true);
      }
    }
  });
}
