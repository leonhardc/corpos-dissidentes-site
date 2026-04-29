const currentYear = document.querySelector('#current-year');
const photoTriggers = document.querySelectorAll('.photo-trigger');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxCaption = document.querySelector('#lightbox-caption');
const lightboxClose = document.querySelector('#lightbox-close');
const lightboxBackdrop = document.querySelector('.lightbox-backdrop');
const lightboxPrev = document.querySelector('#lightbox-prev');
const lightboxNext = document.querySelector('#lightbox-next');

let currentLightboxIndex = -1;

function closeLightbox() {
  if (!lightbox || !lightboxImage || !lightboxCaption) {
    return;
  }

  currentLightboxIndex = -1;
  lightbox.hidden = true;
  lightboxImage.src = '';
  lightboxImage.alt = '';
  lightboxCaption.textContent = '';
  document.body.style.overflow = '';
}

function renderLightbox(index) {
  if (!lightbox || !lightboxImage || !lightboxCaption) {
    return;
  }

  const trigger = photoTriggers[index];

  if (!trigger) {
    return;
  }

  lightboxImage.src = trigger.dataset.lightboxSrc || '';
  lightboxImage.alt = trigger.dataset.lightboxAlt || '';
  lightboxCaption.textContent = trigger.dataset.lightboxCaption || '';
  currentLightboxIndex = index;
}

function openLightbox(trigger) {
  const triggerIndex = Array.from(photoTriggers).indexOf(trigger);

  if (triggerIndex === -1 || !lightbox) {
    return;
  }

  renderLightbox(triggerIndex);
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
}

function navigateLightbox(direction) {
  if (!photoTriggers.length || currentLightboxIndex === -1) {
    return;
  }

  const nextIndex = (currentLightboxIndex + direction + photoTriggers.length) % photoTriggers.length;
  renderLightbox(nextIndex);
}

photoTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    openLightbox(trigger);
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxBackdrop) {
  lightboxBackdrop.addEventListener('click', closeLightbox);
}

if (lightboxPrev) {
  lightboxPrev.addEventListener('click', () => {
    navigateLightbox(-1);
  });
}

if (lightboxNext) {
  lightboxNext.addEventListener('click', () => {
    navigateLightbox(1);
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox && !lightbox.hidden) {
    closeLightbox();
  }

  if (event.key === 'ArrowLeft' && lightbox && !lightbox.hidden) {
    navigateLightbox(-1);
  }

  if (event.key === 'ArrowRight' && lightbox && !lightbox.hidden) {
    navigateLightbox(1);
  }
});

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
