import Hero from "@/components/Hero";
import SkillsSection from "@/components/Skills";
import ExperienceAccordion from "@/components/ExperienceAccordion";
import EducationSection from "@/components/EducationSection";
import ProjectGrid from "@/components/ProjectGrid";

export default function Home() {
  return (
    <main>
      <Hero />
      <SkillsSection />
      <ExperienceAccordion />
      <EducationSection />
      <ProjectGrid />
    </main>
  );
}
