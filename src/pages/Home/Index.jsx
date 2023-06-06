import MainHome from "./MainHome.jsx";
import Text from "./TextBody.jsx";
import Faq from "./FAQ.jsx";
import Footer from "../../components/Footer.jsx";
import "../../stylesheets/Home.css";
import { Container } from "@mui/material";

function Home() {
  return (
    <>
      <Container sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <MainHome />
        <Text />
        <Faq />
        <Footer />
      </Container>
    </>
  );
}

export default Home;
