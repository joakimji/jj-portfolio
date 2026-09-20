(() => {
  'use strict';
  const images = Array.isArray(window.PORTFOLIO_IMAGES) ? window.PORTFOLIO_IMAGES : [];
  const gallery = document.getElementById('gallery');
  const dialog = document.querySelector('.lightbox');
  const largeImage = dialog.querySelector('.lightbox-image');
  const previousButton = dialog.querySelector('.previous-button');
  const nextButton = dialog.querySelector('.next-button');
  const closeButton = dialog.querySelector('.close-button');
  const pad = number => String(number).padStart(2, '0');
  let current = 0;
  let opener = null;
  let touchStart = null;

  document.querySelector('.nav-count').textContent = pad(images.length);
  document.querySelector('.collection-count').textContent = images.length ? `01 — ${pad(images.length)}` : 'Inga bilder ännu';
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('demo-note').hidden = !images.some(item => item.example);

  const showImage = index => {
    current = (index + images.length) % images.length;
    const item = images[current];
    largeImage.src = item.src;
    largeImage.alt = item.alt || item.title || '';
    dialog.querySelector('.lightbox-count').textContent = `${pad(current + 1)} / ${pad(images.length)}`;
    dialog.querySelector('.lightbox-caption h2').textContent = item.title || '';
    dialog.querySelector('.lightbox-caption > span').textContent = item.category || '';
    previousButton.disabled = nextButton.disabled = images.length < 2;
  };

  const openImage = (index, button) => {
    opener = button;
    showImage(index);
    dialog.showModal();
    document.body.classList.add('modal-open');
    closeButton.focus();
  };

  images.forEach((item, index) => {
    const figure = document.createElement('figure');
    figure.className = 'photo-card';
    const button = document.createElement('button');
    button.className = 'photo-button';
    button.type = 'button';
    button.setAttribute('aria-label', `Visa ${item.title || 'bild ' + (index + 1)} i större format`);
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt || item.title || '';
    img.loading = index === 0 ? 'eager' : 'lazy';
    img.decoding = 'async';
    if (index === 0) img.setAttribute('fetchpriority', 'high');
    const expand = document.createElement('span');
    expand.className = 'image-open';
    expand.setAttribute('aria-hidden', 'true');
    expand.textContent = '↗';
    button.append(img, expand);
    button.addEventListener('click', () => openImage(index, button));
    const caption = document.createElement('figcaption');
    caption.className = 'photo-caption';
    const name = document.createElement('div');
    name.className = 'photo-name';
    const number = document.createElement('span');
    number.className = 'photo-number';
    number.textContent = pad(index + 1);
    const title = document.createElement('h2');
    title.className = 'photo-title';
    title.textContent = item.title || `Bild ${index + 1}`;
    const category = document.createElement('span');
    category.className = 'photo-category';
    category.textContent = item.category || '';
    name.append(number, title);
    caption.append(name, category);
    figure.append(button, caption);
    gallery.append(figure);
  });

  if (!images.length) {
    const empty = document.createElement('p');
    empty.textContent = 'Här kommer snart nya bilder.';
    gallery.append(empty);
  }

  closeButton.addEventListener('click', () => dialog.close());
  previousButton.addEventListener('click', () => showImage(current - 1));
  nextButton.addEventListener('click', () => showImage(current + 1));
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    opener?.focus({ preventScroll: true });
  });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showImage(current + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog || event.target.classList.contains('lightbox-stage')) dialog.close();
  });
  largeImage.addEventListener('touchstart', event => {
    touchStart = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
  }, { passive: true });
  largeImage.addEventListener('touchend', event => {
    if (!touchStart || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) showImage(current + (dx < 0 ? 1 : -1));
    touchStart = null;
  }, { passive: true });
})();
