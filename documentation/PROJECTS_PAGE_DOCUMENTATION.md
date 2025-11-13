# 📁 Projects Page Implementation Documentation

## 🎯 Overview

This document provides comprehensive documentation for the **Projects Page** feature — a modern, interactive, and accessible project showcase with advanced filtering, detailed modals, analytics visualizations, and liquid glass aesthetics.

---

## 📦 Package Dependencies

```bash
npm install framer-motion lenis recharts
```

### Dependency Breakdown

| Package         | Version | Purpose                                           |
| --------------- | ------- | ------------------------------------------------- |
| `framer-motion` | ^11.x   | Animations, transitions, gestures, spring physics |
| `lenis`         | ^1.x    | Smooth scrolling with custom easing               |
| `recharts`      | ^2.x    | Data visualizations (radial charts, bar charts)   |
| `lucide-react`  | Latest  | Icon library (GitHub, Calendar, Filter, etc.)     |
| `next`          | 15.x    | Framework with Image optimization                 |

---

## 🗂 File Structure

```
src/
├── data/
│   └── enhancedProjects.ts          # Project data with TypeScript types
├── components/
│   ├── projects/
│   │   ├── project-card.tsx          # Glassmorphism project card
│   │   ├── project-modal.tsx         # Full-screen detailed modal
│   │   ├── projects-filter.tsx       # Category/sort filter UI
│   │   └── projects-page.tsx         # Main projects page composition
│   └── ui/
│       ├── cursor-glow-trail.tsx     # Custom cursor effect
│       └── reveal.tsx                # Scroll-triggered animations
└── app/
    └── globals.css                   # Liquid glass utilities
```

---

## 📋 Data Structure

### TypeScript Interfaces

```typescript
// Project Categories
export type ProjectCategory =
  | "Frontend"
  | "Full-Stack"
  | "AI/ML"
  | "E-Commerce"
  | "Personal";

// Link Types
export interface ProjectLink {
  type: "github" | "live" | "demo" | "figma";
  url: string;
  label?: string;
}

// Project Statistics
export interface ProjectStats {
  completion: number; // 0-100
  duration: string;
  team?: string;
}

// Main Project Interface
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
  color?: string; // Accent color (OKLCH format)
}
```

### Utility Functions

```typescript
// Filter projects by category
export function filterProjectsByCategory(
  projects: Project[],
  category: ProjectCategory
): Project[] {
  return projects.filter((project) => project.category === category);
}

// Sort projects by different criteria
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
```

---

## 🎨 Component API Reference

### 1. **ProjectCard** Component

**Path:** `components/projects/project-card.tsx`

#### Props Interface

```typescript
interface ProjectCardProps {
  project: Project;
  index: number; // For staggered animations
  onClick: () => void; // Open modal handler
}
```

#### Features

- ✅ **Glassmorphism styling** with `.glass-card` and `.border-gradient-animated`
- ✅ **Hover glow effect** with pulsing animation
- ✅ **Image zoom on hover** (scale: 1.1x with smooth transition)
- ✅ **Category and Featured badges** with color-coded styling
- ✅ **Hover overlay** with GitHub/Live link icons
- ✅ **Expandable tech stack pills** (show first 4, expand on hover)
- ✅ **Animated progress bar** with gradient fill
- ✅ **Staggered reveal animation** (0.1s delay per card)

#### Usage Example

```tsx
<ProjectCard
  project={projectData}
  index={0}
  onClick={() => setSelectedProject(projectData)}
/>
```

---

### 2. **ProjectModal** Component

**Path:** `components/projects/project-modal.tsx`

#### Props Interface

```typescript
interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}
```

#### Features

- ✅ **Full-screen modal** with backdrop blur
- ✅ **Image carousel** with navigation arrows and indicators
- ✅ **Recharts visualizations:**
  - Radial bar chart for project completion percentage
  - Bar chart for tech stack proficiency
- ✅ **Project metadata** (category, year, duration, role)
- ✅ **Action links** (GitHub, Live Demo, Video Demo)
- ✅ **Key highlights list** with animated bullets
- ✅ **Tech stack pills** with hover animations
- ✅ **Keyboard navigation** (Escape to close)
- ✅ **Framer Motion animations** (scale, fade, spring)

#### Chart Customization

```tsx
// Progress Chart
<RadialBarChart
  innerRadius="60%"
  outerRadius="90%"
  startAngle={90}
  endAngle={-270}
>
  <RadialBar
    dataKey="value"
    cornerRadius={10}
    fill="oklch(0.75 0.25 195)" // Cyan
  />
</RadialBarChart>

// Tech Stack Chart
<BarChart data={techStackData} layout="vertical">
  <XAxis type="number" domain={[0, 100]} />
  <YAxis type="category" dataKey="name" />
  <Bar dataKey="value" radius={[0, 8, 8, 0]} />
</BarChart>
```

#### Usage Example

```tsx
{
  selectedProject && (
    <ProjectModal
      project={selectedProject}
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    />
  );
}
```

---

### 3. **ProjectsFilter** Component

**Path:** `components/projects/projects-filter.tsx`

#### Props Interface

```typescript
interface ProjectsFilterProps {
  activeCategory: ProjectCategory | "All";
  onCategoryChange: (category: ProjectCategory | "All") => void;
  sortBy: "date" | "name" | "category";
  onSortChange: (sort: "date" | "name" | "category") => void;
  projectCount: number;
}
```

#### Features

- ✅ **Category filter buttons** with animated active state
- ✅ **Sort dropdown** (Latest First, Name A-Z, Category)
- ✅ **Project count display**
- ✅ **Active filter indicator** with clear button
- ✅ **Animated layout transitions** using `layoutId`
- ✅ **Responsive horizontal scroll** on mobile

#### Categories

- All
- Frontend
- Full-Stack
- AI/ML
- E-Commerce
- Personal

#### Usage Example

```tsx
<ProjectsFilter
  activeCategory={activeCategory}
  onCategoryChange={setActiveCategory}
  sortBy={sortBy}
  onSortChange={setSortBy}
  projectCount={filteredProjects.length}
/>
```

---

### 4. **ProjectsPage** Component

**Path:** `components/projects/projects-page.tsx`

#### Features

- ✅ **State management** for filters, sorting, modal
- ✅ **Responsive grid layout:**
  - Mobile: 1 column
  - Tablet: 2 columns (sm:)
  - Desktop: 3 columns (lg:)
  - Large Desktop: 4 columns (xl:)
- ✅ **Staggered card animations** (0.1s delay per item)
- ✅ **Empty state handling** with "View All Projects" button
- ✅ **AnimatePresence** for smooth filter transitions
- ✅ **useMemo** for optimized filtering/sorting

#### State Management

```tsx
const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">(
  "All"
);
const [sortBy, setSortBy] = useState<"date" | "name" | "category">("date");
const [selectedProject, setSelectedProject] = useState<Project | null>(null);
const [isModalOpen, setIsModalOpen] = useState(false);

const filteredAndSortedProjects = useMemo(() => {
  const filtered =
    activeCategory === "All"
      ? enhancedProjects
      : filterProjectsByCategory(enhancedProjects, activeCategory);
  return sortProjects(filtered, sortBy);
}, [activeCategory, sortBy]);
```

---

### 5. **CursorGlowTrail** Component

**Path:** `components/ui/cursor-glow-trail.tsx`

#### Features

- ✅ **Gradient glow following cursor** using spring physics
- ✅ **Desktop-only rendering** (checks `@media (hover: hover)`)
- ✅ **Three-layer glow:**
  1. Large outer glow (25em, 4em blur)
  2. Medium inner glow (15em, 3em blur)
  3. Small dot cursor (1em, 0.1em blur)
- ✅ **pointer-events-none** (no click interference)
- ✅ **Spring configuration:**
  - Damping: 25
  - Stiffness: 150
  - Mass: 0.5

#### Integration

Add to `app/layout.tsx`:

```tsx
import CursorGlowTrail from "@/components/ui/cursor-glow-trail";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SmoothScrollProvider>
          <AnimatedBackground />
          <CursorGlowTrail /> {/* Add here */}
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
```

---

## 🎨 Styling System

### Glassmorphism Classes

All components use the liquid glass design system from `globals.css`:

```css
/* Glass Variants */
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-strong {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(30px);
}

.glass-button {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

/* Animated Gradient Border */
.border-gradient-animated {
  position: relative;
  border: 2px solid transparent;
  background: linear-gradient(to right, var(--primary), var(--accent)) border-box;
  animation: liquidGradient 4s ease infinite;
}

/* Gradient Text */
.text-gradient-animated {
  background: linear-gradient(
    45deg,
    oklch(0.75 0.25 195),
    oklch(0.75 0.22 320),
    oklch(0.75 0.25 195)
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: liquidGradient 4s ease infinite;
}
```

### Color Palette

```css
:root {
  --background: 212 100% 3%; /* #0a0a0f */
  --foreground: 0 0% 98%; /* #fafafa */
  --primary: oklch(0.75 0.25 195); /* Cyan #00f7ff */
  --accent: oklch(0.75 0.22 320); /* Purple #bf5af2 */
  --gradient-1: oklch(0.75 0.25 195);
  --gradient-2: oklch(0.7 0.2 240);
  --gradient-3: oklch(0.75 0.22 320);
  --gradient-4: oklch(0.68 0.19 340);
}
```

---

## 🎭 Animation System

### Framer Motion Configurations

#### Staggered Reveal (ProjectCard)

```tsx
<motion.article
  initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
  transition={{
    duration: 0.6,
    delay: index * 0.1, // Stagger delay
    ease: [0.22, 1, 0.36, 1],
  }}
/>
```

#### Hover Effects

```tsx
<motion.div
  whileHover={{
    scale: 1.02,
    y: -12,
    transition: { duration: 0.3 },
  }}
/>
```

#### Modal Animations

```tsx
// Backdrop
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
/>

// Content
<motion.div
  initial={{ scale: 0.9, y: 50 }}
  animate={{ scale: 1, y: 0 }}
  exit={{ scale: 0.9, y: 50 }}
  transition={{
    type: 'spring',
    damping: 25,
    stiffness: 300
  }}
/>
```

#### Filter Transitions

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={`${activeCategory}-${sortBy}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {/* Grid content */}
  </motion.div>
</AnimatePresence>
```

---

## ♿ Accessibility Features

### Keyboard Navigation

- ✅ **Escape key** closes modal
- ✅ **Tab navigation** through all interactive elements
- ✅ **Focus visible states** on buttons and links

### ARIA Labels

```tsx
// Modal
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">{project.name}</h2>
</div>

// Buttons
<button aria-label="Close modal">
  <X />
</button>

<button aria-label="Previous image">
  <ChevronLeft />
</button>

// Filter
<button aria-pressed={isActive} aria-label={`Filter by ${category}`}>
  {category}
</button>
```

### Semantic HTML

- `<article>` for project cards
- `<nav>` for filters
- `<dialog>` pattern for modal
- Meaningful heading hierarchy (h2, h3)

---

## 📱 Responsive Design

### Breakpoints

| Breakpoint | Tailwind | Grid Columns | Container Padding |
| ---------- | -------- | ------------ | ----------------- |
| Mobile     | Default  | 1            | 1em               |
| Tablet     | sm:      | 2            | 2em               |
| Desktop    | lg:      | 3            | 2em               |
| Large      | xl:      | 4            | 2em               |

### Grid Configuration

```tsx
<div className="grid gap-[1.5em] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {/* Cards */}
</div>
```

### Modal Responsive

```tsx
<div className="max-w-[75em] w-full p-[1.5em] sm:p-[2.5em]">
  {/* Modal content */}
</div>
```

---

## 🚀 Performance Optimizations

### 1. Memoization

```tsx
const filteredAndSortedProjects = useMemo(() => {
  // Expensive filtering/sorting
}, [activeCategory, sortBy]);
```

### 2. Next.js Image Optimization

```tsx
<Image
  src={project.img}
  alt={project.name}
  fill
  className="object-cover"
  priority={index < 4} // Prioritize first 4 images
/>
```

### 3. Conditional Rendering

- Cursor glow only on desktop
- Charts only when modal is open
- Animations respect `prefers-reduced-motion`

### 4. Code Splitting

All components use `'use client'` only when needed (Framer Motion, hooks).

---

## 🧪 Testing Checklist

### Functional Testing

- [ ] Filter by each category works correctly
- [ ] Sort by date/name/category updates grid
- [ ] Click project card opens modal
- [ ] Modal displays correct project data
- [ ] Image carousel navigation works
- [ ] External links open in new tab
- [ ] Charts render with correct data

### Accessibility Testing

- [ ] Keyboard navigation (Tab, Escape)
- [ ] Screen reader announces content correctly
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Alt text on all images

### Responsive Testing

- [ ] Mobile (320px-640px): 1 column layout
- [ ] Tablet (640px-1024px): 2 columns
- [ ] Desktop (1024px-1280px): 3 columns
- [ ] Large (1280px+): 4 columns
- [ ] Modal scrollable on small screens
- [ ] Filter buttons scroll horizontally on mobile

### Performance Testing

- [ ] Lighthouse score ≥ 90 (Performance)
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] No layout shifts during animations

### Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

---

## 🎯 Usage Guide

### Basic Implementation

**Step 1:** Import the ProjectsPage component

```tsx
import ProjectsPage from "@/components/projects/projects-page";
```

**Step 2:** Add to your route

```tsx
// app/works/page.tsx
export default function WorksPage() {
  return <ProjectsPage />;
}
```

**Step 3:** Ensure dependencies are installed

```bash
npm install framer-motion recharts lenis
```

### Adding New Projects

1. Open `data/enhancedProjects.ts`
2. Add new project object to `enhancedProjects` array:

```typescript
{
  id: "5",
  name: "Your Project",
  slug: "your-project",
  category: "Frontend", // or Full-Stack, AI/ML, etc.
  description: "Brief description...",
  role: "Front-End Developer",
  duration: "Jan 2025 – Mar 2025",
  techStack: ["React", "Next.js", "TypeScript"],
  points: [
    "Key achievement 1",
    "Key achievement 2",
  ],
  img: "/images/project.png",
  images: ["/images/project1.png", "/images/project2.png"],
  links: [
    { type: "github", url: "https://github.com/..." },
    { type: "live", url: "https://demo.com" },
  ],
  stats: {
    completion: 100,
    duration: "3 months",
    team: "Solo",
  },
  featured: true,
  year: 2025,
  color: "#00f7ff",
}
```

### Customizing Categories

Edit `data/enhancedProjects.ts`:

```typescript
export type ProjectCategory =
  | "Frontend"
  | "Full-Stack"
  | "AI/ML"
  | "Mobile" // Add new category
  | "E-Commerce"
  | "Personal";
```

Update `components/projects/projects-filter.tsx`:

```typescript
const categories: Array<ProjectCategory | "All"> = [
  "All",
  "Frontend",
  "Full-Stack",
  "AI/ML",
  "Mobile", // Add to filter list
  "E-Commerce",
  "Personal",
];
```

---

## 🎨 Customization Options

### Change Grid Columns

```tsx
// In projects-page.tsx
<div className="grid gap-[1.5em] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

### Adjust Animation Timings

```tsx
// In project-card.tsx
transition={{
  duration: 0.6,    // Change duration
  delay: index * 0.15,  // Increase stagger delay
  ease: [0.22, 1, 0.36, 1],
}}
```

### Modify Chart Colors

```tsx
// In project-modal.tsx
fill = "oklch(0.75 0.25 195)"; // Change to your primary color
```

### Update Glassmorphism Intensity

```css
/* In globals.css */
.glass-card {
  background: rgba(255, 255, 255, 0.1); /* Increase for stronger effect */
  backdrop-filter: blur(30px); /* Increase blur */
}
```

---

## 📊 File Size Reference

| File                    | Lines | Size  | Purpose         |
| ----------------------- | ----- | ----- | --------------- |
| `enhancedProjects.ts`   | ~190  | ~7KB  | Project data    |
| `project-card.tsx`      | ~235  | ~9KB  | Card component  |
| `project-modal.tsx`     | ~400  | ~18KB | Modal component |
| `projects-filter.tsx`   | ~120  | ~5KB  | Filter UI       |
| `projects-page.tsx`     | ~120  | ~5KB  | Main page       |
| `cursor-glow-trail.tsx` | ~90   | ~3KB  | Cursor effect   |

**Total:** ~47KB (uncompressed)

---

## 🐛 Troubleshooting

### Issue: Charts Not Rendering

**Solution:** Ensure Recharts is installed:

```bash
npm install recharts
```

### Issue: Modal Not Closing

**Solution:** Check that `onClose` prop is passed correctly and state is managed in parent.

### Issue: Animations Lag on Low-End Devices

**Solution:** Add performance hints:

```css
.glass-card {
  will-change: transform;
  transform: translateZ(0);
}
```

### Issue: Images Not Loading

**Solution:** Verify image paths in `public/` folder and use correct relative paths.

---

## 📚 Additional Resources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Recharts Documentation](https://recharts.org/)
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Tailwind CSS v4 Guide](https://tailwindcss.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## ✅ Completion Checklist

- [x] Enhanced project data structure with TypeScript
- [x] ProjectCard component with glassmorphism
- [x] ProjectModal with charts and carousel
- [x] ProjectsFilter with category/sort
- [x] Main ProjectsPage composition
- [x] CursorGlowTrail effect
- [x] Responsive grid layout (1/2/3/4 columns)
- [x] Framer Motion animations (reveal, hover, modal)
- [x] Recharts integration (radial + bar charts)
- [x] Accessibility features (ARIA, keyboard nav)
- [x] Performance optimizations (memoization, lazy loading)
- [x] Complete documentation

---

**Created:** 2025
**Version:** 1.0.0
**License:** MIT
**Author:** Your Name

**Tech Stack:** Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Recharts · Lenis
