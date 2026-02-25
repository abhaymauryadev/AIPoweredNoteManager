import "../styles/globals.css";
import Hero from "../components/sections/Hero";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Features from "../components/sections/Features";
export default function HomePage() {
  return (
    <>
      <Navbar />
      <section className="text-center space-y-4">
        <Hero />
        <Features />
        <Footer />
      </section>
    </>
  );
}
