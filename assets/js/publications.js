(() => {
  const section = document.getElementById('publications');
  if (!section) return;

  const filters = section.querySelector('.publication-filters');
  const buttons = Array.from(section.querySelectorAll('[data-publication-filter]'));
  const papers = Array.from(section.querySelectorAll('#publication-list > li'));
  const firstAuthorCount = papers.filter(paper => paper.dataset.firstAuthor === 'true').length;
  const status = section.querySelector('.publication-status');

  section.querySelector('[data-publication-count="first"]').textContent = `(${firstAuthorCount})`;
  section.querySelector('[data-publication-count="all"]').textContent = `(${papers.length})`;

  function selectFilter(filter) {
    const firstOnly = filter === 'first';
    papers.forEach(paper => {
      paper.hidden = firstOnly && paper.dataset.firstAuthor !== 'true';
    });
    buttons.forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.publicationFilter === filter));
    });
    status.textContent = firstOnly
      ? `Showing ${firstAuthorCount} first-author publications.`
      : `Showing all ${papers.length} publications.`;

    // The existing reading progress bar depends on the document height.
    window.dispatchEvent(new Event('resize'));
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => selectFilter(button.dataset.publicationFilter));
  });
  selectFilter('first');
  filters.hidden = false;
})();
