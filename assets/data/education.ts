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
    date: "August 2021 - May 2026",
    highlights: [
      "GPA: 3.63",
      "Honor Student",
      "Relevant Coursework: Data Structures, Software Engineering, Algorithm Design and Analysis, Advanced Programming, Computer Architecture, Operating Systems, Database Systems",
      "Google Tech Exchange Alumni",
    ],
  },
];

export type { EducationEntry };
export { Education };
