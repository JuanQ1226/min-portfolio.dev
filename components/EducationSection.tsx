"use client";

import { motion } from "framer-motion";
import { Education } from "@/assets/data/education";

export default function EducationSection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-lg font-medium tracking-wide text-foreground mb-12"
        >
          Education
        </motion.h2>

        {Education.map((entry, index) => (
          <motion.div
            key={`${entry.institution}-${entry.degree}`}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="mb-8 last:mb-0"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
              <div>
                <h3 className="text-base font-medium text-foreground">
                  {entry.degree}
                </h3>
                <p className="text-sm text-muted-foreground/60">
                  {entry.institution}
                </p>
              </div>
              <span className="text-xs text-muted-foreground/50">
                {entry.date}
              </span>
            </div>
            <ul className="space-y-1.5 pl-0">
              {entry.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="text-sm leading-relaxed text-muted-foreground/70 flex items-baseline gap-3"
                >
                  <span className="flex-shrink-0 w-1 h-1 rounded-full bg-muted-foreground/30 mt-1.5" />
                  {highlight}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
