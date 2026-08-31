/**
 * Bengal Press & Media World Ltd — Hero Cinematic Slider
 * Modeled after Transcom BD Luxury Slider with Dynamic Progress Bars
 */

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero-slide');
  const indicatorBars = document.querySelectorAll('.hero-indicator-bar');
  const currentNumEl = document.querySelector('.hero-counter .current-num');
  const prevBtn = document.querySelector('.hero-arrow-btn.prev');
  const nextBtn = document.querySelector('.hero-arrow-btn.next');
  const sliderSection = document.querySelector('.hero-slider-section');

  if (!slides.length) return;

  const totalSlides = slides.length;
  let currentIndex = 0;
  let slideDuration = 6500; // ms
  let progressStartTime = 0;
  let animationFrameId = null;
  let isPaused = false;
  let remainingTime = slideDuration;

  // Initialize
  function showSlide(index) {
    // Reset all slides
    slides.forEach((slide, idx) => {
      if (idx === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Update Indicators
    indicatorBars.forEach((bar, idx) => {
      const fill = bar.querySelector('.hero-indicator-fill');
      if (idx < index) {
        bar.classList.add('completed');
        if (fill) fill.style.width = '100%';
      } else if (idx === index) {
        bar.classList.remove('completed');
        if (fill) fill.style.width = '0%';
      } else {
        bar.classList.remove('completed');
        if (fill) fill.style.width = '0%';
      }
    });

    // Update Counter
    if (currentNumEl) {
      currentNumEl.textContent = String(index + 1).padStart(2, '0');
    }

    currentIndex = index;
    startProgressBar();
  }

  function startProgressBar() {
    cancelAnimationFrame(animationFrameId);
    progressStartTime = performance.now();

    function step(timestamp) {
      if (isPaused) {
        animationFrameId = requestAnimationFrame(step);
        return;
      }

      const elapsed = timestamp - progressStartTime;
      const percent = Math.min((elapsed / slideDuration) * 100, 100);

      const activeBar = indicatorBars[currentIndex];
      if (activeBar) {
        const fill = activeBar.querySelector('.hero-indicator-fill');
        if (fill) {
          fill.style.width = percent + '%';
        }
      }

      if (elapsed < slideDuration) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        nextSlide();
      }
    }

    animationFrameId = requestAnimationFrame(step);
  }

  function nextSlide() {
    let nextIndex = (currentIndex + 1) % totalSlides;
    showSlide(nextIndex);
  }

  function prevSlide() {
    let prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(prevIndex);
  }

  // Arrow controls
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
    });
  }

  // Click on indicators to jump
  indicatorBars.forEach((bar, idx) => {
    bar.addEventListener('click', () => {
      showSlide(idx);
    });
  });

  // Pause on hover
  if (sliderSection) {
    sliderSection.addEventListener('mouseenter', () => {
      isPaused = true;
    });
    sliderSection.addEventListener('mouseleave', () => {
      isPaused = false;
      progressStartTime = performance.now() - (parseFloat(indicatorBars[currentIndex]?.querySelector('.hero-indicator-fill')?.style.width || 0) / 100) * slideDuration;
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  if (sliderSection) {
    sliderSection.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderSection.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        nextSlide(); // swipe left
      } else {
        prevSlide(); // swipe right
      }
    }
  }

  // Initial display
  showSlide(0);
});
