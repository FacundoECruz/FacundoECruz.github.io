import MainHome from "./MainHome.jsx";
import "../../stylesheets/Home.css";
import { Container } from "@mui/material";
import LoadingServer from "../../components/LoadingServer.jsx";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../utils/api-client.js";

function Home() {
  const [dataFromServer, setDataFromServer] = useState("loading");

  useEffect(() => {
    api
      .getPlayers()
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        if (res.data) {
          setDataFromServer("loaded");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundImage:
            'url("https://res.cloudinary.com/dfknsvqer/image/upload/v1688502718/chris-burgett-YzTLqYMASFw-unsplash_m1h8lr.jpg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
          minHeight: "100vh",
        }}
      >
        {dataFromServer === "loading" ? <LoadingServer /> : <MainHome />}
      </Container>
    </>
  );
}

export default Home;
