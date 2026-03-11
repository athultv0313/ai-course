/* =====================================================
   LearnAI — main.js
   Sticky navbar · Hamburger · Scroll fade-in · Toast
===================================================== */

// ─── Navbar scroll effect ───────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ─── Hamburger / mobile menu ────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

// ─── Scroll fade-in (IntersectionObserver) ──────────
const fadeEls = document.querySelectorAll('.fade-in');
if (fadeEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger animations for grid children
        const delay = (entry.target.dataset.delay || 0);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  // Add stagger delays to grid children
  document.querySelectorAll('.overview-grid .fade-in, .learn-grid .fade-in').forEach((el, i) => {
    el.dataset.delay = i * 80;
  });

  fadeEls.forEach(el => observer.observe(el));
}

// ─── Active nav link highlighting (index page) ──────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

if (sections.length && navLinks.length) {
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

// ─── Contact form ────────────────────────────────────
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

if (contactForm && toast) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('c-name')?.value || '';
    const email = document.getElementById('c-email')?.value || '';
    const msg = document.getElementById('c-msg')?.value || '';

    // Log to console (replace with EmailJS or backend in production)
    console.log('Contact form submitted:', { name, email, msg });

    // Show toast
    toast.textContent = `✅ Thanks ${name.split(' ')[0]}! We'll reply to ${email} soon.`;
    toast.classList.add('show');
    contactForm.reset();

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  });
}

// ─── Smooth scroll for anchor links ────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── Progress bar animation on load ────────────────
window.addEventListener('load', () => {
  document.querySelectorAll('.progress-fill').forEach(bar => {
    const targetWidth = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.transition = 'width 1.5s cubic-bezier(0.4,0,0.2,1)';
      bar.style.width = targetWidth;
    }, 600);
  });
});
