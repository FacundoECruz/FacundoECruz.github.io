import Swal from "sweetalert2";
import { openSearchPlayerToAssociate } from "./searchPlayerToAssociate";

export function openAssociateModals(options, setUsernameValue, setRemovePlayerToAssociate){
  const associateOfferModalProps = {
    title: "Ya jugaste una partida donde se usó este anotador?",
    text: "Podés asociar tu cuenta al perfil que ya está creado",
    showCancelButton: true,
    confirmButtonText: "Asociar",
    cancelButtonText: "Cancelar",
    denyButtonText: "Crear nuevo",
  };
  
  Swal.fire(associateOfferModalProps).then((result) => {
    if (result.isConfirmed) {
      openSearchPlayerToAssociate(options, setUsernameValue, setRemovePlayerToAssociate);
    }
  });

  
}


