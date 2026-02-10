"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Experience } from "@/assets/data/experience";
import { cn } from "@/lib/utils";

export default function ExperienceAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section id="experience" className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-normal tracking-tight text-foreground mb-14"
        >
          Experience
        </motion.h2>

        <div className="space-y-0 divide-y divide-border/50">
          {Experience.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.title}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                aria-expanded={openIndex === index}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                    <h3 className="text-base font-medium text-foreground group-hover:text-foreground/80 transition-colors">
                      {exp.title}
                    </h3>
                    <span className="text-sm text-muted-foreground/60">
                      {exp.company}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 pt-1">
                  <span className="text-xs text-muted-foreground/50 hidden sm:block">
                    {exp.date}
                  </span>
                  <ChevronDown
                    size={14}
                    className={cn(
                      "text-muted-foreground/40 transition-transform duration-200",
                      openIndex === index && "rotate-180"
                    )}
                  />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pr-8">
                      <p className="text-xs text-muted-foreground/50 mb-3 sm:hidden">
                        {exp.date}
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground/80 max-w-2xl">
                        {exp.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
