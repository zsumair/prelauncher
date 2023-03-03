import Navbar from "@/components/navbar/Navbar";
import Navicheck from "@/components/navbar/Navicheck";
import Footer from "../Footer/Footer";
import Hero from "../Hero/Hero";
import SlickHero from "../Hero/SlickHero";

function Layout({ children }) {
  return (
    <>
      <div className="container">
        {/* <Navicheck /> */}
        <Navbar />
        {/* <Hero /> */}
        <main>{children}</main>
        <div className="divider"></div>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
