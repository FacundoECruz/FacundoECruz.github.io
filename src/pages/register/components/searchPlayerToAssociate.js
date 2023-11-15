import Swal from "sweetalert2";

export function openSearchPlayerToAssociate(options, setUsernameValue, setRemovePlayerToAssociate) {
  const searchPlayerToAssociateProps = {
    title: "Asociar jugador",
    text: "Si ya tenes un perfil en la base de datos podes asociar sus logros y resultados a tu cuenta",
    input: "select",
    inputOptions: { options },
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