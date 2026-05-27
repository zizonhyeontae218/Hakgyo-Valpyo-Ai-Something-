const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

prevBtn.addEventListener('click', () => {
  window.presenterAPI.prev();
});

nextBtn.addEventListener('click', () => {
  window.presenterAPI.next();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    window.presenterAPI.prev();
  } else if (event.key === 'ArrowRight') {
    window.presenterAPI.next();
  }
});
