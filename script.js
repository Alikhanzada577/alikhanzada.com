document.addEventListener('DOMContentLoaded', function() {
  // Hamburger menu functionality
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
      hamburger.addEventListener('click', function() {
          this.classList.toggle('active');
          navMenu.classList.toggle('active');
          
          if (navMenu.classList.contains('active')) {
              document.body.style.overflow = 'hidden';
          } else {
              document.body.style.overflow = '';
          }
      });
      
      const navDropdown = document.querySelector('.nav-item.dropdown');

      document.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
          link.addEventListener('click', () => {
              hamburger.classList.remove('active');
              navMenu.classList.remove('active');
              if (navDropdown) navDropdown.classList.remove('active');
              document.body.style.overflow = '';
          });
      });

      const dropdownToggle = navDropdown?.querySelector('.dropdown-toggle');
      if (dropdownToggle) {
          dropdownToggle.addEventListener('click', (e) => {
              if (window.innerWidth <= 768) {
                  e.preventDefault();
                  navDropdown.classList.toggle('active');
              }
          });
      }

      document.querySelectorAll('.dropdown-item').forEach(link => {
          link.addEventListener('click', () => {
              hamburger.classList.remove('active');
              navMenu.classList.remove('active');
              if (navDropdown) navDropdown.classList.remove('active');
              document.body.style.overflow = '';
          });
      });
  }
  
  // Qualification tabs functionality
  const tabButtons = document.querySelectorAll('.qualification-button');
  tabButtons.forEach(button => {
      button.addEventListener('click', () => {
          // Remove active class from all buttons
          tabButtons.forEach(btn => btn.classList.remove('qualification-active'));
          
          // Add active class to clicked button
          button.classList.add('qualification-active');
          
          // Hide all sections
          document.querySelectorAll('.qualification-content-section').forEach(section => {
              section.style.display = 'none';
          });
          
          // Show corresponding section
          const targetId = button.getAttribute('data-target');
          document.querySelector(targetId).style.display = 'block';
      });
  });
  
  // Activate the experience tab by default
  if (tabButtons.length > 0) {
      const experienceTab = document.querySelector('.qualification-button[data-target="#experience"]');
      if (experienceTab) {
          experienceTab.click();
      }
  }

  // Experience — 2-column master/detail switcher
  const experienceCards = document.querySelectorAll('.experience-list .experience-card');
  const experiencePanels = document.querySelectorAll('.experience-detail-panel');

  function resetExpProjectAccordion(panel) {
      if (!panel) return;
      const items = panel.querySelectorAll('.exp-project-item');
      items.forEach((item, index) => {
          const trigger = item.querySelector('.exp-project-trigger');
          if (index === 0) {
              item.classList.add('is-open');
              if (trigger) trigger.setAttribute('aria-expanded', 'true');
          } else {
              item.classList.remove('is-open');
              if (trigger) trigger.setAttribute('aria-expanded', 'false');
          }
      });
  }

  function initExpProjectAccordions(container) {
      const accordions = container.querySelectorAll('.exp-project-accordion');
      accordions.forEach(accordion => {
          const items = accordion.querySelectorAll('.exp-project-item');
          items.forEach(item => {
              const trigger = item.querySelector('.exp-project-trigger');
              if (!trigger || trigger.dataset.bound) return;
              trigger.dataset.bound = 'true';

              trigger.addEventListener('click', () => {
                  const isOpen = item.classList.contains('is-open');
                  items.forEach(i => {
                      i.classList.remove('is-open');
                      const btn = i.querySelector('.exp-project-trigger');
                      if (btn) btn.setAttribute('aria-expanded', 'false');
                  });
                  if (!isOpen) {
                      item.classList.add('is-open');
                      trigger.setAttribute('aria-expanded', 'true');
                  }
              });
          });
      });
  }

  initExpProjectAccordions(document.getElementById('experience'));

  experienceCards.forEach(card => {
      const trigger = card.querySelector('.experience-card-trigger');
      if (!trigger) return;

      trigger.addEventListener('click', () => {
          const targetId = card.getAttribute('data-target');

          experienceCards.forEach(c => {
              c.classList.remove('is-active');
              const btn = c.querySelector('.experience-card-trigger');
              if (btn) btn.setAttribute('aria-selected', 'false');
          });

          experiencePanels.forEach(panel => panel.classList.remove('active'));

          card.classList.add('is-active');
          trigger.setAttribute('aria-selected', 'true');

          const targetPanel = document.getElementById(targetId);
          if (targetPanel) {
              targetPanel.classList.add('active');
              resetExpProjectAccordion(targetPanel);
              if (window.innerWidth <= 768) {
                  setTimeout(() => {
                      targetPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 150);
              }
          }
      });
  });
  
  // Typing animation
  const textArray = [
      "build scalable applications...", 
      "automate complex workflows...", 
      "debug like a ninja...",
      "write clean, efficient code...",
      "create seamless user experiences...",
      "optimize performance daily..."
  ];
  let index = 0;
  let charIndex = 0;
  const typingText = document.getElementById("typed-text");
  
  function type() {
      if (charIndex < textArray[index].length) {
          typingText.textContent += textArray[index].charAt(charIndex);
          charIndex++;
          setTimeout(type, 100);
      } else {
          setTimeout(erase, 2000);
      }
  }
  
  function erase() {
      if (charIndex > 0) {
          typingText.textContent = textArray[index].substring(0, charIndex - 1);
          charIndex--;
          setTimeout(erase, 50);
      } else {
          index = (index + 1) % textArray.length;
          setTimeout(type, 300);
      }
  }
  
  // Start typing animation
  if (typingText) {
      setTimeout(type, 500);
  }
  
  // Contact form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
      contactForm.addEventListener("submit", function(e) {
          e.preventDefault();
          
          const form = e.target;
          const formData = new FormData(form);
      
          fetch("https://script.google.com/macros/s/AKfycbxqC2_5YeYvH2jCWhVEc5pXCNymazRhtv1y8-1683T_AcDGKNTWz6vOy9j10JRL7rNT/exec", {
              method: "POST",
              body: formData
          })
          .then(res => res.text())
          .then(data => {
              alert("Message sent successfully!");
              form.reset();
          })
          .catch(err => {
              alert("Error sending message.");
              console.error(err);
          });
      });
  }
});