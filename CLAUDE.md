# DevCheck — Project Conventions

## TypeScript
- Strict mode enabled, no `any` types
- All components use named exports
- File analyzers are pure functions (no side effects)
- Scoring engine has no external dependencies

## Styling
- Use `cn()` utility for conditional classnames
- shadcn/ui components in `src/components/ui/`
- Dark theme is default; all colors must work on dark backgrounds
- No inline styles — Tailwind only
- Framer-motion for all transitions/animations

## Data
- All data/questions defined in `src/lib/data/` (single source of truth)

## API
- API responses follow consistent `{ success, data, error }` envelope

## UI Design
- Dark-first: zinc-950 backgrounds, subtle borders (zinc-800), glowing accents
- Glassmorphism: Frosted glass cards with backdrop-blur and semi-transparent backgrounds
- Gradient accents: Emerald-to-cyan for CTAs and highlights
- Status colors: Emerald (pass), Amber (warning), Red (fail) with glow effects
- Professional feel: Clean spacing, consistent 8px grid
- Mobile-first responsive
