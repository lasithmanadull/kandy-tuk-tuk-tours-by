const menu = document.getElementById('nav-menu');
const toggle = document.getElementById('nav-toggle');
const close = document.getElementById('nav-close');

if (toggle) toggle.addEventListener('click', () => menu.classList.add('show-menu'));
if (close) close.addEventListener('click', () => menu.classList.remove('show-menu'));
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => menu.classList.remove('show-menu'));
});

// Reveal sections as they enter the screen.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Gallery lightbox.
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
document.querySelectorAll('.gallery__item img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});
function closeLightbox() {
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden', 'true');
}
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// Booking form opens WhatsApp with the visitor's details.
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
  bookingForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const tour = document.getElementById('tour').value;
    const date = document.getElementById('date').value || 'Flexible';
    const guests = document.getElementById('guests').value || 'Not specified';
    const message = document.getElementById('message').value.trim() || 'No additional message';
    const status = document.getElementById('form-status');
    if (!name) {
      status.textContent = 'Please enter your name before sending.';
      document.getElementById('name').focus();
      return;
    }
    const text = `Hello Munasingha! I would like to book a Kandy Tuk Tuk Tour.%0AName: ${encodeURIComponent(name)}%0ATour: ${encodeURIComponent(tour)}%0APreferred date: ${encodeURIComponent(date)}%0AGuests: ${encodeURIComponent(guests)}%0AMessage: ${encodeURIComponent(message)}`;
    // Replace this number with your own WhatsApp number in international format.
    window.open(`https://wa.me/94771234567?text=${text}`, '_blank', 'noopener');
    status.textContent = 'WhatsApp is opening with your booking request.';
  });
}

// Header shadow and active navigation link.
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 20);
});
