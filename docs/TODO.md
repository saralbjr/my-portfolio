# ✅ TODO — Portfolio Website Build Plan

> Derived from: **PRD**, **Design Doc**, **Tech Stack**
> Owner: **Saral Bajracharya**
> Stack: Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion · Vercel

---

## 🏗️ PHASE 1 — MVP

---

### 0. Project Setup & Configuration

- [x] Initialize Next.js project with App Router (`npx create-next-app@latest`)
- [x] Enable TypeScript during setup
- [x] Install & configure Tailwind CSS
- [x] Set up folder structure:
  ```
  /app  (layout.tsx, page.tsx)
  /components  (Navbar, Hero, About, ProjectCard, Experience, ContactForm, Footer)
  /data  (projects.ts, experience.ts, skills.ts)
  /public  (images/)
  ```
- [x] Configure `next/font` with **Poppins**
- [x] Set up global CSS variables (colors, spacing, max-width 1200px)
- [x] Install **Lucide React** for icons
- [x] Install **Framer Motion**
- [x] Set up ESLint
- [x] Set up Prettier
- [x] Initialize Git repo and push to GitHub

---

### 1. Global Layout & Theming

#### 1.1 Root Layout (`app/layout.tsx`)

- [x] Add `<html>` with class-based dark mode support
- [x] Configure metadata (title, description, OG tags)
- [x] Import global font via `next/font`
- [x] Include `<Navbar />` and `<Footer />` in layout

#### 1.2 Dark Mode Toggle

- [x] Create `ThemeToggle.tsx` component
- [x] Implement `localStorage` persistence for theme preference
- [x] Use class-based strategy (`dark` class on `<html>`)
- [x] Add sun/moon icon toggle using Lucide React
- [x] Define dark mode color tokens in Tailwind config

#### 1.3 Global Styles

- [x] Set primary background: `#0B1121`
- [x] Set text color: `#F8FAFC`
- [x] Set accent color: `#0EA5E9` (cyan)
- [x] Configure section padding: 70–90px top/bottom
- [x] Set max content width: `1200px`, center all sections
- [x] Style headings: bold, responsive clamp sizes, proper hierarchy
- [x] Style body text: readable with 1.7 line-height
- [x] Custom scrollbar styling
- [x] Gradient text utility
- [x] Glass card utility
- [x] Background grid pattern
- [x] Custom animations (float, pulse-glow)

---

### 2. Navbar Component

- [x] Create `Navbar.tsx` component
- [x] Add links: Home · About · Projects · Experience · Contact
- [x] Make navbar **sticky** at the top
- [x] Implement **smooth scroll** to sections (single-page mode)
- [x] Style: dark background with scroll-aware backdrop blur
- [x] Gradient logo "Saral.dev"
- [x] Make responsive:
  - [x] Desktop: horizontal links
  - [x] Mobile: hamburger menu with animated slide-down
- [x] Add `ThemeToggle` button in navbar

---

### 3. Hero Section

- [x] Create `Hero.tsx` component
- [x] **Centered Content:**
  - [x] Large bold name with gradient text
  - [x] Title line (Animated with **Typewriter Effect**)
  - [x] Short tagline about skills
  - [x] Two CTA buttons: "View Projects" · "Contact Me"
    - [x] Style: rounded corners, accent bg, white text, shadow
    - [x] Hover effect: scale up slightly
- [x] Add **fade-in animation** using Framer Motion
- [x] Make responsive: centered layout for all screen sizes
- [x] Scroll-down indicator arrow at bottom

---

### 4. About Section

- [x] Create `About.tsx` component
- [x] Add section heading: "About Me" with gradient accent
- [x] Add **profile photo** with glassmorphism & glowing hover effects (Next.js Image)
- [x] Write short paragraph introduction
- [x] Add **skills breakdown** grid:
  - [x] Frontend: JavaScript, TypeScript, React, Next.js, HTML5, CSS3, Tailwind CSS
  - [x] Backend: Node.js, Express.js, REST APIs, Server Actions
  - [x] Database: MongoDB, PostgreSQL, Prisma ORM
  - [x] DevOps & Tools: Git, GitHub, Docker, Vercel, VS Code, Postman
- [x] Display skills as tagged pills in glass cards
- [x] Add "Download CV" button
- [x] Add scroll-triggered fade-in animation (Framer Motion)

---

### 5. Projects Section

- [x] Create `ProjectCard.tsx` component
- [x] Create `data/projects.ts` data file with project array
- [x] Each project entry includes:
  - [x] `title`, `description`, `techStack`, `features`
  - [x] `image`, `liveUrl`, `githubUrl`
  - [x] `challenges`, `learnings`
- [x] Add 3 projects:
  - [x] Admin Notification System
  - [x] Data Analysis Website
  - [x] Consultancy Website (Next.js + Prisma)
- [x] **Card layout:**
  - [x] Project screenshot with `next/image` (graceful fallback to initial letter)
  - [x] Title with hover accent color
  - [x] Short description (line-clamped)
  - [x] Tech stack tags
  - [x] "Code" / "Live Demo" buttons
- [x] Responsive grid:
  - [x] Desktop: 3 columns
  - [x] Tablet: 2 columns
  - [x] Mobile: 1 column
- [x] Add hover animation on cards (Framer Motion)
- [x] Add actual project screenshots to `/public/images/projects/`

---

### 6. Experience Section

- [x] Create `Experience.tsx` component
- [x] Structure each entry:
  - [x] Job title + Company name
  - [x] Date range with calendar icon
  - [x] Short description + achievements (bullet points)
- [x] Add experience data:
  - [x] CloudFactory – Image Annotation (May 2025 – Present)
- [x] Style as vertical timeline with alternating cards
- [x] Timeline dot indicator with accent glow
- [x] Add **"Show More/Less"** toggle for long achievement lists
- [x] Add scroll-triggered animation (Framer Motion)

---

### 7. Contact Section

#### 7.1 Contact Form UI

- [x] Create `Contact.tsx` component
- [x] Fields: Name, Email, Message (textarea)
- [x] Submit button (accent color, rounded, full width)
- [x] Add form validation (client-side required)
- [x] Show success/error states after submission
- [x] Loading spinner during submission

#### 7.2 Contact Form Backend

- [x] Create Server Action for form submission
- [x] Integrate email sending (**FormSubmit.co** AJAX API)
- [x] Add input validation (Zod)
- [x] Add rate limiting to prevent spam
- [x] Add Honeypot field for spam prevention

#### 7.3 Social Links

- [x] Display Email, LinkedIn, GitHub links with icons
- [x] Glass card style for each social link
- [x] Add CTA text: "Let's Connect"

---

### 8. Footer Component

- [x] Create `Footer.tsx` component
- [x] Add copyright: `© 2026 Saral Bajracharya`
- [x] "Made with ❤️ and Next.js"
- [x] Add social icons: GitHub, LinkedIn, Email
- [x] Style: dark background, minimal, consistent with design

---

### 9. SEO & Meta Tags

- [x] Configure root `metadata` in `layout.tsx`:
  - [x] Title
  - [x] Description
  - [x] Keywords
  - [x] Authors
  - [x] OpenGraph tags
- [x] Ensure proper heading hierarchy: single `<h1>` per page
- [x] Use semantic HTML5 elements (`<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`)
- [x] Generate `sitemap.xml`
- [x] Add `robots.txt`

---

### 10. Performance Optimization

- [x] Ensure static rendering (SSG) — verified via build
- [x] Code splitting working (Next.js default)
- [x] Use `next/image` for project screenshots
- [ ] Run Lighthouse audit — target **90+** on all metrics
- [ ] Optimize bundle size (tree-shake icons, minimal dependencies)

---

### 11. Accessibility

- [x] Add ARIA labels to interactive elements (hamburger, scroll button)
- [x] Focus-visible styles for keyboard navigation
- [x] Color contrast (dark bg + soft white text)
- [x] Add `alt` text to all project images
- [ ] Test with screen reader (basic pass)

---

### 12. Responsive Design

- [x] Built responsive for all sections:
  - [x] Hero stacks vertically on mobile
  - [x] Projects grid: 3 → 2 → 1 columns
  - [x] Navbar collapses to hamburger
  - [x] About section stacks vertically
  - [x] Experience timeline adapts
  - [x] Contact form full-width on mobile
- [ ] Manual testing on actual devices

---

### 13. Deployment

- [ ] Set up Vercel project linked to GitHub repo
- [ ] Configure environment variables on Vercel (email API keys)
- [ ] Set up custom domain (if available)
- [ ] Verify automatic CI/CD deploys on push
- [x] Run production build locally: `npm run build` ✅
- [ ] Check live site on multiple devices

---

## 🚀 PHASE 2 — Enhancements

---

### 14. Blog System (Optional but Powerful)

- [ ] Set up MDX support in Next.js
- [ ] Create `/blog` route
- [ ] Write first blog posts:
  - [ ] "How I Built the Admin Notification System"
  - [ ] "Dockerizing a MERN App"
- [ ] Create `BlogCard.tsx` component
- [ ] Add blog link to Navbar
- [ ] Style blog post pages (typography, code blocks)

---

### 15. Enhanced Animations

- [x] Add page transition animations (Framer Motion)
- [x] Add staggered reveal for project cards
- [x] Add parallax or subtle scroll effects
- [x] Add loading skeleton states

---

### 16. CMS & Admin Panel (Future)

- [ ] Set up Prisma ORM
- [ ] Connect PostgreSQL database
- [ ] Create admin panel to manage projects
- [ ] CRUD operations for projects data
- [ ] Authentication for admin access

---

### 17. Analytics

- [x] Integrate Vercel Analytics or Google Analytics
- [ ] Track: page visits, contact form clicks, project link clicks
- [ ] Set up basic dashboard view

---

### 18. Additional Future Features

- [ ] Case-study style project detail pages
- [ ] Multi-language support (i18n)
- [ ] Dashboard analytics page
- [ ] Resume/CV download tracking

---

## 📌 Quick Reference

| Layer        | Technology           |
| ------------ | -------------------- |
| Framework    | Next.js (App Router) |
| Language     | TypeScript           |
| Styling      | Tailwind CSS v4      |
| Animations   | Framer Motion        |
| Icons        | Lucide React         |
| Font         | next/font (Poppins)  |
| Email        | Nodemailer / Resend  |
| Validation   | Zod                  |
| Deploy       | Vercel               |
| DB (Phase 2) | PostgreSQL + Prisma  |
