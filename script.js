// TEMA
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia(
  '(prefers-color-scheme: dark)',
).matches;

if (savedTheme) {
  body.setAttribute('data-theme', savedTheme);
} else if (systemPrefersDark) {
  body.setAttribute('data-theme', 'dark');
}

updateThemeIcon();

themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon();
});

function updateThemeIcon() {
  const currentTheme = body.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    themeIcon.className = 'fas fa-sun';
  } else {
    themeIcon.className = 'fas fa-moon';
  }
}

// TOGGLE MENU
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach((n) =>
  n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }),
);

// SCROLL SUAVE
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  });
});

// EFEITO HEADER
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.style.boxShadow = '0 5px 20px var(--shadow-color)';
  } else {
    header.style.boxShadow = '0 2px 10px var(--shadow-color)';
  }
});

// CARROSSEL
document.addEventListener('DOMContentLoaded', () => {
  const carouselTrack = document.querySelector('.carousel-track');
  const stackItems = Array.from(carouselTrack.children);

  stackItems.forEach((item) => {
    const clonedItem = item.cloneNode(true);
    carouselTrack.appendChild(clonedItem);
  });

  const allStackItems = Array.from(carouselTrack.children);
  const originalStacksCount = stackItems.length;

  let currentPosition = 0;
  let carouselInterval;
  const intervalTime = 1000;
  let itemWidthWithMargin;

  function calculateItemWidth() {
    if (allStackItems.length > 0) {
      const item = allStackItems[0];
      const style = window.getComputedStyle(item);
      const width = item.offsetWidth;
      const marginLeft = parseFloat(style.marginLeft);
      const marginRight = parseFloat(style.marginRight);
      itemWidthWithMargin = width + marginLeft + marginRight;
    } else {
      itemWidthWithMargin = 0;
    }
  }

  calculateItemWidth();

  window.addEventListener('resize', calculateItemWidth);

  function moveCarousel() {
    if (itemWidthWithMargin === 0) return;

    currentPosition += itemWidthWithMargin;

    carouselTrack.style.transition = 'transform 1s ease-in-out';
    carouselTrack.style.transform = `translateX(-${currentPosition}px)`;

    if (currentPosition >= originalStacksCount * itemWidthWithMargin) {
      setTimeout(() => {
        carouselTrack.style.transition = 'none';
        currentPosition = 0;
        carouselTrack.style.transform = `translateX(-${currentPosition}px)`;
      }, 1000);
    }
  }

  function startCarousel() {
    if (!carouselInterval) {
      carouselInterval = setInterval(moveCarousel, intervalTime);
    }
  }

  function stopCarousel() {
    clearInterval(carouselInterval);
    carouselInterval = null;
  }

  startCarousel();

  const carouselContainer = document.querySelector('.carousel-container');

  carouselContainer.addEventListener('mouseenter', stopCarousel);
  carouselContainer.addEventListener('mouseleave', startCarousel);
});

// ENVIAR MENSAGEM
document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('form');

  formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const msg = document.getElementById('message').value.trim();
    const tel = '5516992421644';

    if (!name || !msg) {
      alert('Por favor, preencha nome e mensagem antes de enviar.');
      return;
    }

    const texto = `Olá, me chamo ${name}! 
    ${msg}`;

    const msgFormatada = encodeURIComponent(texto);

    const url = `https://wa.me/${tel}?text=${msgFormatada}`;

    window.open(url, '_blank');
  });
});
