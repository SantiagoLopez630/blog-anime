'use strict';

const characters = [
  {name:'Tanjiro Kamado',mark:'水',color:'#3a8f88',role:'Cazador compasivo',skill:'Respiración del Agua · Hinokami Kagura',text:'Su inquebrantable empatía es tan poderosa como su espada.',image:'https://static.wikitide.net/deathbattlewiki/9/98/Portrait.tanjirokamado.png'},
  {name:'Nezuko Kamado',mark:'血',color:'#b73b56',role:'Demonio protectora',skill:'Arte Demoníaco de Sangre',text:'Conserva su humanidad y lucha por proteger a quienes ama.',image:'https://images.unsplash.com/photo-1534447677768-be436bb09401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=800'},
  {name:'Zenitsu Agatsuma',mark:'雷',color:'#d99435',role:'Espadachín del trueno',skill:'Respiración del Rayo',text:'El miedo desaparece cuando su instinto toma el control.',image:'https://images.unsplash.com/photo-1578632767115-351597cf2477?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=800'},
  {name:'Inosuke Hashibira',mark:'獣',color:'#537788',role:'Guerrero salvaje',skill:'Respiración de la Bestia',text:'Impredecible, competitivo y guiado por sentidos extraordinarios.',image:'https://images.unsplash.com/photo-1563089145-599997674d42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=800'},
  {name:'Giyu Tomioka',mark:'凪',color:'#376d81',role:'Pilar del Agua',skill:'Undécima postura · Calma',text:'Sereno y preciso; su decisión cambió el destino de los Kamado.',image:'https://i.pinimg.com/1200x/c1/a2/61/c1a261ebe99b8320dc67c2fff4468061.jpg'},
  {name:'Kyojuro Rengoku',mark:'炎',color:'#c4492d',role:'Pilar de la Llama',skill:'Respiración de la Llama',text:'Una voluntad ardiente que inspira a toda una generación.',image:'https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=800'},
  {name:'Shinobu Kocho',mark:'蝶',color:'#765b91',role:'Pilar del Insecto',skill:'Venenos de glicinia',text:'Velocidad, inteligencia y una sonrisa que esconde determinación.',image:'https://images.unsplash.com/photo-1533167649158-6d5088b5b66d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=800'},
  {name:'Muichiro Tokito',mark:'霞',color:'#438d89',role:'Pilar de la Niebla',skill:'Respiración de la Niebla',text:'Un prodigio distante con un talento excepcional para la espada.',image:'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=800'},
  {name:'Mitsuri Kanroji',mark:'恋',color:'#a75472',role:'Pilar del Amor',skill:'Respiración del Amor',text:'Fuerza extraordinaria, flexibilidad y un corazón sin reservas.',image:'https://images.unsplash.com/photo-1534447677768-be436bb09401?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=800'},
  {name:'Tengen Uzui',mark:'音',color:'#80745f',role:'Pilar del Sonido',skill:'Partitura de combate',text:'Extravagante shinobi que convierte la batalla en ritmo.',image:'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=800'},
  {name:'Sanemi Shinazugawa',mark:'風',color:'#567060',role:'Pilar del Viento',skill:'Respiración del Viento',text:'Feroz por fuera, marcado por una historia de sacrificio.',image:'https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=800'},
  {name:'Gyomei Himejima',mark:'岩',color:'#6f6255',role:'Pilar de la Roca',skill:'Respiración de la Roca',text:'El más fuerte de los Pilares; fe, disciplina y poder absoluto.',image:'https://static.wikia.nocookie.net/factvsfiction/images/2/26/Himejima.png/revision/latest?cb=20200408181247'}
];

const navItems = [
  ['inicio','Inicio'],['historia','Historia'],['personajes','Personajes'],['temporadas','Temporadas'],
  ['curiosidades','Curiosidades'],['manga','Manga'],['peliculas','Películas'],['creadora','Creadora'],
  ['quienes-somos','Quiénes somos'],['contacto','Contacto']
];

const grid = document.querySelector('#character-grid');
const searchInput = document.querySelector('#character-search');
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const characterModal = document.querySelector('#character-modal');
const infoModal = document.querySelector('#info-modal');
let activeFilter = 'Todos';
let lastFocusedElement = null;

function renderCharacters() {
  const term = searchInput.value.trim().toLocaleLowerCase('es');
  const filtered = characters.filter(character => {
    const isHashira = character.role.includes('Pilar');
    const typeMatches = activeFilter === 'Todos' || (activeFilter === 'Hashira' ? isHashira : !isHashira);
    const textMatches = `${character.name} ${character.skill} ${character.role}`.toLocaleLowerCase('es').includes(term);
    return typeMatches && textMatches;
  });

  grid.innerHTML = filtered.map((character, index) => `
    <article class="character-card" style="--accent:${character.color}">
      <div class="character-visual">
        <img src="${character.image}" alt="${character.name}" class="character-img" loading="lazy">
        <span class="character-number">${String(index + 1).padStart(2, '0')}</span>
        <span class="character-mark" aria-hidden="true">${character.mark}</span><div class="blade"></div>
        <span class="character-role">${character.role}</span>
      </div>
      <div class="character-info"><h3>${character.name}</h3><p>${character.text}</p><strong>${character.skill}</strong>
        <button type="button" data-character="${character.name}">Ver personaje <span class="arrow">↗</span></button>
      </div>
    </article>`).join('');
  document.querySelector('#character-empty').hidden = filtered.length !== 0;
}

function goTo(id) {
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
  closeMenu();
}

function closeMenu() {
  const nav = document.querySelector('.nav-links');
  const toggle = document.querySelector('.menu-toggle');
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Abrir menú');
}

function openModal(modal) {
  lastFocusedElement = document.activeElement;
  modal.hidden = false;
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close').focus();
}

function closeModal(modal) {
  modal.hidden = true;
  if (characterModal.hidden && infoModal.hidden) document.body.classList.remove('modal-open');
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') lastFocusedElement.focus();
}

function showCharacter(name) {
  const character = characters.find(item => item.name === name);
  if (!character) return;
  const dialog = characterModal.querySelector('.character-modal');
  dialog.style.setProperty('--accent', character.color);
  
  const modalImg = document.querySelector('#modal-img');
  if (modalImg) modalImg.src = character.image;

  document.querySelector('#modal-mark').textContent = character.mark;
  document.querySelector('#modal-role').textContent = character.role;
  document.querySelector('#modal-name').textContent = character.name;
  document.querySelector('#modal-text').textContent = character.text;
  document.querySelector('#modal-skill').textContent = character.skill;
  openModal(characterModal);
}

function showFilmInfo(type) {
  const details = type === 'mugen'
    ? {title:'Mugen Train', text:'Tanjiro y sus compañeros se unen a Kyojuro Rengoku para investigar desapariciones a bordo de un tren. La misión pone a prueba su voluntad, sus vínculos y su capacidad para proteger a los pasajeros.'}
    : {title:'Infinity Castle', text:'La historia entra en su etapa final dentro del Castillo Infinito, una fortaleza cambiante donde los cazadores se enfrentan a enemigos de enorme poder. Consulta los canales oficiales para información actualizada sobre estrenos y distribución.'};
  document.querySelector('#info-title').textContent = details.title;
  document.querySelector('#info-text').textContent = details.text;
  openModal(infoModal);
}

searchInput.addEventListener('input', renderCharacters);
filterButtons.forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  filterButtons.forEach(item => item.classList.toggle('selected', item === button));
  renderCharacters();
}));

document.addEventListener('click', event => {
  const goButton = event.target.closest('[data-go]');
  if (goButton) goTo(goButton.dataset.go);

  const characterButton = event.target.closest('[data-character]');
  if (characterButton) showCharacter(characterButton.dataset.character);

  const filmButton = event.target.closest('[data-film]');
  if (filmButton) showFilmInfo(filmButton.dataset.film);
});

document.querySelector('.menu-toggle').addEventListener('click', event => {
  const toggle = event.currentTarget;
  const nav = document.querySelector('.nav-links');
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

[characterModal, infoModal].forEach(modal => {
  modal.addEventListener('click', event => {
    if (event.target === modal || event.target.closest('.modal-close')) closeModal(modal);
  });
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if (!characterModal.hidden) closeModal(characterModal);
    if (!infoModal.hidden) closeModal(infoModal);
    closeMenu();
  }
});

const backTop = document.querySelector('#back-top');
window.addEventListener('scroll', () => {
  backTop.hidden = window.scrollY < 700;
  const marker = window.scrollY + window.innerHeight * 0.35;
  let current = 'inicio';
  navItems.forEach(([id]) => {
    const section = document.getElementById(id);
    if (section && section.offsetTop <= marker) current = id;
  });
  document.querySelectorAll('.nav-links [data-go]').forEach(button => {
    button.classList.toggle('active', button.dataset.go === current);
  });
}, {passive:true});
backTop.addEventListener('click', () => goTo('inicio'));

document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const feedback = document.querySelector('#form-feedback');
  if (!form.checkValidity()) {
    form.reportValidity();
    feedback.textContent = 'Revisa los campos antes de continuar.';
    feedback.className = 'form-feedback error';
    return;
  }
  const data = new FormData(form);
  const subject = `[Demon Slayer Blog] ${data.get('subject')}`;
  const body = `Nombre: ${data.get('name')}\nCorreo: ${data.get('email')}\n\n${data.get('message')}`;
  feedback.textContent = 'Formulario validado. Se abrirá tu aplicación de correo para que puedas enviar el mensaje.';
  feedback.className = 'form-feedback success';
  window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.querySelector('#current-year').textContent = new Date().getFullYear();
renderCharacters();