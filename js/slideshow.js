(() => {
  const hero = document.querySelector('.top-slideshow');
  if (!hero) return;

  const images = [...hero.querySelectorAll('.top-slideshow__slides img')];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const interval = 5000;
  let current = 0;
  let timer;

  // 読み込みに失敗した写真は飛ばし、表示できる写真だけで再生します。
  Promise.allSettled(images.map(image => image.decode())).then(results => {
    const slides = images.filter((image, index) => results[index].status === 'fulfilled');
    if (!slides.length) return;
    images.forEach(image => image.classList.remove('is-active'));
    slides[0].classList.add('is-active');
    if (slides.length < 2) return;

    const update = () => {
      clearInterval(timer);
      if (motion.matches || document.hidden) return;
      timer = setInterval(() => {
        if (motion.matches || document.hidden) return;
        slides[current].classList.remove('is-active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('is-active');
      }, interval);
    };

    motion.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    update();
  });
})();
