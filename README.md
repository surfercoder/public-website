# Agustin Cassani — Personal Website

A fast, accessible, and SEO-optimized personal portfolio built with **Next.js 16**, **React 19**, and **TypeScript**. It showcases professional experience, skills, certifications, education, and contact information with a modern, responsive UI and dark mode support.

**Live site:** [agustincassani.com](https://www.agustincassani.com/)

---

## Highlights

| Area | What was done |
|------|---------------|
| **Performance** | Lightning-fast LCP; Server Components for static sections; CSS and package import optimizations; immutable cache headers for static assets |
| **Accessibility** | Reduced-motion detection on all animations; `aria-hidden` on decorative elements; semantic HTML and proper ARIA labels |
| **SEO** | OpenGraph + Twitter cards; JSON-LD structured data (Person + WebSite schemas); programmatic `robots.ts` and `sitemap.ts`; canonical URLs |
| **Security** | HSTS with preload; X-Content-Type-Options; Referrer-Policy; Permissions-Policy; email obfuscation against scrapers; `poweredByHeader: false` |
| **Testing** | **100% coverage** across statements, branches, functions, and lines — 290 tests across 35 test suites |
| **DX** | Strict TypeScript; ESLint with Core Web Vitals rules; Turbopack dev server; bundle analyzer; type-checked CI script |

---

## Table of Contents

- [Architecture and Best Practices](#architecture-and-best-practices)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Performance and Accessibility](#performance-and-accessibility)
- [SEO Strategy](#seo-strategy)
- [Security Hardening](#security-hardening)
- [Testing and Coverage](#testing-and-coverage)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Architecture and Best Practices

### Rendering Strategy

The project follows a **Server Components-first** approach. Only components that require browser APIs or interactivity use the `"use client"` directive:

- **Server Components** (zero client JS): `about.tsx`, `certifications.tsx`, `education.tsx`, `footer.tsx`, `seo-jsonld.tsx`
- **Client Components** (interactive): `navbar.tsx`, `hero.tsx`, `experience.tsx`, `skills.tsx`, `contact-section.tsx`, `theme-toggle.tsx`, `pdf-viewer.tsx`, `obfuscated-email.tsx`

### Code Quality Patterns

- **Strict TypeScript** (`strict: true`) with no `any` escape hatches
- **Zod validation** at the form boundary (`src/schemas/contact.ts`) — runtime type safety for user input
- **Server Actions** for form processing (`src/actions/contact.ts`) — no client-exposed API routes
- **Memoization** where it matters: `React.memo`, `useMemo`, and `useCallback` on components with frequent re-renders (Navbar, Skills, Contact Section)
- **Data hoisting**: static arrays and configuration objects declared outside component bodies to avoid re-creation on each render
- **Path aliases** (`@/*`) for clean imports

### Security Practices

- **Email obfuscation**: email stored as character codes and decoded only on the client via `useSyncExternalStore`, preventing bot scraping from static HTML
- **No secrets in client code**: environment variables handled via `.env.local` and server actions
- **Content Security Policy** for SVG images
- **Input validation** with Zod schemas on both client and server

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | [TypeScript 5.9](https://www.typescriptlang.org/) (strict mode) |
| UI | [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) (reduced-motion guarded) |
| Icons | [Lucide React](https://lucide.dev/) |
| Validation | [Zod 4](https://zod.dev/) |
| Email | [Nodemailer](https://nodemailer.com/) |
| Testing | [Jest 30](https://jestjs.io/) + [React Testing Library](https://testing-library.com/) |
| Linting | [ESLint 9](https://eslint.org/) (Next.js Core Web Vitals + TypeScript configs) |
| Tooling | Turbopack (dev), Bundle Analyzer, PostCSS |

---

## Project Structure

```
src/
  app/
    layout.tsx            # Root layout with metadata, fonts, theme, and security headers
    page.tsx              # Home page composing all sections
    robots.ts             # Programmatic robots.txt generation
    sitemap.ts            # Programmatic sitemap.xml generation
    critical.css          # Critical CSS for above-the-fold rendering
    globals.css           # Global Tailwind styles
    resume/
      page.tsx            # Resume page with PDF viewer
  components/
    hero.tsx              # Hero section with optimized LCP
    navbar.tsx            # Sticky navbar with scroll-based section highlighting
    about.tsx             # About section (Server Component)
    experience.tsx        # Professional experience with animations
    skills.tsx            # Skills grid with categories
    certifications.tsx    # Professional certifications (Server Component)
    education.tsx         # Education section (Server Component)
    contact-section.tsx   # Contact links and form CTA
    contact-form.tsx      # Contact form with Zod validation
    footer.tsx            # Footer (Server Component)
    theme-toggle.tsx      # Dark/light mode toggle
    seo-jsonld.tsx        # JSON-LD structured data (Server Component)
    obfuscated-email.tsx  # Anti-scraping email display
    pdf-viewer.tsx        # Client-side PDF viewer
    performance-monitor.tsx # Performance observer + SW registration
    field-error.tsx       # Form field error display
    resume-viewer.tsx     # Resume page viewer wrapper
    theme-provider.tsx    # next-themes provider
    ui/                   # shadcn/ui primitives (Button, Card, Input, etc.)
  lib/
    utils.ts              # Utility functions (cn, etc.)
    navigation.ts         # Navigation helpers
    sw-register.ts        # Service worker registration (production only)
  schemas/
    contact.ts            # Zod contact form schema
  actions/
    contact.ts            # Server action for contact form submission
public/
    AgustinCassaniCV.pdf  # Downloadable resume
    favicon.ico, icons, manifest, etc.
```

---

## Features

### Core Sections
- **Hero** with optimized LCP — primary headline renders immediately without animation; secondary content fades in
- **About**, **Experience**, **Skills**, **Certifications**, **Education** — rich content sections with subtle motion effects
- **Contact** — form backed by Zod validation and Nodemailer server action
- **Resume** — inline PDF viewer with download option

### UI/UX
- **Responsive design** with Tailwind CSS — mobile-first approach
- **Dark mode** with `next-themes` — system preference detection + manual toggle
- **Sticky navbar** with scroll-based active section highlighting
- **Smooth scroll navigation** with proper offset handling
- **Framer Motion animations** guarded by `prefers-reduced-motion`

### Infrastructure
- **Programmatic robots.txt and sitemap.xml** via Next.js Metadata API (`src/app/robots.ts`, `src/app/sitemap.ts`)
- **Service worker** registration for offline caching (production only)
- **Performance monitoring** via PerformanceObserver (LCP, FID, CLS)
- **Bundle analysis** with `@next/bundle-analyzer` (`npm run build:analyze`)

---

## Performance and Accessibility

### Performance Optimizations

- **Server Components** for content-heavy static sections — zero client-side JavaScript overhead
- **Optimized CSS** via `experimental.optimizeCss` and critical CSS extraction
- **Package import optimization** for Lucide, Radix UI — tree-shaking at build time
- **Image formats**: AVIF and WebP with aggressive cache TTL (1 year for static assets)
- **Font optimization** via `next/font` — no layout shifts, preloaded subsets
- **Turbopack** for fast development builds
- **Minimal above-the-fold work**: hero headline rendered without animation for instant LCP

### Accessibility

- **Reduced motion**: all Framer Motion animations check `prefers-reduced-motion` and skip accordingly
- **Semantic HTML**: proper heading hierarchy, landmark regions, and ARIA attributes
- **Decorative elements** marked with `aria-hidden="true"`
- **Keyboard navigation** support across all interactive elements
- **Dark mode** respects system preferences by default

This project targets **100 scores across all Lighthouse categories** (Performance, Accessibility, Best Practices, SEO).

---

## SEO Strategy

- **Metadata API**: titles, descriptions, OpenGraph, and Twitter card metadata per page
- **Canonical URLs** to prevent duplicate content
- **JSON-LD structured data** (`src/components/seo-jsonld.tsx`):
  - `Person` schema with professional details, social links, and contact info
  - `WebSite` schema with site search potential action
- **Programmatic robots.txt** — allows all crawlers, blocks PDF direct access, links to sitemap
- **Programmatic sitemap.xml** — auto-generates with proper priorities and change frequencies
- **Semantic HTML** — proper heading hierarchy for better crawler understanding

---

## Security Hardening

All production security headers are configured in `next.config.ts`:

| Header | Value | Purpose |
|--------|-------|---------|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Enforce HTTPS for 2 years |
| `X-Content-Type-Options` | `nosniff` | Prevent MIME-type sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Control referrer information |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Disable unnecessary browser APIs |

Additional measures:
- `poweredByHeader: false` — hides Next.js fingerprint
- **Email obfuscation** via character-code encoding decoded only client-side
- **CSP for images** — restricts SVG execution
- **Zod validation** on all user input before processing

---

## Testing and Coverage

### Approach

Every source file has a co-located test file. Tests cover:

- **Component rendering** — correct DOM output, conditional rendering, props handling
- **User interactions** — clicks, form submissions, scroll events, theme toggling
- **Edge cases** — reduced-motion paths, SSR hydration, error states, empty data
- **Utilities and schemas** — `cn()`, navigation helpers, Zod validation rules
- **Server actions** — contact form processing with mocked Nodemailer
- **UI primitives** — all shadcn/ui components tested for correct prop forwarding

### Coverage Report

```
-----------------------------|---------|----------|---------|---------|
File                         | % Stmts | % Branch | % Funcs | % Lines |
-----------------------------|---------|----------|---------|---------|
All files                    |     100 |      100 |     100 |     100 |
-----------------------------|---------|----------|---------|---------|

Test Suites:  35 passed, 35 total
Tests:        290 passed, 290 total
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage report
npm run test:coverage
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/surfercoder/public-website.git
cd public-website
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view. Uses Turbopack for fast HMR.

### Production Build

```bash
npm run build
npm start
```

---

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Build production bundle |
| `npm run build:analyze` | Build with bundle size analysis |
| `npm start` | Start production server |
| `npm run lint` | Lint with ESLint (Core Web Vitals + TypeScript) |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run typecheck` | Run TypeScript type checking |
| `npm test` | Run all unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run checks` | Run lint + typecheck + test + build (CI pipeline) |

---

## Deployment

This project is deployment-ready for any Node.js hosting platform.

### Vercel (Recommended)

Zero-config deployment with optimal caching, edge functions, and image CDN:

```bash
npx vercel
```

### Self-Hosting

```bash
NODE_ENV=production npm run build
npm start
```

Serve behind a reverse proxy (NGINX/Caddy) for TLS termination. Security headers are already configured in the application.

### Environment Variables

Create `.env.local` for local development (never commit secrets):

```env
# Contact form (Nodemailer)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password
CONTACT_TO=recipient@example.com
```

---

## Contributing

Contributions are welcome! Please:

1. Open an issue describing your proposal or bug
2. Submit a PR with a clear description and tests
3. Follow the existing coding style — ESLint will guide you
4. Ensure `npm run checks` passes before submitting

---

## License

MIT — see [LICENSE](LICENSE) for details.
