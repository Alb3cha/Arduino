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

// Progreso del camino de prácticas y retos
const STORAGE_KEY = 'arduino-taller-progreso';
const stepCards = Array.from(document.querySelectorAll('.step-card'));
const totalSteps = stepCards.length;
const progressFill = document.getElementById('progress-fill');
const progressLabel = document.getElementById('progress-label');

function leerProgreso() {
  const guardado = parseInt(localStorage.getItem(STORAGE_KEY), 10);
  if (Number.isNaN(guardado) || guardado < 1) return 1;
  return guardado;
}

let progreso = leerProgreso();

function aplicarProgreso() {
  stepCards.forEach(card => {
    const n = parseInt(card.dataset.step, 10);
    card.classList.toggle('is-locked', n > progreso);
    card.classList.toggle('is-current', n === progreso);
    card.classList.toggle('is-done', n < progreso);
  });

  const completados = Math.min(progreso - 1, totalSteps);
  const porcentaje = totalSteps ? Math.round((completados / totalSteps) * 100) : 0;
  if (progressFill) progressFill.style.width = porcentaje + '%';
  if (progressLabel) {
    if (completados >= totalSteps) {
      progressLabel.textContent = '¡Camino completado! Ya puedes ir al Reto final.';
    } else {
      progressLabel.textContent = completados + ' de ' + totalSteps + ' tarjetas completadas';
    }
  }
}

document.querySelectorAll('.mark-done').forEach(btn => {
  btn.addEventListener('click', () => {
    const n = parseInt(btn.dataset.step, 10);
    if (n !== progreso) return;

    progreso = Math.min(n + 1, totalSteps + 1);
    localStorage.setItem(STORAGE_KEY, progreso);
    aplicarProgreso();

    const siguiente = document.querySelector('.step-card[data-step="' + progreso + '"]');
    if (siguiente) {
      siguiente.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      document.getElementById('reto-final').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const resetBtn = document.getElementById('reset-progreso');
if (resetBtn) {
  resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem(STORAGE_KEY);
    progreso = 1;
    aplicarProgreso();
    const primero = document.querySelector('.step-card[data-step="1"]');
    if (primero) primero.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

aplicarProgreso();
