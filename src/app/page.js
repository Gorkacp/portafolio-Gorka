import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Certifications from "../components/Certifications";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col bg-black text-white">
      <Hero />
      <About />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}
