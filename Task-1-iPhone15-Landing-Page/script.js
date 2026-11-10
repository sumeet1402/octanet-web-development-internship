const variants = {
  natural: {
    name: 'Natural Titanium',
    tagline: 'Titanium. So strong. So light. So Pro.',
    description: 'A beautiful, aerospace-grade titanium design. A camera system made for the moments you never want to miss. Power that changes what’s possible.',
    image: 'images/iPhone 15 Pro Natural Titanium.png',
    alt: 'iPhone 15 Pro in Natural Titanium',
    number: '01',
    theme: 'natural'
  },
  blue: {
    name: 'Blue Titanium',
    tagline: 'A deeper shade of extraordinary.',
    description: 'A refined blue titanium finish with a cool, quiet confidence. Built for brilliant photos, bold ideas, and everything in between.',
    image: 'images/Blue Titanium Pro Phone.png',
    alt: 'iPhone 15 Pro in Blue Titanium',
    number: '02',
    theme: 'blue'
  },
  black: {
    name: 'Black Titanium',
    tagline: 'Power. In its purest form.',
    description: 'A dark, precision-crafted titanium finish. Understated from every angle, uncompromising in every detail.',
    image: 'images/iPhone 15 Pro Black Titanium.png',
    alt: 'iPhone 15 Pro in Black Titanium',
    number: '03',
    theme: 'black'
  },
  white: {
    name: 'White Titanium',
    tagline: 'A touch of elegance.',
    description: 'A sleek, refined titanium finish with a subtle shimmer. Perfect for those who appreciate the finer details.',
    image: 'images/iPhone 15 Pro White Titanium.png',
    alt: 'iPhone 15 Pro in White Titanium',
    number: '04',
    theme: 'white'
  }
};

const hero = document.querySelector('#hero-phone');
const buttons = [...document.querySelectorAll('.swatch')];
let current = 'natural';


function selectVariant(key) {
  if (!variants[key] || key === current) return;

  const variant = variants[key];
  current = key;

  const copy = document.querySelector('.copy');

  // Start phone exit animation
  hero.classList.remove('phone-entering');
  hero.classList.add('changing');

  // Update selected colour button
  buttons.forEach(button => {
    const selected = button.dataset.variant === key;

    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });

  // Update background theme
  document.body.dataset.theme = variant.theme;

  // Update product text
  document.querySelector('#finish-name').textContent = variant.name;
  document.querySelector('#tagline').textContent = variant.tagline;
  document.querySelector('#description').textContent = variant.description;
  document.querySelector('#counter').textContent = variant.number;
  document.querySelector('#index-number').textContent = variant.number;

  // Load the new phone image first
  const next = new Image();

  next.onload = () => {
    hero.src = variant.image;
    hero.alt = variant.alt;

    // Start entrance animation
    requestAnimationFrame(() => {
      hero.classList.remove('changing');
      hero.classList.add('phone-entering');
      copy.classList.add('copy-updating');
    });

    // Clean up animation classes
    hero.addEventListener('animationend', () => {
      hero.classList.remove('phone-entering');
    }, { once: true });

    setTimeout(() => {
      copy.classList.remove('copy-updating');
    }, 600);
  };

  next.onerror = () => {
    hero.classList.remove('changing');
  };

  next.src = variant.image;
}

buttons.forEach(button => button.addEventListener('click', () => selectVariant(button.dataset.variant)));
