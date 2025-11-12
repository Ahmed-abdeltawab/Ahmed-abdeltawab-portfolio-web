---
applyTo: "**"
---

Excellent 👍 Here’s your **fully updated `CODING_GUIDELINES.md`** — rewritten to align with **Next.js 15**, **Tailwind CSS v4**, **Shadcn**, and **Lucide React** best practices (including all updates from the official Tailwind v4 upgrade guide).

---

````markdown
# 🧱 Project Coding Guidelines

**Apply To:** `**`  
**Project:** Personal Portfolio Website  
**Tech Stack:** Next.js 15 · Tailwind CSS v4 · Shadcn/UI · Lucide React

---

## 🗂 Project Structure & Architecture

- Use the **App Router (Next.js 15)** — each route should be a folder inside the `app/` directory.
- **Component organization:**
  - `components/ui/` → Reusable UI elements (Button, Card, Modal, etc.)
  - `components/sections/` → Page sections (Hero, About, Contact, etc.)
  - `components/shared/` → Layout and global components (Navbar, Footer, Layout)
- Every component should use a **default export**.
- Use **TypeScript** with clearly defined `Props` interfaces.
- Follow the **single responsibility principle** — one component = one purpose.

---

## 🎨 Styling Guidelines (Tailwind CSS v4 + Shadcn/UI)

### General Rules

- Prefer **Tailwind utility classes** for all styling; use custom CSS only if necessary.
- Use **Shadcn/UI components** as the design foundation to ensure accessibility and consistency.
- Define all design tokens (colors, spacing, typography, radii) inside `tailwind.config.ts` under the `theme` key.
- Avoid inline styles; define style logic via utilities or variants.

### Tailwind CSS v4 Specific Updates

- **CSS Variables:** Tailwind v4 uses CSS variables for theme values.
  ```css
  .custom-bg {
    background-color: var(--color-blue-500);
  }
  ```
````

- **Custom Utilities:** Use the new `@utility` directive instead of `@layer utilities`.

  ```css
  @utility btn-primary {
    @apply bg-blue-500 text-white py-2 px-4 rounded;
  }
  ```

- **Renamed Utilities:**

  - `shadow-sm` → `shadow-xs`
  - `shadow` → `shadow-sm`
  - `outline-none` → `outline-hidden`

- **Arbitrary Values Syntax:** Use parentheses for CSS variables.

  ```html
  <div class="bg-(--brand-color)"></div>
  ```

- **Container Config:** Use custom utilities instead of legacy container options (`center`, `padding`, etc.).
- **Hover Variants:** `hover:` now applies only on devices that support hover.
- **corePlugins:** disabling plugins via `corePlugins` is no longer supported.

---

## 📏 Design System & Units

- The **parent container** must define `font-size` or `text-size` using `rem`.
- All **child elements** (text, padding, margin, border-radius, etc.) must use `em` units — so that scaling the parent updates all children.
- Use **% (percentages)** for widths and heights.
- **Never use `px` units** anywhere.
- For responsive typography, use CSS functions like:

  ```css
  font-size: clamp(1rem, 2vw, 1.5rem);
  ```

- Create custom spacing scales in `tailwind.config.ts` using relative units for consistent spacing.

---

## 🌗 Theming & Dark Mode

- Enable **dark mode** using the `class` strategy in `tailwind.config.ts`.
- Define theme colors for both light and dark variants using CSS variables:

  ```css
  :root {
    --color-background: 255 255 255;
    --color-foreground: 0 0 0;
  }

  .dark {
    --color-background: 0 0 0;
    --color-foreground: 255 255 255;
  }
  ```

- Use `next-themes` or `data-theme` for theme toggling.

---

## 🧠 Code Quality

- Use **ESLint + Prettier** for consistent formatting:

  ```json
  {
    "semi": false,
    "singleQuote": true,
    "trailingComma": "all",
    "tabWidth": 2,
    "endOfLine": "lf"
  }
  ```

- Add **Husky + lint-staged** to auto-lint and format before each commit.
- Import order convention:

  1. React / Next.js
  2. Third-party libraries (Lucide, Shadcn, etc.)
  3. Internal modules (components, utils, hooks, styles)

- All components and hooks must use **TypeScript** types.
- Avoid inline anonymous functions inside JSX where possible.

---

## ⚙️ Performance & Optimization

- Use **Next.js dynamic imports** for large components:

  ```ts
  const Hero = dynamic(() => import("@/components/sections/hero"));
  ```

- Always use the **Next.js `<Image />`** component for images.
- Optimize fonts using **next/font**.
- Memoize components using `React.memo`, `useMemo`, and `useCallback` when beneficial.
- Minimize prop drilling — use context or props composition instead.

---

## 🧩 Icons (Lucide React)

- Import icons selectively:

  ```tsx
  import { Github, Linkedin } from "lucide-react";
  ```

- Use relative units for icon size to scale with text:

  ```tsx
  <Github className="w-[1.2em] h-[1.2em]" />
  ```

---

## 🌐 Accessibility & SEO

- Always use **semantic HTML** (`<header>`, `<main>`, `<footer>`, etc.).
- All images must include meaningful `alt` attributes.
- Define page metadata using Next.js metadata API (`title`, `description`, `openGraph`).
- Validate accessibility and SEO using **Lighthouse** (target score ≥ 90).

---

## 🧾 Naming Conventions

| Type        | Convention        | Example                 |
| ----------- | ----------------- | ----------------------- |
| Pages       | lowercase-hyphen  | `about-me/`, `contact/` |
| Components  | PascalCase        | `HeroSection.tsx`       |
| Hooks       | camelCase + `use` | `useScrollPosition.ts`  |
| Utils       | camelCase         | `formatDate.ts`         |
| CSS Classes | kebab-case        | `section-header`        |

✅ **Reference:**
Based on the official [Tailwind CSS v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide) and Next.js 15 App Router best practices.
