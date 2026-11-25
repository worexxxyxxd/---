(() => {
  const grid = document.querySelector('#photo-gallery');
  const lightbox = document.querySelector('#photo-lightbox');
  if (!grid || !lightbox) return;
  // Keep the gallery photo of the scaffolded facade in 36.jpg.
  const galleryImages = Array.from({ length: 36 }, (_, index) =>
    `assets/gallery/${String(index + 1).padStart(2, '0')}.jpg`);
  const projectImages = Array.from({ length: 20 }, (_, index) =>
    `assets/gallery-extra/${String(index + 1).padStart(2, '0')}.webp`)
    .filter(src => src !== 'assets/gallery-extra/10.webp');
  const images = [...galleryImages, ...projectImages];
  const galleryCount = galleryImages.length;
  function describePhoto(index) {
    return index < galleryCount
      ? `Работа с дагестанским камнем, фотография ${index + 1}`
      : `Фото проекта ${index - galleryCount + 1}`;
  }
  const image = lightbox.querySelector('img');
  const caption = lightbox.querySelector('figcaption');
  let current = 0;
  images.forEach((src, index) => {
    const button = document.createElement('button');
    button.className = 'photo-card';
    button.type = 'button';
    button.setAttribute('aria-label', `Открыть фотографию ${index + 1}`);
    const photo = document.createElement('img');
    photo.src = src;
    photo.alt = describePhoto(index);
    photo.loading = 'lazy';
    photo.decoding = 'async';
    button.append(photo);

    button.addEventListener('click', () => open(index));
    grid.append(button);
  });
  function show(index) {
    current = (index + images.length) % images.length;
    image.src = images[current];
    image.alt = describePhoto(current);
    const isGalleryPhoto = current < galleryCount;
    const number = isGalleryPhoto ? current + 1 : current - galleryCount + 1;
    const total = isGalleryPhoto ? galleryCount : projectImages.length;
    const label = isGalleryPhoto ? 'ФОТОГРАФИЯ' : 'ПОРТФОЛИО · ФОТО';
    caption.textContent = `${label} ${String(number).padStart(2, '0')} / ${total}`;
  }
  function open(index) {
    show(index);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    lightbox.querySelector('.lightbox-close').focus();
  }
  function close() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
  }
  lightbox.querySelector('.lightbox-close').addEventListener('click', close);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => show(current - 1));
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => show(current + 1));
  lightbox.addEventListener('click', event => { if (event.target === lightbox) close(); });
  document.addEventListener('keydown', event => {
    if (!lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });
})();
