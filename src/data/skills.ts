export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "React Query",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs", "Server Actions"],
  },
  {
    category: "Database",
    skills: ["MongoDB", "PostgreSQL", "Prisma ORM"],
  },
  {
    category: "DevOps & Tools",
    skills: ["Git", "GitHub", "Docker", "Vercel", "VS Code", "Postman"],
  },
];
