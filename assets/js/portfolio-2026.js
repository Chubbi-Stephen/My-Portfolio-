document.addEventListener('DOMContentLoaded', () => {
  // Reveal animations on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Custom Cursor (Only for non-touch devices)
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (!isTouchDevice) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    // Cursor scaling on hover
    const interactiveElements = document.querySelectorAll('a, button, .bento-item, .tool-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        cursor.style.backgroundColor = 'rgba(0, 242, 255, 0.1)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.backgroundColor = 'rgba(0, 242, 255, 0.3)';
      });
    });
  }

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Technical Insights/Terminal Effect for the 'Senior' layer
  const technicalData = [
    "// Optimizing V8 memory allocation for high-throughput fintech APIs...",
    "// Implementing edge-caching strategies for distributed PWA sync...",
    "// Architecting agentic AI workflows with dual-brain latency reduction...",
    "// Refactoring legacy systems into scalable micro-frontend architectures..."
  ];

  const terminalText = document.getElementById('terminal-sync');
  if (terminalText) {
    let index = 0;
    setInterval(() => {
      terminalText.style.opacity = '0';
      setTimeout(() => {
        terminalText.textContent = technicalData[index];
        terminalText.style.opacity = '1';
        index = (index + 1) % technicalData.length;
      }, 500);
    }, 4000);
  }
});

// Adding styles for custom cursor and terminal effect dynamically
const style = document.createElement('style');
style.textContent = `
  .custom-cursor {
    width: 20px;
    height: 20px;
    background: rgba(0, 242, 255, 0.3);
    border: 1px solid var(--accent-color);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease, background 0.2s ease;
    mix-blend-mode: difference;
    transform: translate(-50%, -50%);
  }
  
  #terminal-sync {
    font-family: 'Courier New', monospace;
    color: var(--accent-color);
    font-size: 0.9rem;
    transition: opacity 0.5s ease;
  }
`;
document.head.appendChild(style);
