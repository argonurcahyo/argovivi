# Copilot Instructions for LDM (Long Distance Memories)

## Project Overview
A Next.js 16 + React 19 web application documenting a long-distance relationship between Bogor (Indonesia) and Brisbane (Australia). Uses TypeScript, TailwindCSS 4, Framer Motion for animations, and Leaflet for interactive mapping.

## Architecture & Key Patterns

### Tech Stack & Essentials
- **Framework**: Next.js 16 with App Router (`app/` directory)
- **Styling**: Tailwind CSS 4 (PostCSS config in `postcss.config.mjs`) with CSS custom properties for theming
- **Animations**: Framer Motion for component transitions
- **Mapping**: React Leaflet + Leaflet.js (dynamic import in `page.tsx` with `ssr: false` to prevent hydration errors)
- **Time handling**: `dayjs` with timezone plugin (see `lib/time.ts`)

### CSS & Theming Pattern
Custom theme variables defined in `app/globals.css` at `:root` level:
- Variables: `--bg`, `--text`, `--card`, `--border`, `--accent`
- Dark mode toggled via `ThemeProvider` context (stores in localStorage)
- Components use `var(--accent)`, `var(--bg)` throughout for consistency
- TailwindCSS syntax: `bg-(--card)`, `text-(--accent)`, `border-(--border)`

### Component Organization
- **Page Component** (`app/page.tsx`): Client-side (`'use client'`), manages hero section, time zones, dynamic map, and imsakiyah schedules
- **Shared Components** (`components/`): Navbar, Footer, Map, ThemeToggle, ThemeProvider, ImsakiyahCard
- **Data Models** (`data/`): locations.ts (Position type + coordinates), timeline.ts (empty, awaiting content), photos.ts (image metadata), imsakiyah.ts (prayer time schedules)

### Geographic Data Flow
- Locations in `data/locations.ts`: defines Position type `[latitude, longitude]`
  - Bogor: `[-6.5028, 106.8166]`
  - Brisbane: `[-27.4698, 153.0251]`
- Map component (`components/Map.tsx`) renders Leaflet markers + dashed polyline connecting both cities
- Note: Map coordinates differ slightly from locations.ts (deliberate for visual centering)

### Key Developer Workflows

#### Local Development
```bash
npm run dev        # Starts Next.js dev server on localhost:3000
npm run build      # Production build
npm run start      # Runs production build
npm run lint       # ESLint check (config in eslint.config.mjs)
```

#### Common Pitfalls to Avoid
1. **Map hydration**: Always use `dynamic(() => import(...), { ssr: false })` for Leaflet components
2. **Icon rendering**: Custom Leaflet icons use divIcon with Tailwind classes (see Map.tsx comment)
3. **Theme flashing**: ThemeProvider checks `mounted` state before rendering to prevent SSR mismatch
4. **Time zones**: Use `lib/time.ts` utilities (`getTime()`, `timeStatus()`, `diffHour()`) for consistent timezone handling

## Specific Project Conventions

### Naming & Structure
- Components are PascalCase (React convention)
- Data files export TypeScript types alongside constants
- Client-side components marked explicitly with `'use client'`

### Responsive Design
- Uses `md:` breakpoint for tablet/desktop distinctions
- Max container width: `max-w-5xl` centered with `mx-auto`
- Padding: `px-6` (horizontal), `py-8-16` (vertical sections)

### Animation Patterns (Framer Motion)
- `initial`, `animate`, `className` pattern for entrance animations
- Opacity + transform combinations (e.g., `opacity: 0, y: -10`)

## Integration Points & External Dependencies

### Libraries of Note
- **chart.js + react-chartjs-2**: Available but not yet used (prepare for stats/metrics)
- **lucide-react**: Icon library used throughout (Heart, MapPin, Compass, Plane icons)
- **react-leaflet**: Map tiles from CartoDB Light (`https://{s}.basemaps.cartocdn.com/light_all/...`)

### Media Assets
- Public directory structure: `public/music/`, `public/photos/`
- Favicon/icons referenced in `app/layout.tsx` metadata point to `/photos/291ec3d5-...`

## File Reference Guide for Common Tasks

| Task | Primary Files |
|------|---|
| Add page sections | `app/page.tsx` (hero, time zones, map, imsakiyah sections) |
| Modify theme colors | `app/globals.css` (CSS variables) |
| Add new components | `components/` with context usage from `ThemeProvider.tsx` |
| Fix map issues | `components/Map.tsx` + check Leaflet icon setup |
| Timezone logic | `lib/time.ts` (utilities already defined) |
| Update imsakiyah schedules | `data/imsakiyah.ts` (prayer times for Bogor & Brisbane) |
| Display imsakiyah | `components/ImsakiyahCard.tsx` (reusable schedule card) |
| Data models | `data/locations.ts`, `data/photos.ts`, `data/imsakiyah.ts` |

## Type Safety Notes
- Strict TypeScript mode enabled (`strict: true`)
- Position type is `[number, number]` tuple for coords
- Theme type: `"light" | "dark"` union type
- Avoid `any` type; leverage existing type definitions

---
**Last Updated**: February 2026
**Feedback**: If sections are unclear or you need deeper context on specific patterns, ask!
