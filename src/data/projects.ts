export interface Project {
  id: string;
  title: string;
  niche: string;
  description: string;
  metrics: string[];
  strategies: string[];
  challenges: string;
  results: string;
  image: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: "digital-marketing-seo-practice",
    title: "Digital Marketing & SEO Practice",
    niche: "Self-Guided Learning & Practice",
    description:
      "Explored the fundamentals of search engine optimization, content strategies, and online branding patterns. Conducted research on current digital landscape trends and online customer behavior metrics.",
    metrics: ["SEO Basics", "Online Branding", "Consumer Behavior"],
    strategies: [
      "Keyword Analysis Basics",
      "Content Strategy Foundations",
      "Audience Engagement Curation",
    ],
    challenges: "Understanding and structuring content to match high-intent organic search intent.",
    results: "Built a solid foundational understanding of SEO guidelines and search indexing principles.",
    image: "/images/projects/seo-practice.png",
  },
  {
    id: "social-media-content-creation",
    title: "Social Media Content Creation",
    niche: "Personal Application & Content Planning",
    description:
      "Gained hands-on experience by creating, scheduling, and planning visual and written promotional assets for popular social channels, including Facebook and Instagram platforms.",
    metrics: ["Facebook & Instagram", "Content Curation", "Post Scheduling"],
    strategies: [
      "Caption Writing",
      "Visual Storytelling",
      "Engagement Strategies",
    ],
    challenges: "Formulating attractive, channel-specific layouts that encourage natural audience responses.",
    results: "Mastered consistent content calendars, caption formatting, and direct message handling.",
    image: "/images/projects/social-media.png",
  },
  {
    id: "personal-portfolio-website",
    title: "Personal Portfolio Website",
    niche: "Live Web Setup & Management",
    description:
      "Designed and launched a personal portfolio website to display credentials, applying clean navigation, basic SEO tagging structures, and a user-friendly aesthetic.",
    metrics: ["saralb.com.np", "Basic SEO Structure", "User Experience"],
    strategies: [
      "Domain Setup & Management",
      "Content Organization Layouts",
      "Metadata Optimization",
    ],
    challenges: "Integrating clean visual structures without distracting layout elements.",
    results: "Successfully set up a search-crawlable, mobile-responsive, high-performance personal web platform.",
    image: "/images/projects/portfolio-site.png",
    liveUrl: "https://saralb.com.np",
  },
];
