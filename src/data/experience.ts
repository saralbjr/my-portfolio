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
    id: "seo-digital-marketing-specialist",
    title: "SEO & Digital Marketing Specialist",
    company: "Infotraid Digital Marketing",
    dateRange: "Feb 2025 – August 2025",
    description:
      "Planning and executing data-driven SEO strategies, social media campaigns, and marketing funnels to scale organic client growth.",
    achievements: [
      "Increased organic search traffic by 120% through comprehensive technical SEO audits and keyword research",
      "Improved search engine visibility and top-3 organic rankings for high-value competitive terms",
      "Optimized client Google Business Profiles, resulting in an 85% lift in local Map pack interactions",
      "Designed and launched automated email marketing sequences, generating a 28% open rate and +45% in lead volume",
      "Monitored traffic flow, user behavior, and conversion attribution using Google Analytics 4 and Tag Manager",
      "Developed high-converting copy and content calendars across social channels, boosting engagement by 65%",
      "Executed Conversion Rate Optimization (CRO) audits on landing pages to streamline user flows and call-to-actions",
      "Configured robust structured schema markup to achieve rich snippet results in SERPs",
    ],
  },
];
