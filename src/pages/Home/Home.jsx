import Navbar from "../../components/Navbar.jsx"
import MainHome from "./components/MainHome.jsx"
import Text from "./components/TextBody.jsx"
import Faq from "./components/FAQ.jsx"
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
