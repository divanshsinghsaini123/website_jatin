// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
  // Add fade-in animation to sections
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });

  // Add slide animations to project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    if (index % 2 === 0) {
      card.classList.add('slide-in-left');
    } else {
      card.classList.add('slide-in-right');
    }
    observer.observe(card);
  });

  // Add slide animations to skill categories
  const skillCategories = document.querySelectorAll('.skills-category');
  skillCategories.forEach((category, index) => {
    if (index % 2 === 0) {
      category.classList.add('slide-in-left');
    } else {
      category.classList.add('slide-in-right');
    }
    observer.observe(category);
  });

  // Add fade-in animation to timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
    item.classList.add('fade-in');
    observer.observe(item);
  });
});

// Animate skill bars when they come into view
const skillBars = document.querySelectorAll('.skill-progress');
const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.getAttribute('data-width');
      entry.target.style.width = width;
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
  skillBarObserver.observe(bar);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      alert('Thank you for your message! I\'ll get back to you soon.');
      this.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Download resume function
function downloadResume() {
  // Create a simple resume PDF content (in a real scenario, you'd have an actual PDF file)
  const resumeContent = `
JATIN ARORA
Mechanical Engineering Student

CONTACT INFORMATION
Phone: +91-8307455623
Email: ja737864@gmail.com
LinkedIn: linkedin.com/in/jatin-arora
Location: Faridabad, Haryana, India

EDUCATION
B.Tech in Mechanical Engineering
JC Bose University of Science and Technology, YMCA Faridabad
CGPA: 6.313 (2022-2026)

Senior Secondary (CBSE)
APS, Kurukshetra
81% (2020)

Secondary (CBSE)
MASPS
74% (2018)

PROJECTS
Four Wheel Steering Mechanism
• Engineered a dual-mode 4WS system with counter-phase steering (5-12° rear wheel deflection)
• Achieved 20-21% tighter turning radius at low speeds
• Implemented in-phase steering for enhanced stability and crab-style lane changes
• Tools: Rack-and-pinion gears, Battery, Tie rod linkages, Remote

Turbocharger Design for FSAE Car
• Designed and modeled complete turbocharger assembly in SolidWorks
• Developed custom intake and exhaust manifolds optimized for flow
• Performed airflow calculations using AFR and BSFC analysis
• Tools: SolidWorks CAD, Airflow Analysis, AFR Calculations, BSFC Analysis

SKILLS
Software: SolidWorks, CATIA, MS Office
Technical: Production Planning, Machine Design, CNC Operations, Operation Research, Automotive Systems, Project Management, CAD Modeling, 3D Design

CERTIFICATIONS
• Project Management Certificate - Great Learning
• Sales Forecasting & Sales Management 2.0 - MTF Institute, Udemy

POSITIONS OF RESPONSIBILITY
• Internal Relations Team - NIRAMAYAM (The Yoga Club)
  `;
  
  // Create and download the resume as a text file
  const blob = new Blob([resumeContent], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Jatin_Arora_Resume.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
  const heroTitle = document.querySelector('.hero-title .gradient-text');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 150);
  }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll('.stat-item h3');
  
  counters.forEach(counter => {
    const target = parseInt(counter.textContent);
    const increment = target / 100;
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current) + '+';
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + '+';
      }
    };
    
    updateCounter();
  });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Add click effects to buttons
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    // Create ripple effect
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Console message
console.log(`
🚀 Welcome to Jatin Arora's Portfolio!
👨‍🔧 Mechanical Engineering Student
📧 Contact: ja737864@gmail.com
🔗 LinkedIn: linkedin.com/in/jatin-arora

Built with ❤️ using HTML, CSS & JavaScript
`);
