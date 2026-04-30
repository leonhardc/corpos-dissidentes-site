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

/**
 * Artist Bio Modal Logic
 */
const artistModal = document.querySelector('#artist-modal');
const artistTriggers = document.querySelectorAll('.artist-modal-trigger');
const modalArtistName = document.querySelector('#modal-artist-name');
const modalArtistPhoto = document.querySelector('#modal-artist-photo');
const modalArtistBio = document.querySelector('#modal-artist-bio');
const modalArtistInstagram = document.querySelector('#modal-artist-instagram');
const modalArtistSpotify = document.querySelector('#modal-artist-spotify');
const modalArtistYoutube = document.querySelector('#modal-artist-youtube');
const modalClose = document.querySelector('#modal-close');
const modalPrev = document.querySelector('#modal-prev');
const modalNext = document.querySelector('#modal-next');
const modalBackdrop = artistModal?.querySelector('.lightbox-backdrop');

let currentArtistIndex = -1;

function closeArtistModal() {
  if (!artistModal) return;
  artistModal.hidden = true;
  document.body.style.overflow = '';
  currentArtistIndex = -1;
}

function renderArtistModal(index) {
  const trigger = artistTriggers[index];
  if (!trigger) return;

  modalArtistName.textContent = trigger.dataset.artistName;
  modalArtistPhoto.src = trigger.dataset.artistPhoto;
  modalArtistPhoto.alt = trigger.dataset.artistName;
  modalArtistBio.textContent = trigger.dataset.artistBio;
  modalArtistInstagram.href = trigger.dataset.artistInstagram;

  if (trigger.dataset.artistSpotify) {
    modalArtistSpotify.href = trigger.dataset.artistSpotify;
    modalArtistSpotify.style.display = 'flex';
  } else {
    modalArtistSpotify.style.display = 'none';
  }

  if (trigger.dataset.artistYoutube) {
    modalArtistYoutube.href = trigger.dataset.artistYoutube;
    modalArtistYoutube.style.display = 'flex';
  } else {
    modalArtistYoutube.style.display = 'none';
  }
  
  currentArtistIndex = index;
}

function openArtistModal(index) {
  if (!artistModal || index === -1) return;
  renderArtistModal(index);
  artistModal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function navigateArtistModal(direction) {
  if (!artistTriggers.length || currentArtistIndex === -1) return;
  const nextIndex = (currentArtistIndex + direction + artistTriggers.length) % artistTriggers.length;
  renderArtistModal(nextIndex);
}

artistTriggers.forEach((trigger, index) => {
  trigger.addEventListener('click', () => {
    openArtistModal(index);
  });
});

modalClose?.addEventListener('click', closeArtistModal);
modalBackdrop?.addEventListener('click', closeArtistModal);
modalPrev?.addEventListener('click', () => navigateArtistModal(-1));
modalNext?.addEventListener('click', () => navigateArtistModal(1));

// Keyboard support for Artist Modal
document.addEventListener('keydown', (event) => {
  if (artistModal && !artistModal.hidden) {
    if (event.key === 'Escape') closeArtistModal();
    if (event.key === 'ArrowLeft') navigateArtistModal(-1);
    if (event.key === 'ArrowRight') navigateArtistModal(1);
  }
});
