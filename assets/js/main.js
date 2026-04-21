// Certificate Modal Functions
let currentCertificateImage = '';

function openCertificateModal(imageSrc, title) {
  const modal = document.getElementById('certificateModal');
  if (!modal) return;
  
  const modalTitle = document.getElementById('certificateModalTitle');
  const certificateImage = document.getElementById('certificateImage');
  
  currentCertificateImage = imageSrc;
  modalTitle.textContent = title;
  certificateImage.src = imageSrc;
  certificateImage.alt = title;
  
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}

function closeCertificateModal() {
  const modal = document.getElementById('certificateModal');
  if (!modal) return;
  
  modal.classList.remove('show');
  
  setTimeout(() => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }, 300);
}

function downloadCertificate() {
  const link = document.createElement('a');
  link.href = currentCertificateImage;
  link.download = currentCertificateImage;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (themeToggle) {
  const themeIcon = themeToggle.querySelector('i');
  
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
  
  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.className = 'fas fa-sun';
    } else {
      themeIcon.className = 'fas fa-moon';
    }
  }
}

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
  mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
  });
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
    });
  });
}

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = e.target;
    
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        alert("Thank you for your message! I'll get back to you soon.");
        form.reset();
      } else {
        alert("Oops! There was a problem submitting your message. Please try again.");
      }
    }).catch(error => {
      alert("Oops! There was a problem submitting your message. Please try again.");
    });
  });
}

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Observe all elements that need animation
document.querySelectorAll('.timeline-item, .skill-category, .project-card, .certificate-card').forEach(el => {
  observer.observe(el);
});

// Modal Close on Outside Click
window.addEventListener('click', function(event) {
  const modal = document.getElementById('certificateModal');
  if (modal && event.target === modal) {
    closeCertificateModal();
  }
});

// Modal Close on Escape Key
window.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const modal = document.getElementById('certificateModal');
    if (modal && modal.style.display === 'flex') {
      closeCertificateModal();
    }
  }
});

// Smooth Scroll for Anchor Links (if any remain on pages)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Active Navigation Highlight
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinksElements = document.querySelectorAll('.nav-links a');
  
  navLinksElements.forEach(link => {
    link.classList.remove('active');
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Call on page load
setActiveNavLink();

// Scroll to Top on Page Load
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});