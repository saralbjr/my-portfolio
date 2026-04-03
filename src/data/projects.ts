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
    id: "music-web-app",
    title: "Music Streaming Platform",
    description:
      "A feature-rich music streaming application with real-time playback controls, mood-based recommendations, and an advanced admin dashboard for content management.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "MongoDB", "Vercel"],
    features: [
      "Real-time music playback with seek, volume, and shuffle controls",
      "Mood-based song recommendations using rule-based classification",
      "Admin dashboard with system analytics and user/song management",
      "Fast text search using KMP (Knuth-Morris-Pratt) algorithm",
      "Merge Sort for efficient song filtering and ordering",
    ],
    challenges:
      "Implementing a persistent audio player that maintains playback state across page transitions and optimizing the KMP search for large song datasets.",
    learnings:
      "Mastered client-side audio management, advanced sorting/searching algorithms, and state persistence in Next.js.",
    image: "/images/projects/music-app.png",
    liveUrl: "https://music-web-app-opal.vercel.app",
    githubUrl: "https://github.com/saralbjr/music-web-app",
  },
  {
    id: "ecommerce-template",
    title: "Next.js eCommerce Platform",
    description:
      "A scalable, modern eCommerce template featuring a fully functional shopping cart, product filtering, and a clean UI powered by shadcn/ui.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Prisma", "PostgreSQL"],
    features: [
      "Full-featured shopping cart and persistence",
      "Advanced product filtering by category and attributes",
      "Seamless checkout flow and order management",
      "Middleware-based authentication and protected routes",
      "Responsive, high-performance UI components with shadcn/ui",
    ],
    challenges:
      "Managing complex global state for the shopping cart and ensuring smooth, bug-free checkout flows with server-side validation.",
    learnings:
      "Gained expertise in shadcn/ui component patterns, Next.js middleware, and optimizing eCommerce data fetching with Prisma.",
    image: "/images/projects/ecommerce.png",
    githubUrl: "https://github.com/saralbjr/ecommerce-template",
  },
];
