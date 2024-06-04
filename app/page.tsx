import AboutMe from "@/components/AboutMe";
import Hero from "../components/Hero";
import Experiences from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
export default function Home() {
  return (
    <main className="overflow-clip">
      <Hero />
      <AboutMe />
      <Experiences />
      <Education />
      <Projects />
    </main>
  );
}
