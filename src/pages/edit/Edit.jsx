import { useState, useEffect } from "react";
import api from "../../utils/api-client";
import { Typography } from "@mui/material";

function Edit() {

  const [user, setUser] = useState(null)

  useEffect(() => {

    const username = window.localStorage.getItem("user")

    api 
      .getUser(username)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  return ( 
    <Typography>Edit {user}</Typography>
   );
}

export default Edit;