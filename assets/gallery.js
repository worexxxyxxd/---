(() => {
  const grid = document.querySelector('#photo-gallery');
  const lightbox = document.querySelector('#photo-lightbox');
  if (!grid || !lightbox) return;
  const images = [...Array.from({ length: 37 }, (_, index) => `assets/gallery/${String(index + 1).padStart(2, '0')}.jpg`), ...Array.from({ length: 20 }, (_, index) => `assets/gallery-extra/${String(index + 1).padStart(2, '0')}.webp`)];
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
    photo.alt = index < 37 ? `Работа с дагестанским камнем, фотография ${index + 1}` : `Фото проекта ${index - 36}`;
    photo.loading = 'lazy';
    photo.decoding = 'async';
    button.append(photo);

    button.addEventListener('click', () => open(index));
    grid.append(button);
  });
  function show(index) {
    current = (index + images.length) % images.length;
    image.src = images[current];
    image.alt = current < 37 ? `Работа с дагестанским камнем, фотография ${current + 1}` : `Фото проекта ${current - 36}`;
    caption.textContent = current < 37 ? `ФОТОГРАФИЯ ${String(current + 1).padStart(2, '0')} / 37` : `ПОРТФОЛИО · ФОТО ${String(current - 36).padStart(2, '0')} / 20`;
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
