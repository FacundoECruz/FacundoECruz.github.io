import Navbar from "../../components/Navbar.jsx"
import MainHome from "./components/MainHome.jsx"
import Text from "./components/TextBody.jsx"
import FAQ from "./components/FAQ.jsx"
import Footer from "../../components/Footer.jsx"

function Home() {
  return (
    <>
      <Navbar />
      <MainHome />
      <Text />
      <FAQ />
      <Footer />
    </>
  );
}

export default Home;
