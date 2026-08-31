/**
 * Bengal Press & Media World Ltd — Main Application Controller
 * Modeled after Transcom BD Luxury Corporate Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Scroll Detection
  const header = document.querySelector('.site-header');
  const handleHeaderScroll = () => {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileBackdrop = document.querySelector('.mobile-drawer-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMobileMenu = () => {
    if (!mobileToggle || !mobileDrawer) return;
    const isOpen = mobileDrawer.classList.contains('open');
    if (isOpen) {
      mobileDrawer.classList.remove('open');
      mobileBackdrop?.classList.remove('open');
      mobileToggle.classList.remove('open');
      document.body.style.overflow = '';
    } else {
      mobileDrawer.classList.add('open');
      mobileBackdrop?.classList.add('open');
      mobileToggle.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  mobileToggle?.addEventListener('click', toggleMobileMenu);
  mobileBackdrop?.addEventListener('click', toggleMobileMenu);
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer?.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });

  // 3. Smooth Scroll with Header Offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId.startsWith('#')) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.fade-in-up');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // 5. Numerical Counter Animation for Impact Metrics
  const counters = document.querySelectorAll('.counter-val');
  let countersTriggered = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const duration = 1800; // ms
      const startTime = performance.now();
      const isDecimal = String(target).includes('.');

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing: easeOutExpo
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = ease * target;

        if (isDecimal) {
          counter.textContent = currentVal.toFixed(1);
        } else {
          counter.textContent = Math.floor(currentVal).toLocaleString();
        }

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          if (isDecimal) {
            counter.textContent = target.toFixed(1);
          } else {
            counter.textContent = target.toLocaleString();
          }
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  const metricsSection = document.querySelector('.section-metrics');
  if (metricsSection && 'IntersectionObserver' in window) {
    const metricsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersTriggered) {
          countersTriggered = true;
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    metricsObserver.observe(metricsSection);
  }

  // 6. Publications & Media Divisions Tab Filtering
  const divisionTabs = document.querySelectorAll('.divisions-tabs .tab-btn');
  const divisionCards = document.querySelectorAll('.division-card');

  if (divisionTabs.length && divisionCards.length) {
    divisionTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        divisionTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');

        divisionCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(16px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // 7. Active Nav Link on Scroll Spy
  const navSections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-desktop .nav-link-item');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;
    navSections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 140;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });
});
