// Pestañas de placas (R3 / R4 WiFi)
const boardTabs = document.querySelectorAll('.board-tab');
const boardPanels = document.querySelectorAll('.board-panel');

boardTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.board;

    boardTabs.forEach(t => {
      t.classList.toggle('is-active', t === tab);
      t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
    });

    boardPanels.forEach(panel => {
      panel.classList.toggle('is-active', panel.dataset.boardPanel === target);
    });
  });
});

// Filtro de prácticas por nivel
const filterButtons = document.querySelectorAll('.filter-btn');
const practiceCards = document.querySelectorAll('#practicas-grid .practice-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const level = btn.dataset.filter;

    filterButtons.forEach(b => b.classList.toggle('is-active', b === btn));

    practiceCards.forEach(card => {
      const show = level === 'todas' || card.dataset.level === level;
      card.style.display = show ? '' : 'none';
    });
  });
});
