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
    id: "cloudfactory",
    title: "Image Annotation Specialist",
    company: "CloudFactory",
    dateRange: "May 2025 – Present",
    description:
      "Working on annotating images and videos for machine learning training datasets, building tagging systems and quality assurance processes.",
    achievements: [
      "Annotated 10,000+ images for ML training datasets",
      "Built internal tagging and classification system",
      "Improved annotation accuracy through quality checks",
      "Collaborated with global distributed teams",
    ],
  },
];
