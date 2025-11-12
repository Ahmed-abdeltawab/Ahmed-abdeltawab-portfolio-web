// ============================================
// DATA TRANSFORMATIONS FOR ABOUT PAGE
// ============================================
// This file transforms real data from data folder
// into the format expected by About page components
// ============================================

import { personalInfo as rawPersonalInfo } from "./personalInfo";
import { summary } from "./summary";
import { skills as rawSkills } from "./skills";
import { experience as rawExperience } from "./experience";
import type { PersonalInfo, Skill, Experience, Achievement } from "./about";

// ============================================
// PERSONAL INFO TRANSFORMATION
// ============================================
export const personalInfo: PersonalInfo = {
  name: rawPersonalInfo.name,
  title: rawPersonalInfo.role, // "role" in data -> "title" in UI
  bio: summary, // Use professional summary as bio
  email: rawPersonalInfo.email,
  phone: rawPersonalInfo.phone,
  // TODO: Add location field to personalInfo.ts if needed
  location: "Fayoum, Egypt", // From education data (Fayoum University)
  // TODO: Add availability status to personalInfo.ts if needed
  availability: "Available for Work", // Default status
  profileImage: `/${rawPersonalInfo.img}`, // Add leading slash for public folder
  linkedin: rawPersonalInfo.linkedin,
  github: rawPersonalInfo.github,
};

// ============================================
// SKILLS TRANSFORMATION
// ============================================
// Transform skills array into Skill objects with proficiency and category
export const skills: Skill[] = [
  // Frontend Skills
  ...rawSkills.frontend.map((skillName, index) => ({
    name: skillName,
    // Assign proficiency based on position (earlier = higher proficiency)
    proficiency: 95 - index * 2,
    category: "Frontend" as const,
    color: ["#00f7ff", "#4dabf7", "#bf5af2"][index % 3],
  })),

  // Tools
  ...rawSkills.tools.map((skillName, index) => ({
    name: skillName,
    proficiency: 90 - index * 2,
    category: "Tools" as const,
    color: ["#4dabf7", "#bf5af2", "#00f7ff"][index % 3],
  })),

  // Deployment (categorized as Tools)
  ...rawSkills.deployment.map((skillName, index) => ({
    name: skillName,
    proficiency: 85 - index * 2,
    category: "Tools" as const,
    color: ["#00f7ff", "#51cf66"][index % 2],
  })),

  // TODO: Add backend proficiency data if you have Node.js backend experience
  // Currently only "basic hands-on experience with Node.js" mentioned in summary
  {
    name: "Node.js",
    proficiency: 60, // Basic level based on summary
    category: "Backend",
    color: "#51cf66",
  },
];

// ============================================
// EXPERIENCE TRANSFORMATION
// ============================================
// Transform experience data into Experience objects for timeline
export const experiences: Experience[] = rawExperience.map((exp, index) => ({
  id: String(index + 1),
  company: exp.company,
  position: exp.role,
  duration: exp.duration,
  location: exp.location,
  description: exp.points[0], // Use first point as description
  highlights: exp.points.slice(1), // Rest of points as highlights
  // TODO: Extract technologies from experience descriptions if needed
  technologies: [], // Not available in current data structure
  current: exp.duration.includes("Present"),
}));

// ============================================
// ACHIEVEMENTS
// ============================================
// TODO: Add real achievement metrics to data folder if available
// For now, using placeholder structure with comments
export const achievements: Achievement[] = [
  // TODO: Add real "Years of Experience" metric
  // Based on experience data: May 2025 - Present + July 2023 - Dec 2023 = ~2 years
  {
    id: "1",
    title: "Experience",
    description: "Years of professional work",
    icon: "Award",
    metric: "2+", // Calculated from experience data
    color: "#00f7ff",
  },
  // TODO: Add real "Projects Delivered" count from projects.ts
  {
    id: "2",
    title: "Projects Completed",
    description: "Successfully delivered projects",
    icon: "Briefcase",
    metric: "10+", // Check projects.ts for accurate count
    color: "#bf5af2",
  },
  // TODO: Add real "Technologies Mastered" count
  {
    id: "3",
    title: "Technologies",
    description: "Frontend tools & frameworks",
    icon: "Code",
    metric: String(rawSkills.frontend.length + rawSkills.tools.length),
    color: "#4dabf7",
  },
  // TODO: Add GitHub stats if available
  {
    id: "4",
    title: "Open Source",
    description: "GitHub contributions",
    icon: "Github",
    metric: "Active", // TODO: Get real GitHub stats via API
    color: "#51cf66",
  },
];
