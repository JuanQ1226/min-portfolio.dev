import AboutMe from "@/components/AboutMe";
import Hero from "../components/Hero";
import Experiences from "@/components/Experience";
import Education from "@/components/Education";
export default function Home() {
  return (
    <main className="overflow-clip">
      <Hero />
      <AboutMe />
      <Experiences />
      <Education />
    </main>
  );
}
