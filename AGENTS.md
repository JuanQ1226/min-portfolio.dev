# AGENTS.md

Minimalist dark-themed portfolio site built with Next.js 14 (App Router), React 18, TypeScript (strict mode), Tailwind CSS, and Three.js GLSL shaders. Deploys as a static export to GitHub Pages.

## Build / Lint / Test Commands

```bash
# Install dependencies
npm ci

# Development server
npm run dev

# Production build (static export to ./out)
npm run build

# Start production server
npm run start

# Lint (ESLint with next/core-web-vitals)
npm run lint
```

**No test framework is configured.** If adding tests, prefer Vitest for unit tests or Playwright for e2e tests.

**CI/CD:** GitHub Actions workflow (`.github/workflows/nextjs.yml`) builds on push to `main` and deploys the static export to GitHub Pages using Node 20.

## Tech Stack

- **Framework:** Next.js 14 (App Router), React 18
- **Language:** TypeScript 5 (strict mode enabled)
- **Styling:** Tailwind CSS 3.4 -- dark-only theme, neutral monochrome palette
- **3D / Shaders:** Three.js with custom GLSL `ShaderMaterial` (Simplex noise terrain with mouse trail interactivity)
- **Animations:** Framer Motion, tailwindcss-animate
- **Icons:** Lucide React
- **Theming:** next-themes (forced dark mode)
- **Package manager:** npm

## Project Structure

```
app/                        # Next.js App Router
  layout.tsx                # Root layout (ThemeProvider, Navbar, Footer, FloatingResumeButton)
  page.tsx                  # Home page (Hero -> Skills -> ExperienceAccordion -> EducationSection -> ProjectGrid)
  globals.css               # Global CSS with Tailwind base styles
assets/data/                # Static data arrays (TypeScript files)
  education.ts              # Education entries (EducationEntry type)
  experience.ts             # Work experience entries (ExperienceEntry type)
  skills.ts                 # Skills list (SkillEntry type)
components/                 # All components (flat structure)
  shaders/                  # Three.js shader components
    WaveShader.tsx           # GLSL Simplex noise terrain shader with mouse trail
  Hero.tsx                  # Full-viewport hero with shader background + gradient fade
  Skills.tsx                # Categorized skills list (Languages, Frameworks & Tools, Concepts)
  ExperienceAccordion.tsx   # Accordion of work experience entries (borderless dividers)
  EducationSection.tsx      # Education with degree, institution, highlights
  ProjectGrid.tsx           # Stacked project cards with tech tags and images
  Navbar.tsx                # Fixed navbar with initials + section navigation links
  Footer.tsx                # Footer with name + social icons (GitHub, LinkedIn, Email)
  FloatingResumeButton.tsx  # Fixed FAB to open resume PDF (server component)
  ThemeProvider.tsx          # next-themes wrapper (forced dark)
lib/
  utils.ts                  # cn() utility (clsx + tailwind-merge)
public/                     # Static assets (images, PDF)
  zorzal.webp               # Zorzal project screenshot (optimized)
  maze_generator.webp       # Maze Generator project screenshot (optimized)
  JuanQuintanaCV2025v2.pdf  # Resume PDF
```

## Code Style Guidelines

### Imports

- Use the `@/*` path alias (mapped to project root in tsconfig.json) for all imports.
- Named imports for libraries and icons; default imports for standalone components.
- Keep external imports before internal ones.

### Components

- All components are **functional** using `function` declarations (not arrow functions).
- Export pattern: `export default function ComponentName()` for page sections and standalone components.
- Use **named exports** (`export function`) for utility/provider components (e.g., `ThemeProvider`).

### TypeScript

- **Strict mode is enabled** -- respect it.
- Prefer `type` over `interface` for type definitions.
- Use `Readonly<>` for props: `Readonly<{ children: React.ReactNode }>`.
- Avoid `any` -- use proper types.
- Use generic type parameters for refs: `useRef<HTMLDivElement>(null)`.

### Naming Conventions

| Entity | Convention | Example |
|---|---|---|
| Components | PascalCase | `ExperienceAccordion` |
| Component files | PascalCase.tsx | `ProjectGrid.tsx` |
| Utility files | lowercase.ts | `utils.ts` |
| Data files | lowercase.ts | `experience.ts` |
| Directories | lowercase | `components/`, `shaders/` |
| Variables/functions | camelCase | `handleScroll`, `scrollProgress` |
| Exported data arrays | PascalCase | `Experience`, `Skills` |

### Styling

- **Dark-only theme** -- no light mode. Background: `#0a0a0a`, foreground: `#e5e5e5`.
- Use **Tailwind CSS utility classes** inline. No CSS modules, styled-components, or Sass.
- Use the `cn()` utility from `@/lib/utils` for conditional/merged class names.
- Responsive design: mobile-first with Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`).
- Colors are defined directly in `tailwind.config.ts` (not CSS variables).
- Font: Space Grotesk via `next/font/google` with CSS variable `--font-space-grotesk`.

### State Management

- **Local state only** -- `useState` for component state, `useRef` for mutable values.
- No external state management library.
- Theme is forced dark via `next-themes` with `forcedTheme="dark"`.
- Data is static -- experience, education, and skills come from TypeScript files in `assets/data/`.

### Error Handling

- Use **guard clauses** for SSR safety: check `typeof window !== "undefined"` before accessing browser APIs.
- Capture ref values in local variables inside `useEffect` before using them in cleanup functions.
- No error boundaries are currently implemented.

### Server vs Client Components

- Components using hooks (`useState`, `useEffect`, etc.) must have `"use client"` directive.
- The root layout (`app/layout.tsx`) and page (`app/page.tsx`) are server components.
- `FloatingResumeButton.tsx` and `Footer.tsx` are server components (no hooks needed).
- All interactive section components are client components.

### Three.js / Shader System

- Shader components live in `components/shaders/`.
- `WaveShader.tsx` uses `THREE.ShaderMaterial` with raw GLSL vertex/fragment shaders.
- The vertex shader creates a **3-octave Simplex noise terrain** on a subdivided `PlaneGeometry` (200x200 segments, 14x10 units).
- Stefan Gustavson's 3D Simplex noise (`snoise`) is inlined in the vertex shader GLSL.
- Uniforms: `uTime` drives animation, `uScrollProgress` controls scroll-reactive fade, `uTrail[16]` provides mouse trail positions.
- The **mouse trail system** uses a 16-point trail buffer. Mouse position is smoothly lerped (0.08 factor), trail positions shift every 3 frames. Each trail point creates a terrain bump that fades with age.
- Fragment shader applies directional lighting from upper-right, elevation-based tint, edge fade on all 4 borders, and scroll-based alpha fadeout.
- The animation loop **pauses rendering** when `scrollProgress >= 1` (hero fully scrolled past).
- Three.js cleanup (disposing geometries, materials, renderers) happens in effect cleanup functions.
- Always capture DOM refs in local variables for cleanup to avoid stale ref warnings.

### Accordion Pattern (Experience)

- Uses `useState` for tracking which entry is open (`openIndex`).
- Only one entry open at a time; clicking the open entry closes it.
- Expand/collapse animated with Framer Motion `AnimatePresence` and `motion.div` with `height: auto`.
- `ChevronDown` icon rotates 180 degrees when expanded.
- `aria-expanded` attribute set for accessibility.
- Borderless design with subtle `divide-y divide-border/50` dividers.
- Title and company displayed inline on desktop, stacked on mobile.
- Date shown on desktop only in collapsed state; revealed on mobile in expanded state.

### Education Section

- Lightweight layout without card wrappers -- degree, institution, date, and bullet-point highlights.
- Uses Framer Motion `whileInView` scroll reveal with staggered delays.
- Data comes from `assets/data/education.ts` (`EducationEntry` type, `Education` array).
- Supports multiple education entries via `.map()`.

### Projects Layout

- Vertically stacked project cards (not a grid) with full-width `aspect-[2/1]` images.
- Project cards have tech tags displayed as quiet inline text.
- `ArrowUpRight` icon links to live project URLs.
- Images scale subtly on hover via `group-hover:scale-[1.02]`.
- Project data is defined inline in `ProjectGrid.tsx` using a local `Project` type with `tech: string[]` field.

### Data Files

- Static data lives in `assets/data/` as TypeScript files (`.ts`).
- Each file exports a `Readonly<>` type definition and a named PascalCase data array.
- `experience.ts` exports `ExperienceEntry` type and `Experience` array.
- `skills.ts` exports `SkillEntry` type and `Skills` array.
- `education.ts` exports `EducationEntry` type and `Education` array.
- Project data is defined inline in `ProjectGrid.tsx`.

## Configuration Files

| File | Purpose |
|---|---|
| `tsconfig.json` | TypeScript config (strict, `@/*` path alias) |
| `.eslintrc.json` | ESLint (extends `next/core-web-vitals` only) |
| `tailwind.config.ts` | Tailwind with dark-only neutral color palette |
| `postcss.config.mjs` | PostCSS with tailwindcss plugin |
| `next.config.mjs` | Next.js config (`output: "export"`, `images: { unoptimized: true }`) |

## Key Patterns to Follow

1. Keep the flat component structure in `components/` -- shader components go in `components/shaders/`.
2. Compose page sections in `app/page.tsx` by importing section components.
3. Use `"use client"` only when the component needs browser APIs or React hooks.
4. Run `npm run lint` and `npm run build` before committing to catch type errors and ESLint violations.
5. Static assets go in `public/`. Reference them with absolute paths (e.g., `/image.webp`).
6. Use WebP format for images -- optimize before adding to the repo.
7. The site is a static export -- no server-side features (API routes, server actions, ISR) are available.
8. When adding new Three.js effects, follow the `WaveShader.tsx` pattern: GLSL strings as module constants, uniforms for dynamic values, proper cleanup in `useEffect` return.
9. Data files use TypeScript with `Readonly<>` type definitions.
10. Prefer semantic HTML elements (`<a>` for links, `<button>` for actions) over JavaScript-driven navigation (`window.open`, etc.).
