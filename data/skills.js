/**
 * data/skills.js
 * ─────────────────────────────────────────
 * Tech Stack data — single source of truth for the Skills / Tech Stack
 * section on the homepage.
 *
 * Edit this file to update technologies displayed.
 *
 * Fields per item:
 *   name     – display name
 *   category – one of: 'Languages', 'Frameworks', 'Databases', 'Tools'
 *   icon     – optional: small inline SVG path string or emoji
 */

const SKILLS = [
  /* ── Languages ───────────────────────────────────── */
  { name: 'Python',     category: 'Languages' },
  { name: 'JavaScript', category: 'Languages' },
  { name: 'HTML5',      category: 'Languages' },
  { name: 'CSS3',       category: 'Languages' },

  /* ── Frameworks & Libraries ──────────────────────── */
  { name: 'Django',       category: 'Frameworks' },
  { name: 'Bootstrap 5',  category: 'Frameworks' },
  { name: 'Streamlit',    category: 'Frameworks' },
  { name: 'Node.js',      category: 'Frameworks' },
  { name: 'Express',      category: 'Frameworks' },

  /* ── Databases ───────────────────────────────────── */
  { name: 'MySQL',      category: 'Databases' },
  { name: 'SQLite',     category: 'Databases' },
  { name: 'PostgreSQL', category: 'Databases' },

  /* ── Tools & Platforms ───────────────────────────── */
  { name: 'Git',         category: 'Tools' },
  { name: 'GitHub',      category: 'Tools' },
  { name: 'VS Code',     category: 'Tools' },
  { name: 'ServiceNow',  category: 'Tools' },
];

/**
 * SKILL_CATEGORIES
 * Display order and labels for grouping in the Tech Stack section.
 */
const SKILL_CATEGORIES = [
  { key: 'Languages',   label: 'Languages' },
  { key: 'Frameworks',  label: 'Frameworks & Libraries' },
  { key: 'Databases',   label: 'Databases' },
  { key: 'Tools',       label: 'Tools & Platforms' },
];
