import { useState, useEffect } from "react";
import api from "../../utils/api-client";
import { Typography } from "@mui/material";

function Edit() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    api 
      .getUser()
      .then((res) => {
        console.log(res.data)
        setUser(res.data)
      })
  })

  return ( 
    <Typography>Edit {user}</Typography>
   );
}

export default Edit;