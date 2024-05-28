import AboutMe from "@/components/AboutMe";
import Hero from "../components/Hero";
import { Experience } from "@/assets/data/experience";
import Experiences from "@/components/Experience";
export default function Home() {
  return (
    <main className="overflow-clip">
      <Hero />
      <AboutMe />
      <Experiences />
    </main>
  );
}
