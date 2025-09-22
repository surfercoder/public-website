# Agustín Cassani — Personal Website

A fast, accessible, and SEO‑optimized personal website built with Next.js and TypeScript. It showcases professional experience, skills, certifications, education, and contact information with a modern, responsive UI.

Live site: https://www.agustincassani.com/

## Highlights

- **Lightning‑fast LCP**: The main hero headline renders immediately to optimize Largest Contentful Paint.
- **Motion with care**: Subtle motion effects are guarded by reduced‑motion detection to respect user preferences and limit main‑thread work.
- **Server Components**: Static sections render on the server to reduce shipped JavaScript.
- **Comprehensive tests**: Unit tests cover components, utilities, and edge cases with near‑perfect coverage.
- **Strong SEO and social previews**: OpenGraph, Twitter cards, and JSON‑LD schema.
- **Production security headers**: HSTS, X‑Content‑Type‑Options, Referrer‑Policy, and Permissions‑Policy.

## Table of Contents

- Overview
- Live Site
- Features
- Performance and Accessibility
- SEO
- Tech Stack
- Project Structure
- Getting Started
- Scripts
- Testing and Coverage
- Deployment
- Contributing
- License

## Overview

This site is a personal portfolio for Agustín Cassani. It includes:

- A hero section with optimized LCP and clear CTAs
- About, Experience, Skills, Certifications, and Education sections
- A Resume page and inline PDF viewer
- A contact form and direct social/contact links
- A responsive, dark‑mode‑enabled design using Tailwind CSS

## Live Site

You can visit the production website at:

https://www.agustincassani.com/

## Features

- **Hero with optimized LCP**: `src/components/hero.tsx` renders the primary headline immediately; secondary content fades in lightly.
- **Rich content sections**
  - About: `src/components/about.tsx`
  - Experience: `src/components/experience.tsx`
  - Skills: `src/components/skills.tsx`
  - Certifications: `src/components/certifications.tsx`
  - Education: `src/components/education.tsx`
  - Contact: `src/components/contact-section.tsx`
- **Theme toggle and sticky navbar** with section highlighting: `src/components/navbar.tsx`, `src/components/theme-toggle.tsx`
- **Resume viewer** with client‑side split where appropriate
- **Strong unit testing** with Jest + React Testing Library
- **Production headers** for security and caching best practices

## Performance and Accessibility

We applied practical performance techniques aligned with Next.js best practices:

- **Server Components** for static sections (no "use client"):
  - `about.tsx`, `certifications.tsx`, `education.tsx`, `footer.tsx`
- **Motion guarded by prefers‑reduced‑motion**:
  - `hero.tsx`, `experience.tsx`, `skills.tsx` use `window.matchMedia('(prefers-reduced-motion: reduce)')`
- **Reduced animation durations/distances**; decorative elements set to `aria-hidden`
- **Minimal above‑the‑fold work**: the main hero headline is rendered without animation
- **Memoization** to reduce re‑renders:
  - `navbar.tsx` memoized with `React.memo`, arrays/handlers via `useMemo`/`useCallback`
  - `skills.tsx` memoized and data hoisted
  - `contact-section.tsx` memoized; static arrays via `useMemo`
- **Fonts**: `next/font` for optimal font loading (no layout shifts)
- Recommended (if adding images): use `next/image` with `priority` for hero images and stable container sizes to prevent CLS

With a proper deployment and the optimizations above, this project is capable of achieving 100 scores across Lighthouse categories (Performance, Accessibility, Best Practices, SEO).

## SEO

- OpenGraph and Twitter metadata
- Canonical URL and robots configuration
- JSON‑LD structured data for richer previews
- Optimized titles and descriptions per page

Add a branded OG image (1200×630) and reference it in the metadata for an even better share preview.

## Tech Stack

- Next.js (App Router), React, TypeScript
- Tailwind CSS and shadcn/ui components
- lucide‑react Icons
- framer‑motion (guarded with reduced‑motion)
- Jest + React Testing Library
- ESLint + Prettier
- Deployed on your preferred platform (e.g., Vercel)

## Project Structure

- `src/app/` — App Router entry points, pages, and layout
- `src/components/` — UI components such as `hero.tsx`, `navbar.tsx`, etc.
- `src/components/ui/` — shadcn/ui wrappers
- `src/lib/` — utilities like `utils.ts`, `navigation.ts`
- `src/schemas/` — validation schemas (e.g., for contact form)
- `src/actions/` — server actions (e.g., contact form processing)
- `public/` — static assets

## Getting Started

Prerequisites: Node.js 18+ and npm.

Install dependencies:

```bash
npm install
```

Run in development:

```bash
npm run dev
```

Open http://localhost:3000 to view.

Build for production:

```bash
npm run build
npm start
```

## Scripts

- `dev` — Start development server
- `build` — Build production bundle
- `start` — Start production server
- `lint` — Lint code with ESLint
- `test` — Run unit tests
- `test:coverage` — Run tests with coverage

## Testing and Coverage

We use Jest and React Testing Library. Tests cover components, UI interactions, and utility functions.

Run tests:

```bash
npm test
```

Run with coverage:

```bash
npm test -- --coverage
```

Latest local coverage summary:

- **Statements:** 99.70%
- **Branches:** 99.27%
- **Functions:** 98.68%
- **Lines:** 100.00%

Tests: 267 passed, 267 total.

Note: Coverage may differ slightly per environment or after changes. The suite includes stress/edge tests for Navbar behavior, reduced‑motion paths, and form validation.

## Deployment

This project is deployment‑ready. Recommendations:

- **Vercel**: the easiest option for Next.js — zero‑config, optimal caching, and image/CDN support out‑of‑the‑box.
- **Self‑hosting**:
  - Ensure `NODE_ENV=production` and `npm run build`.
  - Serve `npm start` behind a reverse proxy (NGINX/Caddy).
  - Set strong security headers. This app configures common best‑practice headers in Next.

Environment variables:

- If your contact form or analytics require env vars, add them to `.env.local` (never commit secrets).
- Configure environment variables in your deployment platform as needed.

## Checklist to hit 100 on Lighthouse

- **Performance**
  - Keep the hero headline unanimated; if you add a hero image, use `next/image` with `priority` and stable sizes.
  - Defer below‑the‑fold heavy components via dynamic imports where appropriate.
  - Keep static sections as Server Components.
- **Accessibility**
  - Ensure interactive controls have labels and correct roles.
  - Mark decorative icons and elements `aria-hidden`.
- **Best Practices**
  - Use HTTPS and set production headers (HSTS, content‑type sniffing protections, etc.).
  - Avoid console errors and unresolved promises.
- **SEO**
  - Provide descriptive titles and meta descriptions.
  - Add OG/Twitter images, canonical, robots, and JSON‑LD.

## Contributing

Contributions are welcome! Please:

- Open an issue describing your proposal/bug.
- Submit a PR with a clear description and tests when applicable.
- Follow the existing coding style (ESLint/Prettier will guide you).

## License

MIT — see LICENSE for details.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
