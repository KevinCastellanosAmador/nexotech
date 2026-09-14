const toggle = document.querySelector('[data-menu-toggle]');
const links = document.querySelector('[data-nav-links]');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const filters = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('[data-resource]');
const searchInput = document.querySelector('[data-search]');

function applyFilters() {
  if (!cards.length) return;
  const selected = Array.from(filters)
    .filter((filter) => filter.checked)
    .map((filter) => filter.value);
  const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

  cards.forEach((card) => {
    const haystack = card.textContent.toLowerCase();
    const tags = card.dataset.tags.split(',');
    const matchesTags = selected.length === 0 || selected.some((tag) => tags.includes(tag));
    const matchesQuery = !query || haystack.includes(query);
    card.hidden = !(matchesTags && matchesQuery);
  });
}

filters.forEach((filter) => filter.addEventListener('change', applyFilters));
if (searchInput) searchInput.addEventListener('input', applyFilters);

const routeForm = document.querySelector('[data-route-form]');
const routeResult = document.querySelector('[data-route-result]');

if (routeForm && routeResult) {
  routeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(routeForm);
    const goal = data.get('goal');
    const level = data.get('level');
    routeResult.hidden = false;
    routeResult.innerHTML = `
      <strong>Ruta sugerida lista.</strong>
      <span>Con objetivo en ${goal} y nivel ${level}, te recomendamos iniciar con el recurso de Desarrollo Web aplicado y avanzar al proyecto integrador.</span>
    `;
  });
}

const registerForm = document.querySelector('[data-register-form]');
const registerMessage = document.querySelector('[data-register-message]');

if (registerForm && registerMessage) {
  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    registerMessage.hidden = false;
    registerMessage.textContent = 'Registro simulado correctamente. En el prototipo, este paso confirma el flujo de acceso a Mi Ruta Tech.';
  });
}
