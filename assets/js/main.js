// ==================== Animated Footer Reveal ====================
document.addEventListener('DOMContentLoaded', function () {
  const footer = document.querySelector('.footer');
  if (!footer) return;
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        footer.classList.add('footer--visible');
        observer.disconnect();
      }
    },
    { threshold: 0.2 }
  );
  observer.observe(footer);

  // Animate footer links and socials
  const links = footer.querySelectorAll('.footer__link, .footer__social');
  links.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.7s cubic-bezier(.77,0,.18,1), transform 0.7s cubic-bezier(.77,0,.18,1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 400 + i * 120);
  });
});
/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification__active");
    });
    target.classList.add("qualification__active");

    tabs.forEach((tab) => {
      tab.classList.remove("qualification__active");
    });
    tab.classList.add("qualification__active");

    // Trigger animations for the newly active content
    setTimeout(() => {
      const fadeInItems = target.querySelectorAll('.fade-in-item');
      fadeInItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.animation = `fadeInUp 0.8s ease ${index * 0.2}s forwards`;
        }, 100);
      });
    }, 100);
  });
});

/*==================== SERVICES MODAL ====================*/

const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
  document.body.classList.add("disable-scroll");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
      document.body.classList.remove("disable-scroll");
    });
  });
});

/*==================== PORTFOLIO SWIPER ====================*/

let swiper = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/

const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

//validate if user previously chose a theme
if (selectedTheme) {
  // if theme selected by user previously then we add/remove classes again based on localStorage
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}
//if initially there is no local storage ie. user has not made a choice and this is first time loading
//then we check if browser/OS is in dark mode and then add dark theme if required by default
else if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  console.log("found dark mode for browser/OS");
  // add dark theme by setting dark theme flags in localStorage
  localStorage.setItem("selected-theme", "dark");
  localStorage.setItem("selected-icon", "uil-moon");
  // add classes for dark theme in DOM
  document.body.classList.add(darkTheme);
  themeButton.classList.add(iconTheme);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*==================== TYPING ANIMATION ====================*/
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Add typing-complete class when animation is done
      element.classList.add('typing-complete');
    }
  }
  type();
}

// Initialize typing animation when page loads
window.addEventListener('load', function() {
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const nameText = 'Christian Jay Mandani';
    
    setTimeout(() => {
      typeWriter(typingElement, nameText, 80);
    }, 500);
  }
});

/*==================== SMOOTH REVEAL ANIMATIONS ====================*/
function revealOnScroll() {
  const reveals = document.querySelectorAll('.skills__container-box, .portfolio__content, .about__data');

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('animate-reveal');
    }
  }
}

window.addEventListener('scroll', revealOnScroll);

/*==================== ENHANCED QUALIFICATION ANIMATIONS ====================*/
// Enhanced tab switching with smooth animations
const qualificationTabs = document.querySelectorAll("[data-target]");
const qualificationContents = document.querySelectorAll("[data-content]");

qualificationTabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    e.preventDefault();
    
    // Remove active classes with animation
    qualificationContents.forEach((content) => {
      if (content.classList.contains("qualification__active")) {
        content.style.opacity = "0";
        content.style.transform = "translateY(20px)";
        
        setTimeout(() => {
          content.classList.remove("qualification__active");
        }, 150);
      }
    });

    qualificationTabs.forEach((t) => {
      t.classList.remove("qualification__active");
    });

    // Add active classes with animation
    const target = document.querySelector(tab.dataset.target);
    tab.classList.add("qualification__active");
    
    setTimeout(() => {
      target.classList.add("qualification__active");
      target.style.opacity = "1";
      target.style.transform = "translateY(0)";
    }, 200);
  });
});

// Animate qualification items on scroll
function animateQualificationItems() {
  const qualificationItems = document.querySelectorAll('.qualification__data');
  
  qualificationItems.forEach((item, index) => {
    const itemTop = item.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (itemTop < windowHeight - 100) {
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, index * 200);
    }
  });
}

// Initialize qualification animations
window.addEventListener('load', () => {
  // Set initial styles for animation
  const qualificationItems = document.querySelectorAll('.qualification__data');
  qualificationItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease';
  });
  
  // Trigger initial animation
  setTimeout(() => {
    animateQualificationItems();
  }, 500);
});

// Add scroll listener for qualification animations
window.addEventListener('scroll', animateQualificationItems);

// Add interactive hover effects for qualification timeline
document.addEventListener('DOMContentLoaded', () => {
  const qualificationRounders = document.querySelectorAll('.qualification__rounder');
  
  qualificationRounders.forEach(rounder => {
    rounder.addEventListener('mouseenter', () => {
      rounder.style.transform = 'scale(1.3)';
      rounder.style.transition = 'transform 0.3s ease';
    });
    
    rounder.addEventListener('mouseleave', () => {
      rounder.style.transform = 'scale(1)';
    });
  });
  
  // Add click effect to qualification badges
  const qualificationBadges = document.querySelectorAll('.qualification__badge');
  
  qualificationBadges.forEach(badge => {
    badge.addEventListener('click', () => {
      badge.style.transform = 'scale(0.95)';
      badge.style.transition = 'transform 0.1s ease';
      
      setTimeout(() => {
        badge.style.transform = 'scale(1)';
      }, 100);
    });
  });
});

// Add smooth scroll to certification links
document.querySelectorAll('.qualification__subtitle a[href^="#"]').forEach(anchor => {
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

/*==================== ABOUT SECTION ANIMATIONS ====================*/

// Counter Animation for Home Stats
function animateCounter(element, target, duration = 1800, suffix = '+') {
  let start = 0;
  const increment = target / (duration / 16);
  const isInt = Number.isInteger(target);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    element.textContent = (isInt ? Math.floor(start) : start.toFixed(1)) + suffix;
  }, 16);
}

let homeStatsAnimated = false;
function initHomeStatsCounters() {
  if (homeStatsAnimated) return;
  const statsSection = document.querySelector('.home__stats');
  if (!statsSection) return;
  const rect = statsSection.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  if (rect.top < windowHeight - 80) {
    homeStatsAnimated = true;
    document.querySelectorAll('.home__stat-number').forEach(el => {
      const target = parseInt(el.getAttribute('data-target'));
      animateCounter(el, target);
    });
  }
}

window.addEventListener('scroll', initHomeStatsCounters);
window.addEventListener('load', initHomeStatsCounters);

// Enhanced scroll animations for about section elements
function animateAboutElements() {
  const aboutElements = document.querySelectorAll(
    '.about__info-card, .about__timeline-item'
  );
  
  aboutElements.forEach((element, index) => {
    const elementTop = element.offsetTop;
    const elementHeight = element.offsetHeight;
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    if (scrollTop > elementTop - windowHeight + 100) {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.style.transition = 'all 0.6s ease';
      }, index * 150);
    }
  });
}

// Initialize about elements with initial hidden state
document.addEventListener('DOMContentLoaded', () => {
  const aboutElements = document.querySelectorAll(
    '.about__info-card, .about__timeline-item'
  );
  
  aboutElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
  });
  
  // Add hover effects for info cards
  const infoCards = document.querySelectorAll('.about__info-card');
  infoCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Add floating animation delay variance
  const floatingItems = document.querySelectorAll('.about__floating-item');
  floatingItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.5}s`;
  });
});

// Add scroll listeners for about animations
window.addEventListener('scroll', () => {
  initCounters();
  animateAboutElements();
});

// Initial check in case section is already visible
window.addEventListener('load', () => {
  initCounters();
  animateAboutElements();
});
