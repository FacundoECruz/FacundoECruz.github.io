import { useState, useEffect } from "react";
import api from "../../utils/api-client";

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
    <h1>Edit user page</h1>
   );
}

export default Edit;