/**
 * data/projects.js
 * ─────────────────────────────────────────
 * Canonical project data — single source of truth for all pages.
 *
 * Used by:
 *   - index.html   (homepage Work section — first 3 featured)
 *   - projects.html (full listing with filtering)
 *   - case-study.html (full case-study data)
 *
 * DO NOT rename slugs — they are used in URLs:
 *   case-study.html?project=<slug>
 *
 * Fields (homepage + projects page):
 *   id            – sequential number
 *   slug          – URL parameter identifier
 *   title         – display title
 *   category      – filter key: 'ai', 'fullstack', 'cms', 'enterprise'
 *   categoryLabel – human-readable category label
 *   tags          – tech tags shown on card
 *   year          – project year string
 *   desc          – short description for cards
 *   image         – path to PNG fallback image
 *   imageWebp     – path to WebP image (optional, derived from image if blank)
 *   alt           – img alt text
 *   caseStudyUrl  – URL to case study page
 *
 * Additional fields for case-study page:
 *   subtitle, type, role, focus,
 *   problemShort, solutionShort, outcomeShort,
 *   overview, problem, solution, features[],
 *   contribution, process[{title,text}],
 *   learning, demonstrates,
 *   stack[], github, demo
 */

const PROJECTS = [

  /* ═══ 01 — SOCIAL MOOD MATCHER ═════════════════════════════ */
  {
    id: 1,
    slug: 'social-mood-matcher',
    title: 'Social Mood Matcher',
    category: 'ai',
    categoryLabel: 'AI / GenAI Project',
    tags: ['AI / GenAI', 'Python', 'Streamlit', 'BLIP', 'DistilBERT'],
    year: '2026',
    desc: 'AI-powered social media content generator that analyzes uploaded images, detects mood and visual context, and produces personalized captions and relevant hashtags.',
    image: 'assets/images/project/smm.webp',
    imageWebp: 'assets/images/project/smm.webp',
    alt: 'Social Mood Matcher AI Caption and Hashtag Generator',
    caseStudyUrl: 'case-study.html?project=social-mood-matcher',

    /* ── Case-study extended data ── */
    subtitle: 'An AI-powered social media caption and hashtag generator that analyzes uploaded images, understands mood and visual context, and creates platform-ready content.',
    type: 'AI Application',
    role: 'Developer',
    focus: 'AI Content Generation',
    problemShort: 'Creating captions and finding suitable hashtags manually can be repetitive and time-consuming.',
    solutionShort: 'Analyze an uploaded image, detect mood and context, then generate caption and hashtag suggestions automatically.',
    outcomeShort: 'A single workflow for image understanding, mood detection and platform-aware social content generation.',
    overview: 'Social Mood Matcher is an AI-powered content-generation application designed to simplify the process of creating social media captions and hashtags. The application accepts an uploaded image, analyzes its visual content and mood, and uses that context to generate captions in different writing styles.',
    problem: 'Content creators often spend time deciding how to describe an image, choosing a suitable tone and researching hashtags. Different platforms also have different content limits and styles. The project was designed to combine these repetitive steps into one intelligent workflow.',
    solution: 'The application combines image captioning and sentiment analysis to understand what is present in an image and how it feels. It then uses that information to generate relevant captions and hashtag suggestions. Streamlit provides the interactive interface, while BLIP and DistilBERT handle image understanding and sentiment analysis. An optional Gemini layer can be used for enhanced generation quality.',
    features: [
      'Image upload and visual context analysis',
      'BLIP-based image captioning',
      'DistilBERT-based mood and sentiment detection',
      'Multiple caption styles including casual, aesthetic, professional and playful',
      'Relevant hashtag generation based on context and sentiment',
      'Platform-aware character limiting',
      'Optional Gemini-enhanced content generation',
      'Export-friendly generated content',
    ],
    contribution: 'I worked on the application structure, AI service integration, user interaction flow, generated-content presentation and the overall logic connecting image analysis, mood detection and caption generation.',
    process: [
      { title: 'Project structure & environment', text: 'Organized the application into reusable services and utilities, configured dependencies and prepared the application for local AI models and optional Gemini integration.' },
      { title: 'Image understanding', text: 'Integrated image-captioning logic so uploaded images could be converted into meaningful visual descriptions.' },
      { title: 'Mood & sentiment analysis', text: 'Connected sentiment analysis to the image-description pipeline so the application could classify mood and use it during generation.' },
      { title: 'Caption & hashtag generation', text: 'Built the flow that combines detected context, selected writing style and target platform to create usable social content.' },
      { title: 'UI, validation & testing', text: 'Designed the Streamlit interface, added controls and feedback, and tested uploads, generated content and platform-specific behavior.' },
    ],
    learning: 'This project helped me understand how multiple AI models can be connected into a practical user-facing workflow. It also improved my experience with model integration, caching, input validation, session state and designing an interface around AI-generated outputs.',
    demonstrates: 'Practical AI integration, Python application development, image understanding, sentiment analysis, prompt-assisted generation and building a complete user-facing AI workflow.',
    stack: ['Python', 'Streamlit', 'BLIP', 'DistilBERT', 'Transformers', 'Pillow', 'Gemini 2.5 Flash (Optional)'],
    github: '',
    demo: '',
  },

  /* ═══ 02 — PAYROLL MANAGEMENT SYSTEM ══════════════════════ */
  {
    id: 2,
    slug: 'payroll',
    title: 'Payroll Management System',
    category: 'fullstack',
    categoryLabel: 'Full Stack',
    tags: ['Python', 'Django', 'JavaScript', 'PostgreSQL'],
    year: '2026',
    desc: 'Employee payroll application supporting attendance, salary calculations, allowances, deductions and automated net salary computation.',
    image: 'assets/images/project/pms.webp',
    imageWebp: 'assets/images/project/pms.webp',
    alt: 'Payroll Management System',
    caseStudyUrl: 'case-study.html?project=payroll',

    subtitle: 'A Django-based payroll application for managing employees, attendance inputs, earnings, deductions and salary calculations.',
    type: 'Full Stack Application',
    role: 'Team Developer',
    focus: 'Payroll Automation',
    problemShort: 'Manual payroll calculations can become repetitive and error-prone when employee data, attendance and deductions are handled separately.',
    solutionShort: 'Centralize employee records and payroll inputs, then calculate earnings, deductions and net salary from one application.',
    outcomeShort: 'A structured payroll workflow with employee management, salary logic and printable payroll information.',
    overview: 'The Payroll Management System is a web application created to simplify employee payroll administration. It stores employee and organizational data and provides payroll calculations using salary, allowances, deductions, working days and absence information.',
    problem: 'Payroll requires multiple pieces of information to stay synchronized: employee data, salary structure, allowances, deductions and attendance. Handling these separately increases repetitive work and makes salary calculation harder to manage consistently.',
    solution: 'The project uses Django models and administration features to organize departments, positions, employees and payroll records. Payroll calculations derive values such as total earnings, total deductions and net salary from the stored inputs.',
    features: [
      'Department and position management',
      'Employee profile and salary management',
      'Working-day and absence inputs',
      'HRA, DA and other allowance handling',
      'PF, advance and loan deductions',
      'Loss-of-pay based on absence',
      'Automatic total earnings and net salary calculations',
      'Payroll reports and printable salary information',
    ],
    contribution: 'I contributed to the full-stack development of the application, including Django models, admin customization, salary-calculation logic, validation, testing and responsive interface improvements.',
    process: [
      { title: 'Data modelling', text: 'Structured departments, positions, employees and payroll information using related Django models.' },
      { title: 'Payroll logic', text: 'Implemented salary calculations for earnings, deductions, absence-related loss of pay and net salary.' },
      { title: 'Admin customization', text: 'Customized the Django administration interface to make employee and payroll operations easier to manage.' },
      { title: 'Reports & usability', text: 'Added payroll summaries and report-oriented views while improving field organization and readability.' },
      { title: 'Testing & refinement', text: 'Validated salary inputs, fixed model and admin issues and tested different payroll scenarios.' },
    ],
    learning: 'The project strengthened my understanding of Django relationships, validation, model properties, admin customization and translating business rules into application logic.',
    demonstrates: 'Django full-stack development, relational data modelling, business-rule implementation, validation, debugging and practical payroll workflow design.',
    stack: ['Python', 'Django', 'JavaScript', 'Bootstrap 5', 'PostgreSQL', 'Django Admin'],
    github: '',
    demo: '',
  },

  /* ═══ 03 — COLLEGE MEMORIES GALLERY ═══════════════════════ */
  {
    id: 3,
    slug: 'college-memories',
    title: 'College Memories Gallery',
    category: 'cms',
    categoryLabel: 'Gallery / CMS',
    tags: ['JavaScript', 'Node.js', 'Express', 'SQLite'],
    year: '2026',
    desc: 'Responsive digital memories platform for organizing photos, videos, timelines, scrapbook content, events and yearbook profiles.',
    image: 'assets/images/project/cm.webp',
    imageWebp: 'assets/images/project/cm.webp',
    alt: 'College Memories Gallery and CMS',
    caseStudyUrl: 'case-study.html?project=college-memories',

    subtitle: 'A responsive digital memories platform for organizing photos, videos, timelines, events and yearbook-style content.',
    type: 'Content Management Platform',
    role: 'Developer',
    focus: 'Responsive Media CMS',
    problemShort: 'Large collections of college photos and videos become difficult to organize, browse and maintain as static files.',
    solutionShort: 'Build a responsive gallery with categories, timelines, yearbook content and an admin workflow for managing media.',
    outcomeShort: 'A personal digital archive that brings photos, videos and memories into one structured responsive experience.',
    overview: 'College Memories Gallery is a responsive web project created to preserve and organize college memories in a more meaningful way than storing images in folders. The site combines gallery browsing, timeline content, video memories, scrapbook-style sections and yearbook profiles.',
    problem: 'As the number of images and videos grows, ordinary folders become difficult to browse and provide no context around events, people or timelines. Updating a large static gallery manually can also become difficult.',
    solution: 'The project organizes media into structured sections and categories while providing a simple content-management flow. A Node.js and Express backend supports the application, while SQLite stores structured content. The frontend focuses heavily on responsive gallery behavior and browsing usability.',
    features: [
      'Responsive photo gallery',
      'Timeline-based memories',
      'Video gallery',
      'Yearbook profiles',
      'Scrapbook-style content',
      'Category-based filtering',
      'Search and gallery browsing',
      'Admin media management',
      'Responsive layouts for mobile, tablet and desktop',
    ],
    contribution: 'I designed and developed the gallery experience, responsive layouts, content structure, admin workflows and the Node.js and Express integration used to manage media and site content.',
    process: [
      { title: 'Content structure', text: 'Separated memories into gallery, timeline, yearbook, video and scrapbook sections to make large collections easier to explore.' },
      { title: 'Responsive frontend', text: 'Built layouts that adapt across mobile, tablet and desktop while preserving image quality and navigation usability.' },
      { title: 'Gallery interactions', text: 'Added searching, filtering, modal viewing, categories and media-specific behaviors.' },
      { title: 'Admin management', text: 'Created workflows for adding, editing, replacing and removing media without manually editing every page.' },
      { title: 'Backend & reliability', text: 'Connected Express and SQLite, improved database handling and prepared the project for deployment-oriented use.' },
    ],
    learning: 'This project taught me how quickly media-heavy applications become complex. I gained experience with responsive image layouts, content organization, admin usability, SQLite write handling and designing a site that can grow beyond its initial dataset.',
    demonstrates: 'Responsive web development, Node.js and Express integration, SQLite content management, gallery UX, media organization and building a maintainable multi-page project.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express', 'SQLite'],
    github: '',
    demo: '',
  },

  /* ═══ 04 — E-COMMERCE WEB APPLICATION ═════════════════════ */
  {
    id: 4,
    slug: 'ecommerce',
    title: 'E-Commerce Web Application',
    category: 'fullstack',
    categoryLabel: 'E-Commerce',
    tags: ['Python', 'Django', 'JavaScript', 'SQLite'],
    year: '2026',
    desc: 'Full-stack shopping application featuring product browsing, product information, cart management and database-driven operations.',
    image: 'assets/images/project/e-commerce.webp',
    imageWebp: 'assets/images/project/e-commerce.webp',
    alt: 'E-Commerce Web Application',
    caseStudyUrl: 'case-study.html?project=ecommerce',

    subtitle: 'A full-stack shopping application built around product browsing, cart management and database-driven product operations.',
    type: 'Academic Full Stack Project',
    role: 'Developer',
    focus: 'Online Shopping Workflow',
    problemShort: 'Online stores need a clear way to present products and maintain shopping interactions with persistent application data.',
    solutionShort: 'Build a database-driven Django application for browsing products and managing basic shopping actions.',
    outcomeShort: 'A complete academic e-commerce workflow connecting frontend browsing with Django-backed product data.',
    overview: 'The E-Commerce Web Application is a full-stack academic project focused on the essential workflow of an online store. The project combines a user-facing product interface with server-side application logic and database-driven product information.',
    problem: 'A useful shopping application needs more than static product cards. Product information, shopping actions and page behavior need to remain connected to application data while still providing a simple browsing experience.',
    solution: 'The application uses Django to organize product data and application logic, with HTML, CSS and JavaScript providing the user-facing experience. The project focuses on product discovery and core shopping interactions.',
    features: [
      'Product listing and detail pages',
      'Category-based product browsing',
      'Shopping cart management',
      'Database-driven product management',
      'Django admin for product operations',
      'Responsive layout for mobile and desktop',
      'Session-based cart state',
    ],
    contribution: 'I built the frontend product experience, Django models, admin customization, cart logic and responsive layout for the shopping application.',
    process: [
      { title: 'Product models', text: 'Defined products, categories and cart models using Django ORM and set up database relationships.' },
      { title: 'Product listing & detail', text: 'Built browsing pages with category filtering and individual product detail views.' },
      { title: 'Cart functionality', text: 'Implemented session-based cart behavior for adding, updating and removing items.' },
      { title: 'Admin customization', text: 'Configured Django admin for product management operations.' },
      { title: 'Responsive layout', text: 'Ensured the application works consistently across mobile, tablet and desktop viewports.' },
    ],
    learning: 'This project reinforced practical Django development including model relationships, session handling, template rendering and admin customization for a real-world application pattern.',
    demonstrates: 'Django full-stack development, product data modelling, session management, admin customization and responsive web application design.',
    stack: ['Python', 'Django', 'HTML5', 'CSS3', 'JavaScript', 'SQLite'],
    github: '',
    demo: '',
  },

  /* ═══ 05 — EDUCATIONAL ORGANIZATION MANAGEMENT SYSTEM ═════ */
  {
    id: 5,
    slug: 'education',
    title: 'Educational Organization Management System',
    category: 'enterprise',
    categoryLabel: 'Enterprise Workflow',
    tags: ['ServiceNow', 'Tables', 'Forms', 'Workflows'],
    year: '2025',
    desc: 'ServiceNow-based educational administration application for managing student records, academic information and structured organizational workflows.',
    image: 'assets/images/project/EOS-servicenow.webp',
    imageWebp: 'assets/images/project/EOS-servicenow.webp',
    alt: 'Educational Organization Management System',
    caseStudyUrl: 'case-study.html?project=education',

    subtitle: 'A ServiceNow-based educational administration application for managing student records, academic information and structured workflows.',
    type: 'Enterprise Platform Application',
    role: 'Developer',
    focus: 'Educational Administration',
    problemShort: 'Managing student records, academic data and administrative workflows across an educational organization can be fragmented and inconsistent.',
    solutionShort: 'Use ServiceNow tables, forms and workflows to centralize student records and academic administration in one structured platform.',
    outcomeShort: 'A ServiceNow-based educational administration application with structured records, workflows and role-based access.',
    overview: 'The Educational Organization Management System is a ServiceNow application designed to manage student records, academic information and administrative workflows for an educational institution. It uses the ServiceNow platform to organize and process educational administration data.',
    problem: 'Educational institutions handle large volumes of student data including enrollment, academic records, assessments and organizational workflows. Managing these across separate systems creates inconsistency and makes structured administration difficult.',
    solution: 'The application uses ServiceNow tables to store and relate student, course, faculty and organizational data. Forms provide structured data entry, while workflows automate administrative processes. Role-based access controls what different users can view and modify.',
    features: [
      'Student record management',
      'Course and faculty data organization',
      'Administrative workflow automation',
      'Structured forms for data entry',
      'Role-based access control',
      'Reporting and data views',
      'ServiceNow platform integration',
    ],
    contribution: 'I designed and built the table structures, forms, workflows and relationships used to organize educational administration data across the ServiceNow instance.',
    process: [
      { title: 'Table & data structure', text: 'Designed tables for students, courses, faculty and organizational relationships within ServiceNow.' },
      { title: 'Forms & data entry', text: 'Built structured forms with validation for entering and updating educational records.' },
      { title: 'Workflows', text: 'Implemented automated workflows for administrative processes and approvals.' },
      { title: 'Access control', text: 'Configured roles and permissions to ensure appropriate data access across user groups.' },
      { title: 'Testing & refinement', text: 'Tested data relationships, form behavior and workflow execution across scenarios.' },
    ],
    learning: 'This project gave me practical experience with ServiceNow platform development, table relationships, workflow design and enterprise application patterns. It also reinforced how platform-specific tools differ from traditional web development.',
    demonstrates: 'ServiceNow platform development, enterprise application design, structured data modelling, workflow automation and administrative system design.',
    stack: ['ServiceNow', 'ServiceNow Tables', 'ServiceNow Forms', 'ServiceNow Workflows', 'Business Rules', 'Access Control'],
    github: '',
    demo: '',
  },
];

/**
 * PROJECT_CATEGORIES
 * Filter categories for the projects page.
 */
const PROJECT_CATEGORIES = [
  { key: 'all',        label: 'All Projects' },
  { key: 'ai',         label: 'AI / GenAI' },
  { key: 'fullstack',  label: 'Full Stack' },
  { key: 'cms',        label: 'CMS / Gallery' },
  { key: 'enterprise', label: 'Enterprise' },
];

/**
 * getProjectBySlug(slug)
 * Helper to retrieve a project by its slug from the PROJECTS array.
 */
function getProjectBySlug(slug) {
  return PROJECTS.find(p => p.slug === slug) || null;
}

/**
 * getFeaturedProjects(count)
 * Returns the first `count` projects for the homepage Work section.
 */
function getFeaturedProjects(count) {
  return PROJECTS.slice(0, count || 3);
}

/**
 * getRelatedProjects(currentSlug, count)
 * Returns `count` projects excluding the current one for the Related section.
 */
function getRelatedProjects(currentSlug, count) {
  const others = PROJECTS.filter(p => p.slug !== currentSlug);
  return others.slice(0, count || 3);
}
