document.querySelectorAll('.slider').forEach(slider => {
    const slides = slider.querySelector('.slides');
    const slide = slider.querySelectorAll('.slide');
    const prevButton = slider.querySelector('.control.prev');
    const nextButton = slider.querySelector('.control.next');
    const indicators = slider.querySelector('.indicators');

    let currentIndex = 0;

    // Create indicators
    slide.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.classList.add('indicator');
      if (index === 0) indicator.classList.add('active');
      indicator.dataset.index = index;
      indicators.appendChild(indicator);
    });

    const updateIndicators = () => {
      indicators.querySelectorAll('.indicator').forEach(ind => {
        ind.classList.remove('active');
      });
      indicators.querySelector(`.indicator[data-index='${currentIndex}']`).classList.add('active');
    };

    const showSlide = (index) => {
      if (index < 0) currentIndex = slide.length - 1;
      else if (index >= slide.length) currentIndex = 0;
      else currentIndex = index;

      slides.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateIndicators();
    };

    prevButton.addEventListener('click', () => showSlide(currentIndex - 1));
    nextButton.addEventListener('click', () => showSlide(currentIndex + 1));

    indicators.querySelectorAll('.indicator').forEach(indicator => {
      indicator.addEventListener('click', (e) => {
        showSlide(parseInt(e.target.dataset.index));
      });
    });

    // Touch support
    let startX = 0;
    let isDragging = false;

    slides.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    slides.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const diff = startX - currentX;

      if (diff > 50) {
        showSlide(currentIndex + 1);
        isDragging = false;
      } else if (diff < -50) {
        showSlide(currentIndex - 1);
        isDragging = false;
      }
    });

    slides.addEventListener('touchend', () => {
      isDragging = false;
    });

    // Optional: Auto-play
    // setInterval(() => showSlide(currentIndex + 1), 5000);
  });