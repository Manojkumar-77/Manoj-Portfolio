# Manoj Kumar S — Developer Portfolio

A modern, responsive personal developer portfolio showcasing my projects, technical skills, services, internship experience and contact information.

The portfolio is built as a lightweight static website using HTML, Tailwind CSS, JavaScript and Alpine.js, with a premium charcoal, graphite and orange visual design.

## Features

- Fully responsive design for mobile, tablet, laptop and desktop
- Dark and light mode support
- Smooth navigation and section highlighting
- Responsive mobile navigation
- Services showcase
- Selected project showcase
- Dedicated projects page
- Detailed project case studies
- About and technical skills section
- Internship experience section
- Resume access
- Contact form with client-side validation
- Contact form submission without leaving the portfolio
- Success and error notification UI
- Optimized WebP image assets
- Lazy-loaded project images
- SEO and social sharing metadata
- Custom favicon and social preview image
- Accessible and semantic HTML structure

## Portfolio Sections

- Hero
- Services
- Selected Projects
- About Me
- Skills & Tools
- Internship Experience
- Contact

## Featured Projects

1. Social Mood Matcher
2. Payroll Management System
3. College Memories Gallery
4. E-Commerce Web Application
5. Educational Organization Management System

## Technologies

### Frontend

- HTML5
- CSS3
- JavaScript
- Tailwind CSS (CDN — browser runtime)
- Alpine.js 3.14.8 (CDN — pinned version)

### Backend & Programming

- Python
- Django

### Database

- MySQL
- SQLite

### Tools & Platforms

- Git
- GitHub
- VS Code
- ServiceNow

## Project Structure

```text
folio-tailwind-1.0.0/
│
├── assets/
│   ├── favicon/
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-32x32.png
│   │   └── favicon.svg
│   ├── images/
│   │   ├── casual.jpeg          # Hero portrait
│   │   ├── professional.jpeg    # About section portrait
│   │   ├── og-cover.jpg         # Social preview (1200×630)
│   │   └── project/
│   │       ├── cm.png / cm.webp
│   │       ├── e-commerce.png / e-commerce.webp
│   │       ├── EOS-servicenow.png / EOS-servicenow.webp
│   │       ├── pms.png / pms.webp
│   │       └── smm.png / smm.webp
│   └── resume/
│       └── Manoj-Resume.pdf
│
├── index.html       # Main portfolio page
├── projects.html    # Full project gallery
├── case-study.html  # Project case-study view (query-param driven)
├── 404.html         # Custom 404 error page
├── robots.txt       # Crawler permissions
├── sitemap.xml      # XML sitemap for SEO
└── README.md
```

## Pages

### `index.html`

Main portfolio page containing the hero section, services, selected projects, about section, technical skills, internship experience and contact section.

### `projects.html`

Dedicated project showcase containing the complete collection of featured development projects.

### `case-study.html`

Detailed project case-study view presenting project information, technologies, features and development details.

## Local Usage

Clone or download the repository and open:

```text
index.html
```

directly in a modern web browser.

For development and local testing, VS Code Live Server can also be used.

No Python environment, package installation, database or local backend server is required to run the portfolio itself.

## Contact Form

The portfolio includes a contact form with:

- Name validation
- Email validation
- Message validation
- Submission status handling
- Success notifications
- Error notifications
- Responsive notification UI

Messages can be submitted directly from the portfolio without redirecting visitors away from the website.

The form uses Google Apps Script as a serverless endpoint with `no-cors` mode. Because no-cors prevents response inspection, the form optimistically shows a success notification after submission. Network errors are caught and surfaced with a direct email fallback.

## Responsive Design

The portfolio is designed to work across:

- Mobile phones
- Tablets
- Laptops
- Desktop monitors
- Large displays

Layouts, navigation, typography, project cards and interactive elements adapt according to the available screen size.

## Performance

The portfolio uses performance-focused techniques including:

- WebP project images
- Responsive image sizing
- Lazy loading
- Lightweight static pages
- Minimal external dependencies
- Optimized visual assets

## SEO & Social Sharing

The main pages include metadata for search engines and social sharing.

This includes:

- Page titles
- Meta descriptions
- Canonical URLs
- Open Graph metadata
- Social preview image
- Favicon assets

The social preview image is located at:

```text
assets/images/og-cover.jpg
```

## Deployment

This portfolio is designed for static hosting and can be deployed using GitHub Pages or another static hosting provider.

After deployment, replace every instance of `YOUR_DEPLOYED_PORTFOLIO_URL` across the following files with the actual live URL:

```text
index.html
projects.html
case-study.html
robots.txt
sitemap.xml
```

Also update the `url` field inside the JSON-LD structured data block in `index.html`.

Example replacement value:

```text
https://manojkumar-77.github.io/your-repository
```

## Production Hardening (Applied)

- Alpine.js pinned to exact version `3.14.8` (all pages)
- Invalid case-study URL slugs redirect to `projects.html`
- Filter buttons include `type="button"` and `aria-pressed` for accessibility
- Hero image uses `fetchpriority="high"` for LCP optimization
- All images have explicit intrinsic `width`/`height` to eliminate CLS
- `robots.txt` and `sitemap.xml` created for SEO
- Custom `404.html` matching portfolio design
- JSON-LD `Person` + `WebSite` structured data added to homepage
- All external `target="_blank"` links include `rel="noopener noreferrer"`
- No debug `console.log` or `alert()` statements in production code
- Back-to-top anchors use stable `id="top"` page target

## Contact

- Email: [manojkumarsdeveloper07@gmail.com](mailto:manojkumarsdeveloper07@gmail.com)
- LinkedIn: [Manoj Kumar S](https://www.linkedin.com/in/manoj-kumar-s-182358350/)
- GitHub: [Manojkumar-77](https://github.com/Manojkumar-77)

## Credits & Attribution

This portfolio is based on an existing frontend template and has been customized and extended for personal portfolio use, including modifications to its content, project presentation, responsive behavior, contact experience, accessibility, performance and overall interface.

Any original template or third-party assets remain subject to their respective license terms.

## License

This repository is intended for personal portfolio use.

Any third-party libraries, template components, fonts, icons or other external resources included in the project remain subject to their respective licenses.

---

© 2026 Manoj Kumar S. All rights reserved.