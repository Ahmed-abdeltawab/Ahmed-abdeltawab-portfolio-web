export type ProjectCategory =
  | "Frontend"
  | "Full-Stack"
  | "AI/ML"
  | "E-Commerce"
  | "Personal";

export interface ProjectLink {
  type: "github" | "live" | "demo" | "figma";
  url: string;
  label?: string;
}

export interface ProjectStats {
  completion: number; // 0-100
  duration: string;
  team?: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  category: ProjectCategory;
  description: string;
  role: string;
  duration: string;
  techStack: string[];
  points: string[];
  img: string;
  images?: string[]; // Additional screenshots
  links?: ProjectLink[];
  stats?: ProjectStats;
  featured?: boolean;
  year: number;
  color?: string; // Accent color for the card
}

// Extended projects data with enhanced metadata
export const enhancedProjects: Project[] = [
  {
    id: "1",
    name: "AI-Agent Dashboard",
    slug: "ai-agent-dashboard",
    category: "AI/ML",
    description:
      "Full-featured AI-powered WhatsApp Business Bot Dashboard with customer conversation management and multi-role access.",
    role: "Front-End Developer",
    duration: "May 2025 – Present",
    techStack: [
      "Next.js 15",
      "React 19",
      "Tailwind CSS",
      "TanStack Query",
      "TipTap",
      "Recharts",
      "AWS EC2",
    ],
    points: [
      "Built a full-featured AI-powered WhatsApp Business Bot Dashboard with customer conversation management and multi-role access.",
      "Implemented live chat, drag-and-drop templates, TipTap rich text editor, and analytics with Recharts.",
      "Deployed using AWS EC2, Nginx, SSL, and automation scripts.",
      "Optimized UX with infinite scroll, advanced filtering, toasts, and multilingual/RTL support.",
    ],
    img: "/ai-agent-rag.png",
    images: ["/ai-agent-rag.png", "/ai-agent-rag.png"],
    links: [
      { type: "live", url: "https://logodiffusion.com/", label: "Live Demo" },
    ],
    stats: {
      completion: 95,
      duration: "May 2025 – Present",
      team: "Solo Project",
    },
    featured: true,
    year: 2025,
    color: "#00f7ff", // Cyan
  },
  {
    id: "2",
    name: "LogoDiffusion",
    slug: "logo-diffusion",
    category: "Frontend",
    description:
      "Gallery system with 4 gallery types, bulk operations, and drag-and-drop reordering.",
    role: "Front-End Developer",
    duration: "May 2025 – Present",
    techStack: ["React", "Redux", "TypeScript", "@dnd-kit", "REST API"],
    points: [
      "Developed a gallery system with 4 gallery types, bulk operations, and drag-and-drop reordering.",
      "Implemented advanced filtering, optimistic UI updates, and request cancellation.",
      "Enhanced UI with modals, dropdowns, skeleton loaders, and confirmation dialogs.",
      "Collaborated on backend (Node.js), improving practical backend experience.",
    ],
    img: "/logo-diffusion1.webp",
    links: [{ type: "github", url: "https://github.com", label: "View Code" }],
    stats: {
      completion: 100,
      duration: "May 2025",
      team: "Collaborative",
    },
    featured: true,
    year: 2025,
    color: "#bf5af2", // Purple
  },
  {
    id: "3",
    name: "Lifeward",
    slug: "lifeward",
    category: "E-Commerce",
    description:
      "E-commerce platform for flowers and gifts with filtering, favorites, and responsive design.",
    role: "Front-End Developer",
    duration: "March 2024 – May 2024",
    techStack: ["ReactJS", "Redux Toolkit"],
    points: [
      "Built an e-commerce platform for flowers and gifts with filtering, favorites, and responsive design.",
    ],
    links: [
      { type: "live", url: "https://life-ward.com/", label: "Live Demo" },
    ],
    img: "/life-ward.jpeg",
    stats: {
      completion: 100,
      duration: "3 months",
      team: "Team of 3",
    },
    year: 2024,
    color: "#4dabf7", // Soft Blue
  },
  {
    id: "4",
    name: "Aswar Almanora",
    slug: "aswar-almanora",
    category: "Frontend",
    description:
      "Modern frontend application with responsive design and state management.",
    role: "Front-End Developer",
    duration: "July 2023 – Sept 2023",
    techStack: ["ReactJS", "Redux Toolkit"],
    links: [{ type: "live", url: "https://aswarmn.com/", label: "Live Demo" }],
    points: [
      "Developed responsive frontend application with modern design principles.",
      "Implemented state management using Redux Toolkit for efficient data flow.",
    ],
    img: "/ai-agent-rag.png",
    stats: {
      completion: 100,
      duration: "3 months",
    },
    year: 2023,
    color: "#00f7ff",
  },
  {
    id: "5",
    name: "YouTube Clone",
    slug: "youtube-clone",
    category: "Full-Stack",
    description:
      "Full-stack YouTube clone with video streaming and user authentication",
    role: "Full-Stack Developer",
    duration: "2 months",
    techStack: ["ReactJS", "NodeJS", "ExpressJS", "MongoDB"],
    points: [
      "Built full-stack video streaming platform with user authentication",
    ],
    img: "/ai-agent-rag.png",
    links: [
      {
        type: "live",
        url: "https://media-youtube-clone.netlify.app/",
        label: "Live Demo",
      },
    ],
    stats: {
      completion: 100,
      duration: "2 months",
    },
    year: 2023,
    color: "#4dabf7",
  },
];

// Category colors
export const categoryColors: Record<ProjectCategory, string> = {
  Frontend: "#4dabf7",
  "Full-Stack": "#00f7ff",
  "AI/ML": "#bf5af2",
  "E-Commerce": "#ffa94d",
  Personal: "#51cf66",
};

// Filter and sort utilities
export function filterProjectsByCategory(
  projects: Project[],
  category: ProjectCategory | "All"
): Project[] {
  if (category === "All") return projects;
  return projects.filter((p) => p.category === category);
}

export function sortProjects(
  projects: Project[],
  sortBy: "date" | "name" | "category"
): Project[] {
  const sorted = [...projects];
  switch (sortBy) {
    case "date":
      return sorted.sort((a, b) => b.year - a.year);
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "category":
      return sorted.sort((a, b) => a.category.localeCompare(b.category));
    default:
      return sorted;
  }
}
