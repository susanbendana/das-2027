"use strict";
(() => {
  const buttons = Array.from(document.querySelectorAll('[data-step]'));
  const rows = Array.from(document.querySelectorAll('#logic-route li'));
  const feedback = document.getElementById('logic-feedback');
  const reset = document.getElementById('logic-reset');
  if (buttons.length !== 3 || rows.length !== 3 || !feedback || !reset) return;
  const correct = ['receive', 'validate', 'display'];
  const placeholders = ['Primer paso', 'Segundo paso', 'Tercer paso'];
  let sequence = [];
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const key = button.dataset.step;
      if (sequence.includes(key) || sequence.length === 3) return;
      const index = sequence.length;
      sequence.push(key);
      button.disabled = true;
      rows[index].textContent = button.textContent.trim();
      rows[index].classList.add('is-filled');
      reset.disabled = false;
      if (sequence.length === 1) feedback.textContent = 'Ahora elige el segundo paso.';
      else if (sequence.length === 2) feedback.textContent = 'Elige el último paso.';
      else if (sequence.every((value, i) => value === correct[i])) {
        feedback.textContent = '¡Tu idea ya tiene un orden! Recibir, revisar y mostrar: así empiezas a pensar en instrucciones para un programa.';
      } else {
        feedback.textContent = 'Una pista: el programa necesita recibir los datos antes de revisarlos y mostrar el reporte. Vuelve a empezar y prueba esa secuencia.';
      }
    });
  });
  reset.addEventListener('click', () => {
    sequence = [];
    buttons.forEach(button => { button.disabled = false; });
    rows.forEach((row, i) => { row.textContent = placeholders[i]; row.classList.remove('is-filled'); });
    feedback.textContent = 'Elige el paso que pondrías primero.';
    reset.disabled = true;
  });
})();
