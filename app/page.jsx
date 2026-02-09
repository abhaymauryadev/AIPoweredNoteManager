import "../styles/globals.css";
import Hero from "../components/sections/Hero";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
export default function HomePage() {
  return (
    <>
    <Navbar/>
    <section className="text-center space-y-4">
      {/* <h1 className="text-4xl font-bold">
        AI-Powered Notes Manager
      </h1>

      <p className="text-gray-600 max-w-xl mx-auto">
        Write notes, get AI summaries, auto-tags, and smart search —
        all in one place.
      </p> */}

      <Hero/>
      <h1>Work in Progress</h1>
    </section>
    <Footer/>
    </>
  );
}
