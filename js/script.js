/**
 * ══════════════════════════════════════════════════════════════════
 * FAADHIL DIGITAL — CORE ENGINE JS (PREMIUM ARCHITECTURE)
 * Features: Apple Scroll Engine, Reactive Counters, PWA Intercept,
 * Multi-Language Matrix, Accordion Fluidity, & Theme Switcher.
 * ══════════════════════════════════════════════════════════════════
 */

document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initNavbar();
  initTheme();
  initCursorGlow();
  initScrollReveal();
  initCounters();
  initBackToTop();
  initMobileMenu();
  initLanguageToggle();
  initAccordion();
  initPortfolioFilter();
  initBlogSearch();
  initContactForm();
  initPWA();

  // Inisialisasi Modul Khusus Halaman Blog (Jika diperlukan tambahan masa depan)
  if (document.getElementById('blogGrid') || document.getElementById('blogSearch')) {
    initBlogPageEngine();
  }
});

/* ─── EXTRA UTILITY: TOAST DISPATCHER ─── */
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

/* ─── PREMIUM LOADER CONTROL (WITH AUTOMATIC SAFETY) ─── */
function initLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;

  // Skenario 1: Hilangkan loader setelah seluruh halaman selesai dimuat sempurna
  window.addEventListener("load", () => {
    loader.classList.add("fade-out");
    setTimeout(() => {
      loader.style.display = "none";
    }, 600);
  });

  // Skenario 2 (Safety Guard): Paksa tutup dalam 3 detik agar layar tidak blank hitam jika ada aset macet
  setTimeout(() => {
    if (!loader.classList.contains("fade-out")) {
      loader.classList.add("fade-out");
      setTimeout(() => {
        loader.style.display = "none";
      }, 600);
    }
  }, 3000);
}

/* ─── NAVBAR SCROLL MECHANISM ─── */
function initNavbar() {
  const nav = document.querySelector(".navbar");
  if (!nav) return;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
}

/* ─── THEME ENGINE (DARK / LIGHT MODE MATRIX) ─── */
function initTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const htmlElement = document.documentElement;
  const themeIcon = document.getElementById("themeIcon") || themeToggle;
  
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem("theme") || "dark";
  htmlElement.setAttribute("data-theme", savedTheme);
  if (themeIcon) themeIcon.textContent = savedTheme === "dark" ? "🌙" : "☀️";

  themeToggle.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    htmlElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    if (themeIcon) themeIcon.textContent = newTheme === "dark" ? "🌙" : "☀️";
  });
}

/* ─── CURSOR GLOW INTERACTION ─── */
function initCursorGlow() {
  const glow = document.getElementById("cursorGlow");
  if (!glow) return;
  window.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}

/* ─── APPLE SCROLL REVEAL ENGINE ─── */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal, .sr");
  if (!reveals.length) return;

  const checkReveal = () => {
    const triggerBottom = window.innerHeight * 0.85;
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < triggerBottom) {
        el.classList.add("active");
        el.classList.add("visible"); // Dukungan fallback skrip .sr blog lama
      }
    });
  };

  window.addEventListener("scroll", checkReveal);
  checkReveal();
}

/* ─── REACTIVE COUNTERS INTERACTION ─── */
function initCounters() {
  const counters = document.querySelectorAll(".counter-value");
  if (!counters.length) return;

  const startCounter = (el) => {
    const target = parseInt(el.getAttribute("data-target")) || 0;
    if (target === 0) {
      el.textContent = 0;
      return;
    }

    let current = 0;
    const duration = 2000;
    const stepTime = Math.max(Math.floor(duration / target), 15);
    
    const timer = setInterval(() => {
      current += Math.ceil(target / 50);
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = current;
      }
    }, stepTime);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ─── BACK TO TOP CONTROL ─── */
function initBackToTop() {
  const btn = document.getElementById("backToTop") || document.getElementById("backTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ─── MOBILE MENU TOGGLE ─── */
function initMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!menuToggle || !mobileMenu) return;

  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", !isExpanded);
    mobileMenu.setAttribute("aria-hidden", isExpanded);
    
    menuToggle.classList.toggle("active");
    mobileMenu.classList.toggle("open");
  });

  const links = mobileMenu.querySelectorAll("a");
  links.forEach(l => {
    l.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      mobileMenu.setAttribute("aria-hidden", "true");
      menuToggle.classList.remove("active");
      mobileMenu.classList.remove("open");
    });
  });
}

/* ─── MULTI-LANGUAGE DICTIONARY MATRIX ─── */
const dictionary = {
  id: {
    "toast-form": "Pesan Anda berhasil terkirim!",
    "no-results": "Artikel tidak ditemukan..."
  },
  en: {
    "toast-form": "Your project message has been sent successfully!",
    "no-results": "No articles match your search..."
  }
};

function initLanguageToggle() {
  const langToggle = document.getElementById("langToggle");
  if (!langToggle) return;

  if (!localStorage.getItem("preferred-lang")) {
    localStorage.setItem("preferred-lang", "id");
  }

  langToggle.addEventListener("click", () => {
    const current = localStorage.getItem("preferred-lang");
    const nextLang = current === "id" ? "en" : "id";
    localStorage.setItem("preferred-lang", nextLang);
    langToggle.textContent = nextLang.toUpperCase();
    showToast(`Language switched to: ${nextLang.toUpperCase()}`);
  });
}

/* ─── ACCORDION FLUIDITY ─── */
function initAccordion() {
  const faqHeaders = document.querySelectorAll(".faq-header");
  const faqCards = document.querySelectorAll(".faq-card");

  if (faqCards.length && faqCards[0].tagName === "DETAILS") {
    faqCards.forEach(card => {
      card.addEventListener("toggle", () => {
        const icon = card.querySelector(".faq-icon");
        if (card.open) {
          card.style.borderColor = "var(--brand-primary)";
          if (icon) icon.style.transform = "rotate(45deg)";
        } else {
          card.style.borderColor = "var(--border-light)";
          if (icon) icon.style.transform = "rotate(0deg)";
        }
      });
    });
    return;
  }

  faqHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const content = item.querySelector(".faq-content");
      const isExpanded = header.getAttribute("aria-expanded") === "true";

      header.setAttribute("aria-expanded", !isExpanded);
      item.classList.toggle("active");

      if (item.classList.contains("active") && content) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else if (content) {
        content.style.maxHeight = null;
      }
    });
  });
}

/* ─── INTERACTIVE PORTFOLIO FILTER ─── */
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  if (!filterButtons.length || !portfolioItems.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const targetFilter = btn.getAttribute("data-filter");

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute("data-category");
        if (targetFilter === "all" || itemCategory === targetFilter) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 10);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.95)";
          setTimeout(() => { item.style.display = "none"; }, 250);
        }
      });
    });
  });
}

/* ─── LIVE SEARCH BLOG ENGINE ─── */
function initBlogSearch() {
  const searchInput = document.getElementById("blogSearchInput");
  const blogContainer = document.getElementById("blogItemsContainer");
  const noResultsAlert = document.getElementById("noBlogResults");
  
  if (!searchInput || !blogContainer) return;

  const blogCards = blogContainer.getElementsByClassName("blog-post-card");

  searchInput.addEventListener("input", (e) => {
    const filterValue = e.target.value.toLowerCase().trim();
    let hasResult = false;

    Array.from(blogCards).forEach(card => {
      const titleData = card.getAttribute("data-title") || "";
      if (titleData.toLowerCase().includes(filterValue)) {
        card.style.display = "";
        hasResult = true;
      } else {
        card.style.display = "none";
      }
    });

    if (noResultsAlert) {
      const currentLang = localStorage.getItem("preferred-lang") || "id";
      noResultsAlert.textContent = dictionary[currentLang]["no-results"];
      noResultsAlert.style.display = hasResult ? "none" : "block";
    }
  });
}

/* ─── PREMIUM CONTACT FORM SYSTEM ─── */
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("formName")?.value;
    const email = document.getElementById("formEmail")?.value;
    const message = document.getElementById("formMessage")?.value;
    
    if (!name || !email || !message) {
      showToast("Harap isi semua field formulir!");
      return;
    }

    const submitBtn = contactForm.querySelector("button[type='submit']");
    if (submitBtn) {
      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = "<span>Sending Project...</span>";

      setTimeout(() => {
        const currentLang = localStorage.getItem("preferred-lang") || "id";
        showToast(dictionary[currentLang]["toast-form"]);
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1500);
    }
  });
}

/* ─── PWA DISPATCH LAYER ─── */
function initPWA() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js")
        .then(reg => console.log("Faadhil Digital PWA Active:", reg.scope))
        .catch(err => console.error("PWA Register Error:", err));
    });
  }
}

/* ─── FALLBACK DUMMY UNTUK BLOG ENGINE ─── */
function initBlogPageEngine() {
  console.log("Blog Page Engine modules initialized.");
  // Tulis logika tambahan khusus halaman blog Anda di sini jika ada.
}