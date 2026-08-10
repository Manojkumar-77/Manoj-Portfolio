# Manoj Kumar S — Developer Portfolio (V2 Architecture)

A modern, responsive personal developer portfolio showcasing projects, technical skills, services, certificates, internship experience and contact information.

The portfolio is built as a modular static website using HTML5, Tailwind CSS, JavaScript (ES6+), Alpine.js, and clean CSS/JS separation. Designed for maximum maintainability and zero build tools — 100% compatible with GitHub Pages.

> **Performance Note**: Homepage project cards on `index.html` are intentionally rendered as static HTML to optimize initial load, Cumulative Layout Shift (CLS), and Largest Contentful Paint (LCP) performance, while `projects.html` and `case-study.html` dynamically draw from the canonical dataset in `data/projects.js`.
>
> **State Ownership Note**: Theme state (`dark`) and navigation state (`mm`, `sc`, active section `s`) are reactively managed by Alpine.js (`x-data="app()"`, `x-data="projectsApp()"`, `x-data="caseStudyApp()"`) for instant reactive UI updates without external framework overhead.

---

## ⚡ Quick Edit Guide

The portfolio is architected so future content edits **never require wading through thousands of lines of HTML**. All editable data lives in `data/`.

| Task | File to Edit | Asset Location |
|---|---|---|
| **Change personal info / links** | `data/site-config.js` | — |
| **Add / edit project** | `data/projects.js` | `assets/images/project/` |
| **Add / edit certificate** | `data/certificates.js` | `assets/certificates/` |
| **Change tech stack skills** | `data/skills.js` | — |
| **Change experience / internships** | `data/experience.js` | — |
| **Global base styles** | `css/main.css` | — |
| **Responsive breakpoints** | `css/responsive.css` | — |
| **Page-specific styling** | `css/pages/` (`index.css`, `projects.css`, `case-study.css`, `404.css`) | — |
| **Card / tag hover styles** | `css/components/cards.css` | — |
| **Certificates lightbox modal** | `css/components/certificates.css` & `js/components/certificates.js` | — |
| **Navigation behavior** | Alpine `x-data` / `js/components/navigation.js` | `css/components/header.css` |
| **Theme (Dark / Light)** | Alpine `x-data` / `js/components/theme.js` | — |
| **Contact form logic** | `js/features/contact.js` | — |
| **Animations & Scroll Reveal** | `css/animations.css` & `js/features/animations.js` | — |

---

## 📁 Modular Project Structure

```text
Manoj-Portfolio/
│
├── index.html                         # Homepage (Hero → Services → Work → Certificates → Tech Stack → About → Experience → Contact)
├── projects.html                      # All Projects page with interactive filters
├── case-study.html                    # Dynamic Case Study view (?project=<slug>)
├── 404.html                           # Custom 404 error page
├── robots.txt                         # SEO crawler rules
├── sitemap.xml                        # XML sitemap
├── README.md                          # Documentation & Quick Edit Guide
│
├── components/                        # Canonical reference HTML templates
│   ├── header.html                    # Shared header template
│   └── footer.html                    # Shared footer template
│
├── data/                              # Canonical Single Source of Truth Data
│   ├── site-config.js                 # Global config (name, title, contact, socials)
│   ├── projects.js                    # All 5 projects full canonical data
│   ├── certificates.js                # All 12 certificates metadata
│   ├── skills.js                      # Categorized tech stack skills
│   └── experience.js                  # Internship experiences data
│
├── css/                               # Modular CSS Architecture
│   ├── main.css                       # Reset, typography, custom properties, noise texture, scrollbar
│   ├── animations.css                 # Scroll reveal (.reveal), shimmer, delays, reduced-motion
│   ├── responsive.css                 # Global responsive media queries
│   ├── components/                    # Component CSS
│   │   ├── header.css
│   │   ├── footer.css
│   │   ├── buttons.css
│   │   ├── cards.css
│   │   └── certificates.css
│   └── pages/                         # Page-specific CSS
│       ├── index.css
│       ├── projects.css
│       ├── case-study.css
│       └── 404.css
│
├── js/                                # Modular JS Architecture
│   ├── main.js                        # Shared initialization (year, touch, reveal)
│   ├── components/                    # UI Component logic
│   │   ├── navigation.js              # Nav scroll state & mobile menu listener
│   │   ├── theme.js                   # Dark / light theme helper
│   │   └── certificates.js            # Certificate cards & PDF lightbox manager
│   ├── features/                      # Application feature modules
│   │   ├── animations.js              # IntersectionObserver reveal & touch feedback
│   │   ├── contact.js                 # Contact form submission, honeypot & toast
│   │   ├── projects.js                # Projects filter & dataset logic
│   │   ├── certificates.js            # Certificates feature wrapper
│   │   └── case-study.js              # Dynamic query resolver & case-study state
│   ├── pages/                         # Page entry point initializers
│   │   ├── home.js
│   │   ├── projects-page.js
│   │   └── case-study-page.js
│   └── utils/                         # Utilities
│       └── helpers.js                 # Shared helpers (escape HTML, query params, year)
│
└── assets/
    ├── favicon/                       # Favicon PNG / SVG / Apple Touch Icon
    ├── images/
    │   ├── casual.jpeg                # Hero portrait
    │   ├── professional.jpeg          # About section portrait
    │   ├── og-cover.jpg               # Social preview (1200×630)
    │   └── project/                   # Project cover images (PNG & WebP)
    ├── certificates/                  # 12 real PDF certificate documents
    └── resume/                        # Manoj-Resume.pdf
```

---

## 🏛️ Shared Component Strategy

To guarantee **100% reliability on GitHub Pages** and avoid Flash of Unstyled Content (FOUC) or CORS restrictions during local `file://` testing:
- Header and footer markup blocks are rendered as static, zero-latency HTML components inside each main page.
- Canonical reference files (`components/header.html` and `components/footer.html`) are maintained as the single source of structural truth.

---

## 🚀 Local Usage & Deployment

### Local Testing
No build step, Node.js server, Python virtualenv, or bundler is required.
Open `index.html` directly in any web browser, or use VS Code Live Server.

### GitHub Pages Deployment
Deployed target: `https://manojkumar-77.github.io/Manoj-Portfolio/`

All relative asset links (`css/`, `js/`, `data/`, `assets/`) use relative paths to ensure flawless sub-directory hosting under `/Manoj-Portfolio/`.

---

© 2026 Manoj Kumar S. All rights reserved.