/**
 * data/experience.js
 * ─────────────────────────────────────────
 * Centralized internship / experience entries.
 * Edit this file to update the Experience section.
 *
 * Fields:
 *   id          – unique identifier
 *   type        – badge label (e.g. 'Internship')
 *   role        – job title
 *   company     – company name
 *   period      – date range string
 *   highlights  – array of bullet-point strings
 */

const EXPERIENCE = [
  {
    id: 'graypixel',
    type: 'Internship',
    role: 'Python Full Stack Developer Intern',
    company: 'Gray Pixel Tech',
    period: 'Jun 2026 – Jul 2026',
    highlights: [
      'Contributed to the development of a Payroll Management System using Python, Django and JavaScript.',
      'Worked on full-stack development, testing and responsive application design.',
    ],
  },
  {
    id: 'curiouswings',
    type: 'Internship',
    role: 'Full Stack Developer Intern',
    company: 'Curious Wings',
    period: 'May 2025 – Jun 2025',
    highlights: [
      'Gained practical knowledge of the web development lifecycle, from development to deployment.',
      'Learned the fundamentals of Quality Assurance (QA), software testing, debugging and website functionality.',
    ],
  },
];
