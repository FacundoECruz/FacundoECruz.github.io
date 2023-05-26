import Navbar from "../../components/Navbar.jsx"
import MainHome from "./MainHome.jsx"
import Text from "./TextBody.jsx"
import Faq from "./FAQ.jsx"
import Footer from "../../components/Footer.jsx"
import "../../stylesheets/Home.css"

function Home() {
  return (
    <div className="home-container">
      <Navbar />
      <MainHome />
      <Text />
      <Faq />
      <Footer />
    </div>
  );
}

export default Home;
