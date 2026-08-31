# Isaac Kwizera — Portfolio

> Evidence goes in. Solutions come out.

A premium personal portfolio website for **Isaac Kwizera** — a business development and development practitioner working across business, research, education, digital products, and the creative economy in Kigali, Rwanda.

Built as a React + Vite + TypeScript single-page site with Tailwind CSS, structured content data files, and an animated network/particle visual system.

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

Requires Node.js 18+.

## Project structure

```
src/
  components/       Reusable UI: Nav, AmbientField (background), Reveal (scroll animation),
                     Eyebrow, EvidenceFlow (signature diagram), CaseStudyModal
  sections/         One component per page section (Hero, Positioning, Capabilities,
                     FeaturedWork, CreativeEconomy, Research, Knowledge, Digital,
                     Institutions, Toolkit, About, Timeline, Presentations, CTA,
                     Contact, Footer)
  data/             All editable content lives here as typed data, not hardcoded in JSX:
                     projects.ts, research.ts, digital.ts, institutions.ts,
                     skills.ts, timeline.ts, types.ts
  hooks/            useReveal.ts — IntersectionObserver-based scroll-reveal hook
  index.css         Global styles, design tokens (fonts, animations), reduced-motion rules
  App.tsx           Assembles all sections in order
public/
  favicon.svg       IK monogram favicon
  og-image.png      Placeholder Open Graph / social preview image
.github/workflows/
  deploy.yml        GitHub Pages deploy workflow (builds on push to `main`)
```

## Editing content

You should never need to touch component/layout code to update Isaac's information. Everything content-related lives in `src/data/`:

| File | Controls |
|---|---|
| `projects.ts` | Featured Work cards + full case studies (education & creative-economy projects) |
| `research.ts` | Research projects, publications, manuscripts-in-progress, research reports |
| `digital.ts` | Digital products & systems cards |
| `institutions.ts` | Institutions network — add an institution and link it to project IDs |
| `skills.ts` | Toolkit categories + broader capability tags |
| `timeline.ts` | Experience timeline entries |

To add a new project, copy an existing object in `projects.ts` (or `research.ts`, etc.), give it a unique `id`, and fill in the fields — the site picks it up automatically, including in the case-study modal and any filters.

## Design system

- **Colour**: deep navy/ink background, royal blue accents, champagne gold used sparingly for emphasis (buttons, labels, active states).
- **Type**: Fraunces (display serif, headlines) · Manrope (body) · IBM Plex Mono (eyebrows, labels, data/stat chips).
- **Signature visual**: an animated "Evidence → IK → Solutions" flow diagram (`EvidenceFlow.tsx`), echoed conceptually in the Institutions network diagram and the Creative Economy value chain.
- **Motion**: subtle ambient background (grid, glows, node network, drifting particles), scroll-reveal fades, and one continuously animated flow particle. All motion respects `prefers-reduced-motion` (see `index.css`).

## Known placeholders — replace before going live

- **Portrait**: the hero currently shows an "IK" monogram placeholder card instead of a real photo (none was supplied). Swap the placeholder block in `src/sections/Hero.tsx` for an `<img>` once a professional portrait is available.
- **CV**: `Download CV` buttons link to `/isaac-kwizera-cv.pdf`. Add the actual file to `public/isaac-kwizera-cv.pdf`.
- **LinkedIn URL**: `Connect on LinkedIn` currently points to `https://www.linkedin.com/` — replace with Isaac's actual profile URL in `src/sections/Contact.tsx`.
- **Publication/report links**: `href` fields in `src/data/research.ts` are currently empty/omitted — add real links once documents are hosted, and the "Read Publication" / "View Document" buttons will activate automatically.
- **Presentation photos**: `src/sections/Presentations.tsx` uses icon placeholders for the four listed engagements (Behind the Scenes dissemination, national forum, multi-stakeholder workshop, World Bank Youth Summit 2025). Replace with real photographs when available.
- **OG image**: `public/og-image.png` is a generated placeholder — replace with a designed social-share image.
- **Content accuracy**: all copy strictly reflects only what was provided about Isaac's projects, research, and publications — no invented clients, outcomes, statistics, or job titles. Keep this discipline when adding new entries.

## Deploying to GitHub Pages

1. Push this repository to GitHub.
2. In **Settings → Pages**, set the source to **GitHub Actions**.
3. If deploying to `https://<username>.github.io/<repo-name>/` (a project page, not a user/org root page or custom domain), open `vite.config.ts` and set:
   ```ts
   base: '/<repo-name>/',
   ```
4. Push to `main` — `.github/workflows/deploy.yml` builds and publishes `dist/` automatically.

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS · lucide-react
