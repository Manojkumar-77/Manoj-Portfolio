/**
 * data/site-config.js
 * ─────────────────────────────────────────
 * Single source of truth for shared, frequently-edited public
 * site information.
 *
 * Everything here is delivered to the browser — treat it as public.
 * Do NOT store API keys, passwords or tokens here.
 */

const SITE_CONFIG = {
  /* ── Person ─────────────────────────────────────── */
  name:          'Manoj Kumar S',
  firstName:     'Manoj',
  title:         'Software Developer',
  titleFull:     'Software Developer & Full-Stack Web Developer',
  email:         'manojkumarsdeveloper07@gmail.com',
  location:      'India',

  /* ── URLs ───────────────────────────────────────── */
  siteUrl:       'https://manojkumar-77.github.io/Manoj-Portfolio',
  github:        'https://github.com/Manojkumar-77',
  linkedin:      'https://www.linkedin.com/in/manoj-kumar-s-182358350/',

  /* ── Assets ─────────────────────────────────────── */
  resumePath:    'assets/resume/Manoj-Resume.pdf',
  profileCasual:       'assets/images/casual.jpeg',
  profileProfessional: 'assets/images/professional.jpeg',
  ogImage:       'assets/images/og-cover.jpg',

  /* ── Stats ──────────────────────────────────────── */
  majorProjects:  5,
  graduationYear: 2026,
  degree:         'BCA Graduate',
};
