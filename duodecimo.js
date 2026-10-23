"use strict";

(() => {
  const preview = document.getElementById("phone-prototype");
  const largeText = document.getElementById("ux-large-text");
  const contrast = document.getElementById("ux-contrast");
  const descriptive = document.getElementById("ux-descriptive");
  const status = document.getElementById("ux-change-status");
  const reset = document.getElementById("ux-reset");
  const open = document.getElementById("prototype-open");
  const back = document.getElementById("prototype-back");
  const homePanel = document.getElementById("prototype-home");
  const detailPanel = document.getElementById("prototype-detail");
  const screenName = document.getElementById("prototype-screen-name");
  const detailTitle = document.getElementById("prototype-detail-title");
  if (![preview, largeText, contrast, descriptive, status, reset, open, back, homePanel, detailPanel, screenName, detailTitle].every(Boolean)) return;

  function applyChoices() {
    preview.classList.toggle("ux-large", largeText.checked);
    preview.classList.toggle("ux-contrast", contrast.checked);
    open.textContent = descriptive.checked ? "Ver detalles del objeto" : "Continuar";
    const changes = [];
    if (largeText.checked) changes.push("texto más grande");
    if (contrast.checked) changes.push("mayor contraste");
    if (descriptive.checked) changes.push("botón descriptivo");
    status.textContent = changes.length
      ? `Cambios aplicados: ${changes.join(", ")}. Prueba el botón de la app y observa cómo se usa.`
      : "Explora los tres ajustes y prueba el botón de la app.";
  }

  function showHome() {
    homePanel.hidden = false;
    detailPanel.hidden = true;
    screenName.textContent = "Objetos encontrados";
  }

  [largeText, contrast, descriptive].forEach(control => control.addEventListener("change", applyChoices));
  open.addEventListener("click", () => {
    homePanel.hidden = true;
    detailPanel.hidden = false;
    screenName.textContent = "Detalles del objeto";
    detailTitle.focus({preventScroll: true});
  });
  back.addEventListener("click", () => {
    showHome();
    open.focus({preventScroll: true});
  });
  reset.addEventListener("click", () => {
    [largeText, contrast, descriptive].forEach(control => { control.checked = false; });
    showHome();
    applyChoices();
  });
})();
