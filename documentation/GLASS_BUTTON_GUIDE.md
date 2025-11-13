# 🔘 GlassButton Component - Usage Guide

## Overview

**`GlassButton`** is a reusable, theme-aware button component with glassmorphism styling. It supports links, downloads, icons, multiple variants, and automatic theme color adaptation.

---

## 📦 Location

```
src/components/ui/glass-button.tsx
```

---

## ✨ Features

- ✅ **Theme-aware** - Automatically adapts to current theme
- ✅ **Multiple variants** - Primary, Secondary, Ghost
- ✅ **Three sizes** - Small, Medium, Large
- ✅ **Icon support** - Any Lucide React icon
- ✅ **Link or Button** - Use as `<a>` or `<button>`
- ✅ **Download support** - For file downloads
- ✅ **External links** - Automatic `target="_blank"`
- ✅ **Disabled state** - With proper styling
- ✅ **Animated** - Hover effects, shimmer, glow
- ✅ **Glassmorphism** - Blur, transparency, smooth transitions
- ✅ **Fully typed** - TypeScript support

---

## 🎯 Props

```typescript
interface GlassButtonProps {
  children: ReactNode;           // Button text
  href?: string;                 // Link URL (makes it a <a> tag)
  icon?: LucideIcon;            // Icon component (e.g., Download)
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  download?: string | boolean;   // File download name
  external?: boolean;            // Open in new tab
  disabled?: boolean;            // Disabled state
  className?: string;            // Additional classes
  ...HTMLMotionProps<"button">  // All Framer Motion props
}
```

---

## 📝 Usage Examples

### 1. Basic Button

```tsx
import GlassButton from "@/components/ui/glass-button";

<GlassButton>Click me</GlassButton>;
```

### 2. Link Button (Navigation)

```tsx
<GlassButton href="/contact">Contact me</GlassButton>
```

### 3. Download Button

```tsx
import { Download } from "lucide-react";

<GlassButton
  href="/cv/resume.pdf"
  download="my-resume.pdf"
  icon={Download}
  variant="primary"
>
  Download CV
</GlassButton>;
```

### 4. External Link

```tsx
import { ExternalLink } from "lucide-react";

<GlassButton
  href="https://github.com/username"
  external
  icon={ExternalLink}
  variant="secondary"
>
  View GitHub
</GlassButton>;
```

### 5. With Icon

```tsx
import { ArrowRight } from "lucide-react";

<GlassButton href="/projects" icon={ArrowRight} variant="primary" size="lg">
  View Projects
</GlassButton>;
```

### 6. Form Submit Button

```tsx
import { Send } from "lucide-react";

<GlassButton type="submit" icon={Send} variant="primary" disabled={isLoading}>
  {isLoading ? "Sending..." : "Send Message"}
</GlassButton>;
```

### 7. Multiple Buttons

```tsx
<div className="flex gap-[1em]">
  <GlassButton href="/contact" variant="primary" icon={Mail}>
    Contact
  </GlassButton>

  <GlassButton href="/about" variant="secondary">
    Learn More
  </GlassButton>

  <GlassButton href="/cv.pdf" download variant="ghost" icon={Download}>
    CV
  </GlassButton>
</div>
```

---

## 🎨 Variants

### Primary

- **Background:** Theme primary/accent gradient
- **Glow:** Animated pulsing glow effect
- **Use case:** Call-to-action, important actions

```tsx
<GlassButton variant="primary">Primary Action</GlassButton>
```

### Secondary (Default)

- **Background:** Glass surface gradient
- **Glow:** None
- **Use case:** Secondary actions, navigation

```tsx
<GlassButton variant="secondary">Secondary Action</GlassButton>
```

### Ghost

- **Background:** Transparent
- **Glow:** None
- **Use case:** Subtle actions, tertiary buttons

```tsx
<GlassButton variant="ghost">Ghost Button</GlassButton>
```

---

## 📏 Sizes

| Size | Padding        | Font Size | Use Case                        |
| ---- | -------------- | --------- | ------------------------------- |
| `sm` | 1em × 0.5em    | 0.85em    | Compact buttons, inline actions |
| `md` | 1.5em × 0.75em | 0.95em    | Default, most cases             |
| `lg` | 2em × 1em      | 1em       | Hero sections, prominent CTAs   |

```tsx
<GlassButton size="sm">Small</GlassButton>
<GlassButton size="md">Medium</GlassButton>
<GlassButton size="lg">Large</GlassButton>
```

---

## 🎬 Animations

### Hover Effects

- **Scale:** 1.05× on hover
- **Shimmer:** Gradient sweep animation
- **Glow:** Pulsing for primary variant
- **Icon:** Scale 1.1× on hover

### Tap Effect

- **Scale:** 0.98× on click

### Disabled State

- **Opacity:** 50%
- **Cursor:** Not-allowed
- **No animations**

---

## 🔧 Customization

### Add Custom Classes

```tsx
<GlassButton className="my-custom-class">Custom styled</GlassButton>
```

### Override Styles

```tsx
<GlassButton style={{ width: "100%" }}>Full width</GlassButton>
```

### Framer Motion Props

```tsx
<GlassButton whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
  Custom animation
</GlassButton>
```

---

## 🎨 Theme Integration

The button automatically uses colors from the current theme:

```tsx
// Primary variant uses:
currentTheme.colors.primary;
currentTheme.colors.accent;
currentTheme.colors.primaryGlow;

// Secondary variant uses:
currentTheme.colors.surface;
currentTheme.colors.surfaceAlt;

// All variants use:
currentTheme.colors.borderOpacity;
```

When theme changes, buttons smoothly transition to new colors (600ms).

---

## ✅ Implemented In

Currently used in:

- ✅ **Hero Section** (`/`) - Contact & Download CV
- ✅ **About Hero** (`/about`) - Download CV & Get in Touch
- ✅ Can be used anywhere in your app!

---

## 🚀 Best Practices

1. **Use `primary` for main actions** (Contact, Submit, Download)
2. **Use `secondary` for navigation** (Learn More, View Projects)
3. **Use `ghost` for subtle actions** (Close, Cancel, View Details)
4. **Always provide meaningful text** for accessibility
5. **Use icons to enhance understanding**, not replace text
6. **Keep button text concise** (2-4 words)
7. **Group related buttons** with flexbox and gap
8. **Use `size="lg"` for hero sections**
9. **Use `size="sm"` for inline/compact layouts**

---

## 🎯 Examples in Context

### Hero Section

```tsx
<div className="flex flex-wrap gap-[1em]">
  <GlassButton href="/contact" variant="primary" size="lg" icon={ArrowRight}>
    Contact me
  </GlassButton>

  <GlassButton
    href="/cv/resume.pdf"
    download="resume.pdf"
    variant="secondary"
    size="lg"
    icon={Download}
  >
    Download CV
  </GlassButton>
</div>
```

### Contact Form

```tsx
<GlassButton
  type="submit"
  variant="primary"
  size="lg"
  icon={Send}
  disabled={isSubmitting}
>
  {isSubmitting ? "Sending..." : "Send Message"}
</GlassButton>
```

### Navigation

```tsx
<GlassButton href="/projects" variant="secondary" icon={Folder}>
  View Projects
</GlassButton>
```

---

## 🎨 Visual Comparison

| Variant   | Background              | Border | Glow       | Best For              |
| --------- | ----------------------- | ------ | ---------- | --------------------- |
| Primary   | Gradient (theme colors) | Light  | ✅ Pulsing | CTA, Important        |
| Secondary | Glass surface           | Medium | ❌ None    | Navigation, Secondary |
| Ghost     | Transparent             | Subtle | ❌ None    | Tertiary, Minimal     |

---

## 🔮 Future Enhancements

Potential additions:

- [ ] Loading spinner built-in
- [ ] Tooltip support
- [ ] Badge/notification dot
- [ ] More variants (danger, success, warning)
- [ ] Gradient border option
- [ ] Custom glow colors

---

## ✨ Summary

**GlassButton** is your go-to component for all buttons and links in the portfolio. It's:

- **Consistent** - Same style everywhere
- **Flexible** - Works for buttons and links
- **Themeable** - Adapts to all 4 themes
- **Beautiful** - Glassmorphism with smooth animations
- **Accessible** - Proper semantic HTML
- **Type-safe** - Full TypeScript support

**Use it everywhere for a cohesive, professional look!** 🎨✨
