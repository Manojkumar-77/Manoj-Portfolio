/**
 * js/features/projects.js
 * ─────────────────────────────────────────
 * Projects listing and filtering feature component.
 *
 * Exposes projects logic for Alpine app on projects.html.
 */

window.projectsApp = function () {
  return {
    filter: 'all',
    scrolled: false,
    mobileMenu: false,
    dark: false,

    filterOptions: [
      { label: 'All Projects', value: 'all' },
      { label: 'AI / GenAI', value: 'ai' },
      { label: 'Full Stack', value: 'fullstack' },
      { label: 'CMS', value: 'cms' },
      { label: 'Enterprise', value: 'enterprise' }
    ],

    get allProjects() {
      if (typeof PROJECTS !== 'undefined') {
        return PROJECTS.map(function (item) {
          return {
            id: item.id,
            slug: item.slug,
            title: item.title,
            category: item.category,
            categoryLabel: item.categoryLabel,
            tags: item.tags,
            year: item.year,
            desc: item.desc,
            img: item.image,
            imgWebp: item.imageWebp || item.image.replace('.png', '.webp'),
            alt: item.alt,
            url: item.caseStudyUrl
          };
        });
      }
      return [];
    },

    get filteredProjects() {
      var self = this;
      if (this.filter === 'all') return this.allProjects;
      return this.allProjects.filter(function (p) {
        return p.category === self.filter;
      });
    },

    get visibleCount() {
      return this.filteredProjects.length;
    },

    init: function () {
      var self = this;
      this.dark = localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

      this.$watch('dark', function (val) {
        localStorage.setItem('theme', val ? 'dark' : 'light');
      });

      window.addEventListener('scroll', function () {
        self.scrolled = window.scrollY > 20;
      }, { passive: true });

      window.addEventListener('resize', function () {
        if (window.innerWidth >= 768) self.mobileMenu = false;
      }, { passive: true });
    }
  };
};
