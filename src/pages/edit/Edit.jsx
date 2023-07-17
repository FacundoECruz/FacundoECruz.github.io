import { useEffect, useContext } from "react";
import { AuthContext } from "../../utils/AuthContext";
import api from "../../utils/api-client";
import { Typography } from "@mui/material";

function Edit() {

  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log(user)
    api 
      .getUser(user)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
  }, [user])

  return ( 
    <Typography>Edit {user}</Typography>
   );
}

export default Edit;