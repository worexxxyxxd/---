(() => {
  const grid = document.querySelector('#photo-gallery');
  const lightbox = document.querySelector('#photo-lightbox');
  if (!grid || !lightbox) return;
  const images = Array.from({ length: 37 }, (_, index) => `assets/gallery/${String(index + 1).padStart(2, '0')}.jpg`);
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
    photo.alt = `Работа с дагестанским камнем, фотография ${index + 1}`;
    photo.loading = 'lazy';
    photo.decoding = 'async';
    const number = document.createElement('span');
    number.className = 'photo-number';
    number.textContent = String(index + 1).padStart(2, '0');
    button.append(photo, number);
    button.addEventListener('click', () => open(index));
    grid.append(button);
  });
  function show(index) {
    current = (index + images.length) % images.length;
    image.src = images[current];
    image.alt = `Работа с дагестанским камнем, фотография ${current + 1}`;
    caption.textContent = `ФОТОГРАФИЯ ${String(current + 1).padStart(2, '0')} / ${images.length}`;
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