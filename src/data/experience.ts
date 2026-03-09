export interface Experience {
  id: string;
  title: string;
  company: string;
  dateRange: string;
  description: string;
  achievements: string[];
}

export const experiences: Experience[] = [
  {
    id: "full-stack-intern",
    title: "Full Stack Developer Intern",
    company: "Infotraid Technology",
    dateRange: "Feb 2025 – August 2025",
    description:
      "Developing scalable full-stack web applications and RESTful APIs using modern technologies.",
    achievements: [
      "RESTful APIs with Next.js, Express.js, Prisma ORM, PostgreSQL",
      "Express.js backend: Controller, Repository, Routes, Validator",
      "Prisma database schemas, relational modeling",
      "Dynamic table matrix for data input/display",
      "Next.js frontend: React, React Query, Tailwind CSS",
      "Real-time admin notification system",
      "Component-based, API-first architecture",
      "State management with React Query",
      "Responsive, visually appealing UI with Tailwind",
    ],
  },
];
