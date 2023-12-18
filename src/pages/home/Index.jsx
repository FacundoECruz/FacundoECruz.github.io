/* eslint-disable react/prop-types */
import MainHome from "./MainHome.jsx";
import "../../stylesheets/Home.css";
import { Container } from "@mui/material";
import LoadingServer from "../../components/LoadingServer.jsx";
import { useState } from "react";
import Login from "../login/index.jsx";

function Home({ dataFromServer }) {
  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage:
            'url("https://res.cloudinary.com/dfknsvqer/image/upload/v1695064901/fondo-home_noahch.jpg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
          minHeight: "100vh",
        }}
      >
        {dataFromServer === "loading" || showTutorial ? (
          <LoadingServer
            server={dataFromServer}
            backToHome={() => setShowTutorial(false)}
          />
        ) : dataFromServer === "authError" ? (
          location.reload()
        ) : (
          <MainHome showTutorial={() => setShowTutorial(true)} />
        )}
      </Container>
    </>
  );
}

export default Home;
