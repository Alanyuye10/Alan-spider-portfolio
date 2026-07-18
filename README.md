# Alan — Full Stack MERN Developer Portfolio

A premium, dark-mode portfolio built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, GSAP, and Lenis. The site is responsive, keyboard-friendly, motion-aware, and deployment-ready.

## Quick start

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
npm run preview
```

## Personalize the content

- Update portfolio copy, project links, statistics, skills, and experience in `src/constants/data.ts`.
- Replace contact and social links in `src/sections/Contact.tsx`, `src/components/Footer.tsx`, and `index.html`.
- Replace `public/alan-resume.txt` with your real resume (PDF is recommended) and update the hero link.
- Replace `src/assets/developer-orbit.png` if you want a different hero visual.
- Update the canonical person/schema details in `index.html` before publishing.

All names, roles, testimonials, statistics, and project outcomes included here are polished sample content and should be replaced with verified information.

## Contact form

By default, the validated contact form opens a pre-filled email draft. For direct form delivery, copy `.env.example` to `.env` and set `VITE_CONTACT_ENDPOINT` to a JSON-compatible endpoint. The form sends:

```json
{ "name": "", "email": "", "subject": "", "message": "" }
```

## Architecture

```text
src/
├── animations/   GSAP scroll animation utilities
├── assets/       Project-bound image assets
├── components/   Reusable UI and interaction primitives
├── constants/    Portfolio content and data
├── hooks/        Smooth scroll, typewriter, and scroll-spy hooks
├── layouts/      Global portfolio chrome
├── pages/        Route-level composition
├── sections/     Page sections
├── styles/       Design system and responsive CSS
├── types/        Shared TypeScript types
└── utils/        Shared utilities
```

## Quality features

- Semantic sections, skip link, keyboard focus states, accessible labels, and validation messages
- `prefers-reduced-motion` support and touch-friendly cursor fallbacks
- Lazy-loaded below-the-fold sections and optimized production chunking
- SEO, Open Graph, Twitter Card, JSON-LD, theme color, and favicon metadata
- Responsive layouts for mobile, tablet, desktop, and ultra-wide screens
- Command palette with `Ctrl/Cmd + K`

## Deploy

The `dist/` output is static and works on Vercel, Netlify, Cloudflare Pages, GitHub Pages, or any static host. Use `npm run build` as the build command and `dist` as the publish directory.
