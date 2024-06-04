import AboutMe from "@/components/AboutMe";
import Hero from "../components/Hero";
import Experiences from "@/components/Experience";
import Education from "@/components/Education";
import { Analytics } from "@vercel/analytics/react";
export default function Home() {
  return (
    <main className="overflow-clip">
      <Analytics />
      <Hero />
      <AboutMe />
      <Experiences />
      <Education />
    </main>
  );
}
