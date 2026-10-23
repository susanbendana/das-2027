"use strict";

(() => {
  const projects = {
    found: {
      title: 'Encuentra+',
      context: 'En tu cole',
      question: '¿Y si fuera más fácil recuperar lo que se pierde en el cole?',
      description: 'Una app que reúne los objetos encontrados y permite explorarlos por categoría. Una necesidad cercana puede convertirse en una solución útil.',
      hint: 'Toca una categoría y mira cómo cambia la lista.',
      learning: [
        ['Pensar en pasos', 'Convertir una necesidad en instrucciones claras.'],
        ['Organizar información', 'Guardar y consultar datos de los objetos.'],
        ['Diseñar para las personas', 'Crear y probar pantallas fáciles de usar.']
      ]
    },
    shop: {
      title: 'Pedidos en orden',
      context: 'En tu comunidad',
      question: '¿Cómo ayudarías a un emprendimiento a organizar sus pedidos?',
      description: 'Una app para consultar productos y armar una selección. Puedes conectar una idea de negocio con una solución que facilite una tarea cotidiana.',
      hint: 'Agrega productos y observa cómo cambia tu selección.',
      learning: [
        ['Entender una necesidad', 'Escuchar a quienes usarían una solución para su emprendimiento.'],
        ['Trabajar con datos', 'Organizar productos y pedidos para consultarlos.'],
        ['Conectar lo aprendido', 'Combinar programación, diseño y trabajo en equipo.']
      ]
    },
    agenda: {
      title: 'Mi agenda',
      context: 'En tu día a día',
      question: '¿Y si tuvieras una app para organizar tus propias metas?',
      description: 'Una agenda para anotar tareas, reconocer lo que ya hiciste y decidir tu próximo paso. También puedes crear tecnología para algo que te importa a ti.',
      hint: 'Marca una tarea para ver tu avance. Puedes desmarcarla también.',
      learning: [
        ['Programar decisiones', 'Definir qué ocurre al marcar o completar una tarea.'],
        ['Diseñar interacciones', 'Usar controles claros que respondan a las acciones.'],
        ['Probar y mejorar', 'Comprobar el funcionamiento y ajustar lo que haga falta.']
      ]
    }
  };
  const objects = [
    { name: 'Botella azul', category: 'accessories', place: 'Biblioteca', mark: 'B' },
    { name: 'Cartuchera negra', category: 'supplies', place: 'Aula', mark: 'C' },
    { name: 'Cuaderno verde', category: 'supplies', place: 'Pasillo', mark: 'Q' }
  ];
  const choices = Array.from(document.querySelectorAll('[data-project]'));
  const canvas = document.getElementById('demo-canvas');
  const learningList = document.getElementById('discovery-learning');
  if (!choices.length || !canvas || !learningList) return;
  let activeProject = 'found';
  let basket = { bread: 0, cookies: 0, juice: 0 };

  function showFoundObjects(category) {
    const list = canvas.querySelector('#found-results');
    const status = canvas.querySelector('#found-status');
    if (!list || !status) return;
    const matches = objects.filter(item => category === 'all' || item.category === category);
    list.replaceChildren();
    matches.forEach(item => {
      const row = document.createElement('li');
      row.className = 'found-item';
      const mark = document.createElement('span');
      mark.className = 'found-item-mark';
      mark.setAttribute('aria-hidden', 'true');
      mark.textContent = item.mark;
      const copy = document.createElement('div');
      const name = document.createElement('strong');
      name.textContent = item.name;
      const place = document.createElement('p');
      place.textContent = 'Encontrado en: ' + item.place;
      copy.append(name, place);
      row.append(mark, copy);
      list.append(row);
    });
    status.textContent = matches.length === 1 ? '1 objeto para explorar' : matches.length + ' objetos para explorar';
  }

  function updateBasket() {
    canvas.querySelectorAll('[data-basket-quantity]').forEach(label => {
      label.textContent = 'Cantidad: ' + basket[label.dataset.basketQuantity];
    });
    const total = Object.values(basket).reduce((sum, value) => sum + value, 0);
    canvas.querySelector('#basket-status').textContent = 'Tu selección: ' + total + (total === 1 ? ' producto' : ' productos');
    canvas.querySelector('[data-reset-basket]').disabled = total === 0;
  }

  function selectProject(key) {
    const project = projects[key];
    const template = document.getElementById('demo-' + key);
    if (!project || !template) return;
    activeProject = key;
    choices.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.project === key)));
    document.getElementById('discovery-context').textContent = project.context;
    document.getElementById('discovery-title').textContent = project.title;
    document.getElementById('discovery-question').textContent = project.question;
    document.getElementById('discovery-description').textContent = project.description;
    document.getElementById('demo-hint').textContent = project.hint;
    document.getElementById('learning-disclosure').open = false;
    learningList.replaceChildren();
    project.learning.forEach(item => {
      const row = document.createElement('li');
      const title = document.createElement('strong');
      const description = document.createElement('span');
      title.textContent = item[0];
      description.textContent = item[1];
      row.append(title, description);
      learningList.append(row);
    });
    canvas.replaceChildren(template.content.cloneNode(true));
    if (key === 'found') showFoundObjects('all');
    if (key === 'shop') basket = { bread: 0, cookies: 0, juice: 0 };
    document.getElementById('project-selection-status').textContent = 'Mostrando la idea ' + project.title + '.';
  }

  choices.forEach(button => {
    button.addEventListener('click', () => {
      if (button.dataset.project !== activeProject) selectProject(button.dataset.project);
    });
  });
  canvas.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const filter = event.target.closest('[data-found-filter]');
    if (filter) {
      canvas.querySelectorAll('[data-found-filter]').forEach(button => button.setAttribute('aria-pressed', String(button === filter)));
      showFoundObjects(filter.dataset.foundFilter);
      return;
    }
    const add = event.target.closest('[data-add-product]');
    if (add && Object.hasOwn(basket, add.dataset.addProduct)) {
      basket[add.dataset.addProduct] += 1;
      updateBasket();
      return;
    }
    if (event.target.closest('[data-reset-basket]')) {
      basket = { bread: 0, cookies: 0, juice: 0 };
      updateBasket();
    }
  });
  canvas.addEventListener('change', event => {
    if (!(event.target instanceof Element) || !event.target.matches('[data-agenda-task]')) return;
    const tasks = Array.from(canvas.querySelectorAll('[data-agenda-task]'));
    const completed = tasks.filter(task => task.checked).length;
    canvas.querySelector('#agenda-status').textContent = completed + ' de ' + tasks.length + ' tareas marcadas';
  });
  selectProject('found');
})();
