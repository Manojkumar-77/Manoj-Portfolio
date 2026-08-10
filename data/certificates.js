/**
 * data/certificates.js
 * ─────────────────────────────────────────
 * Certificate data — single source of truth for the Certificates section.
 *
 * Edit this file to add, remove or update certificates.
 *
 * Fields:
 *   id            – unique slug identifier
 *   title         – certificate title (exact name on document)
 *   issuer        – issuing organization
 *   date          – completion/issue date string
 *   category      – one of: 'AI & Cloud', 'Development', 'Professional', 'Platform'
 *   file          – path to the PDF file in assets/certificates/
 *   credentialUrl – external verification URL ('' if none)
 *
 * NOTE: Certificate images are PDFs here. The lightbox will display
 * the PDF in an iframe, or use <embed> for best cross-browser support.
 */

const CERTIFICATES = [
  {
    id: 'ai-fundamentals',
    title: 'AI Fundamentals',
    issuer: 'IBM / Coursera',
    date: '2025',
    category: 'AI & Cloud',
    file: 'assets/certificates/AI-Fundamentals.pdf',
    credentialUrl: '',
  },
  {
    id: 'gen-ai',
    title: 'Generative AI',
    issuer: 'IBM / Coursera',
    date: '2025',
    category: 'AI & Cloud',
    file: 'assets/certificates/Gen-AI.pdf',
    credentialUrl: '',
  },
  {
    id: 'google-gemini-multimodal',
    title: 'Google Cloud: Gemini Multimodality and Multimodal',
    issuer: 'Google Cloud',
    date: '2025',
    category: 'AI & Cloud',
    file: 'assets/certificates/Google Cloud Gemini Multimodality and Multimodal.pdf',
    credentialUrl: '',
  },
  {
    id: 'google-prompt-design',
    title: 'Google Cloud: Prompt Design in Vertex AI',
    issuer: 'Google Cloud',
    date: '2025',
    category: 'AI & Cloud',
    file: 'assets/certificates/Google Cloud Prompt Design.pdf',
    credentialUrl: '',
  },
  {
    id: 'ibm-chatbot',
    title: 'Building AI Chatbots',
    issuer: 'IBM',
    date: '2025',
    category: 'AI & Cloud',
    file: 'assets/certificates/IBM Chabot Certificate.pdf',
    credentialUrl: '',
  },
  {
    id: 'python',
    title: 'Python Programming',
    issuer: 'NIIT / Coursera',
    date: '2025',
    category: 'Development',
    file: 'assets/certificates/Python.pdf',
    credentialUrl: '',
  },
  {
    id: 'web-development',
    title: 'Web Development',
    issuer: 'Coursera',
    date: '2025',
    category: 'Development',
    file: 'assets/certificates/Web Development.pdf',
    credentialUrl: '',
  },
  {
    id: 'it-service-management',
    title: 'IT Service Management',
    issuer: 'Coursera',
    date: '2025',
    category: 'Platform',
    file: 'assets/certificates/IT Service Management.pdf',
    credentialUrl: '',
  },
  {
    id: 'servicenow-micro',
    title: 'ServiceNow Micro Certification',
    issuer: 'ServiceNow',
    date: '2025',
    category: 'Platform',
    file: 'assets/certificates/Micro Certification ServiceNow.pdf',
    credentialUrl: '',
  },
  {
    id: 'communication-personality',
    title: 'Communication and Personality Dynamics',
    issuer: 'Coursera',
    date: '2025',
    category: 'Professional',
    file: 'assets/certificates/Communication And Personality Dynamics.pdf',
    credentialUrl: '',
  },
  {
    id: 'english-communication',
    title: 'English Communication',
    issuer: 'Coursera',
    date: '2025',
    category: 'Professional',
    file: 'assets/certificates/English Communication.pdf',
    credentialUrl: '',
  },
  {
    id: 'problem-solving',
    title: 'Problem Solving and Process Control',
    issuer: 'Coursera',
    date: '2025',
    category: 'Professional',
    file: 'assets/certificates/Problem Solving And Process Control.pdf',
    credentialUrl: '',
  },
];

/**
 * CERTIFICATE_CATEGORIES
 * Display order and labels for grouping in the Certificates section.
 */
const CERTIFICATE_CATEGORIES = [
  { key: 'all',          label: 'All' },
  { key: 'AI & Cloud',   label: 'AI & Cloud' },
  { key: 'Development',  label: 'Development' },
  { key: 'Platform',     label: 'Platform' },
  { key: 'Professional', label: 'Professional' },
];
