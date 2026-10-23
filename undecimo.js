"use strict";

(() => {
  const category = document.getElementById("data-category");
  const place = document.getElementById("data-place");
  const reset = document.getElementById("data-reset");
  const results = document.getElementById("data-results");
  const query = document.getElementById("data-query");
  const empty = document.getElementById("data-empty");
  const rows = Array.from(document.querySelectorAll("[data-object-row]"));
  if (!category || !place || !reset || !results || !query || !empty || !rows.length) return;

  function filterObjects() {
    let visible = 0;
    rows.forEach(row => {
      const matchesCategory = category.value === "all" || row.dataset.category === category.value;
      const matchesPlace = place.value === "all" || row.dataset.place === place.value;
      row.hidden = !(matchesCategory && matchesPlace);
      if (!row.hidden) visible += 1;
    });
    empty.hidden = visible > 0;
    results.textContent = visible === 1 ? "1 objeto encontrado." : `${visible} objetos encontrados.`;
    const categoryDescription = category.value === "all" ? "todas las categorías" : `categoría ${category.options[category.selectedIndex].text}`;
    const placeDescription = place.value === "all" ? "todos los lugares" : `lugar ${place.options[place.selectedIndex].text}`;
    query.textContent = `Consulta actual: ${categoryDescription}; ${placeDescription}.`;
    reset.disabled = category.value === "all" && place.value === "all";
  }

  category.addEventListener("change", filterObjects);
  place.addEventListener("change", filterObjects);
  reset.addEventListener("click", () => {
    category.value = "all";
    place.value = "all";
    filterObjects();
  });
})();
