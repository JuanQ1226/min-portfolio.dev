"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

type Project = Readonly<{
  title: string;
  description: string;
  url?: string;
  image?: string;
  tech: string[];
}>;

const projects: Project[] = [
  {
    title: "Zorzal",
    description:
      "A B2B construction materials marketplace connecting contractors with suppliers. Features real-time RFQ negotiation, secure payments, and cloud-native architecture with AWS Amplify, Auth0, and DynamoDB.",
    image: "/zorzal.webp",
    tech: ["React", "AWS Amplify", "DynamoDB", "Auth0", "TypeScript"],
  },
  {
    title: "Maze Generator and Solver",
    description:
      "A web app that generates random mazes using DFS and finds the shortest path via BFS. Built with Astro, featuring interactive dimension controls and visual pathfinding.",
    url: "https://maze-generator-and-solver.vercel.app/",
    image: "/maze_generator.webp",
    tech: ["Astro", "TypeScript", "Canvas API"],
  },
];

export default function ProjectGrid() {
  return (
    <section id="projects" className="pt-16 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-normal tracking-tight text-foreground mb-14"
        >
          Projects
        </motion.h2>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="group"
            >
              {project.image && (
                <div className="relative w-full aspect-[2/1] overflow-hidden rounded-lg bg-muted/20 mb-5">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 1024px"
                    className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              )}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="max-w-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-base font-medium text-foreground">
                      {project.title}
                    </h3>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground/40 hover:text-foreground transition-colors"
                        aria-label={`Visit ${project.title}`}
                      >
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground/70 mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs text-muted-foreground/40"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
