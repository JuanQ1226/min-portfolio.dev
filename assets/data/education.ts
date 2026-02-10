type EducationEntry = Readonly<{
  degree: string;
  institution: string;
  date: string;
  highlights: string[];
}>;

const Education: EducationEntry[] = [
  {
    degree: "Computer Science and Engineering",
    institution: "University of Puerto Rico, Mayaguez",
    date: "August 2021 - 2026 (exp.)",
    highlights: [
      "GPA: 3.78",
      "Honor Student",
      "Relevant Coursework: Data Structures, Introduction to Software Engineering, Algorithm Design and Analysis, Advanced Programming, Calculus 1, 2 and 3",
      "Google Tech Exchange Alumni",
    ],
  },
];

export type { EducationEntry };
export { Education };
