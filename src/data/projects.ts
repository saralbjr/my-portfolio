export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  features: string[];
  challenges: string;
  learnings: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: "admin-notification",
    title: "Admin Notification System",
    description:
      "A real-time notification system for admin dashboards with role-based alerts, WebSocket integration, and notification management.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
    features: [
      "Real-time push notifications via WebSockets",
      "Role-based notification routing",
      "Read/unread status tracking",
      "Notification history and filtering",
      "Email fallback for critical alerts",
    ],
    challenges:
      "Handling concurrent WebSocket connections at scale and ensuring message delivery reliability.",
    learnings:
      "Gained deep understanding of WebSocket protocols and pub/sub patterns for real-time systems.",
    image: "/images/projects/admin-notification.png",
    githubUrl: "https://github.com/saralbjr",
  },
  {
    id: "data-analysis-website",
    title: "Data Analysis Website",
    description:
      "A specialized platform for data input and visualization, featuring a complex dynamic table matrix for efficient data management and analysis.",
    techStack: ["Next.js", "React Query", "Tailwind CSS", "Express.js", "PostgreSQL"],
    features: [
      "Dynamic table matrix for flexible data input",
      "Real-time data visualization and display",
      "Automated data validation and processing",
      "RESTful API integration with React Query",
      "Responsive UI for deep data editing",
    ],
    challenges:
      "Developing a performant and reactive table matrix that handles large-scale dynamic inputs without compromising UI speed.",
    learnings:
      "Deepened expertise in React Query for complex state synchronization and optimized grid-based UI architectures.",
    image: "/images/projects/data-analysis.png",
    githubUrl: "https://github.com/saralbjr",
  },

  {
    id: "consultancy-website",
    title: "Consultancy Website",
    description:
      "Modern business consultancy website built with Next.js and Prisma, featuring dynamic content management and contact forms.",
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    features: [
      "Dynamic service pages with CMS",
      "Contact form with email integration",
      "SEO optimized pages",
      "Responsive design across all devices",
      "Admin panel for content management",
    ],
    challenges:
      "Integrating Prisma ORM with Next.js server components and managing database migrations.",
    learnings: "Mastered server-side rendering patterns and database integration with modern ORMs.",
    image: "/images/projects/consultancy-website.png",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/saral",
  },
];
