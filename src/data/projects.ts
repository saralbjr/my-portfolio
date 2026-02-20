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
    githubUrl: "https://github.com/saral",
  },
  {
    id: "event-management",
    title: "Event Management System",
    description:
      "Full-stack event management platform with RSVP tracking, event scheduling, and attendee management.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    features: [
      "Create, edit, and delete events",
      "RSVP system with email confirmations",
      "Calendar view for event scheduling",
      "Attendee management dashboard",
      "Search and filter events",
    ],
    challenges:
      "Designing an intuitive calendar interface and handling timezone differences for events.",
    learnings:
      "Learned to build complex CRUD applications with proper state management and data validation.",
    image: "/images/projects/event-management.png",
    githubUrl: "https://github.com/saral",
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
    learnings:
      "Mastered server-side rendering patterns and database integration with modern ORMs.",
    image: "/images/projects/consultancy-website.png",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/saral",
  },
];
