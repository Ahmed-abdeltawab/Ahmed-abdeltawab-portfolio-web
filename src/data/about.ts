// ============================================
// TYPE DEFINITIONS FOR ABOUT PAGE COMPONENTS
// ============================================
// NOTE: This file contains only type interfaces.
// All actual data is imported from respective data files:
// - personalInfo.ts (name, email, phone, etc.)
// - skills.ts (skills arrays)
// - experience.ts (work experience)
// - education.ts (education history)
// - summary.ts (professional summary/bio)
// ============================================

export interface Skill {
  name: string;
  proficiency: number; // 0-100
  category: "Frontend" | "Backend" | "Tools" | "Soft Skills";
  icon?: string;
  color?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  location?: string;
  description?: string;
  highlights?: string[];
  technologies?: string[];
  logo?: string;
  companyUrl?: string;
  current?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  metric?: string;
  color?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location?: string;
  availability?: string;
  profileImage: string;
  linkedin?: string;
  github?: string;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Helper to categorize skills by category type
export const getSkillsByCategory = (
  skills: Skill[],
  category: Skill["category"]
): Skill[] => {
  return skills.filter((skill) => skill.category === category);
};
