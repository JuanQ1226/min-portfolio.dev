"use client";

import { motion } from "framer-motion";
import { Skills } from "@/assets/data/skills";

export default function SkillsSection() {
  const categories = Skills.reduce<Record<string, string[]>>((acc, entry) => {
    if (!acc[entry.category]) acc[entry.category] = [];
    acc[entry.category].push(entry.skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-lg font-medium tracking-wide text-foreground mb-12"
        >
          Skills
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {Object.entries(categories).map(([category, skills], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.15 }}
            >
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground/60 mb-4">
                {category}
              </h3>
              <ul className="space-y-2">
                {skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-sm text-muted-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
