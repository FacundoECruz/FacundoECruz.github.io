import MainHome from "./MainHome.jsx";
import Footer from "../../components/Footer.jsx";
import "../../stylesheets/Home.css";
import { Container } from "@mui/material";

function Home() {
  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundImage:
            'url("https://res.cloudinary.com/dfknsvqer/image/upload/v1686775105/krzysztof-hepner-aD3_Zf5tfr4-unsplash_ee8pwi.jpg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
          minHeight: "100vh",
        }}
      >
        <MainHome />
        <Footer />
      </Container>
    </>
  );
}

export default Home;
