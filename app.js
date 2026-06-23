document.addEventListener("DOMContentLoaded", () => {

    // --- 1. Existing Sequential Text Cascade Reveal ---
    const cascadeElements = document.querySelectorAll(".cascading-text");
    setTimeout(() => {
        cascadeElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add("reveal");
            }, index * 200);
        });
    }, 250);


// --- 2.0 NEW: Native Multilingual Language Switcher Logic ---
const langBtn = document.getElementById("lang-switch-btn");
// Default deployment initialization: EN
let currentLang = localStorage.getItem("lexer_pref_lang") || "en"; 

function applyLanguage(lang) {
    const translatableElements = document.querySelectorAll("[data-en][data-fr]");
    
    translatableElements.forEach(element => {
        const translation = element.getAttribute(`data-${lang}`);
        if (translation) {
            // Check if element handles input placeholder mutations
            if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
                element.setAttribute("placeholder", translation);
            } else {
                // Regular DOM text node translation injector
                element.textContent = translation;
            }
        }
    });

    // UX FIX: The button must display the TARGET language, not the current state.
    // If current site is EN, button displays "FR" to invite the switch action.
    if (langBtn) {
        langBtn.textContent = (lang === "en") ? "FR" : "EN";
    }
    
    localStorage.setItem("lexer_pref_lang", lang);
}

if (langBtn) {
    langBtn.addEventListener("click", () => {
        currentLang = (currentLang === "en") ? "fr" : "en";
        applyLanguage(currentLang);
    });
}

// Enforce system coherence on DOM load execution
applyLanguage(currentLang);


// --- 2.1 NEW: Static Cross-Fade Carousel Handler ---
const slides = document.querySelectorAll(".gallery-item");
let currentSlideIndex = 0;
const slideIntervalTime = 5000; // Changes images every 5 seconds

function nextSlide() {
    // Structural guard check to verify element index availability
    if (slides.length > 0 && slides[currentSlideIndex]) {
        slides[currentSlideIndex].classList.remove("active");
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        slides[currentSlideIndex].classList.add("active");
    }
}

if (slides.length > 0) {
    setInterval(nextSlide, slideIntervalTime);
}


// --- 3.0 SYSTEM USE CASES PAGINATION & FILTER ENGINE ---
const filterButtons = document.querySelectorAll(".filter-btn");
const caseCards = document.querySelectorAll(".case-card");
const prevPageBtn = document.getElementById("prev-page-btn");
const nextPageBtn = document.getElementById("next-page-btn");
const pageIndicator = document.getElementById("page-indicator");

const CARDS_PER_PAGE = 4;
let currentPage = 1;
let filteredCards = [];

function updatePagination() {
    // 1. Re-collect all cards that match current filter requirements (not hidden by category)
    filteredCards = Array.from(caseCards).filter(card => {
        const currentFilter = document.querySelector(".filter-btn.active").getAttribute("data-filter");
        const cardCategory = card.getAttribute("data-category");
        return currentFilter === "all" || cardCategory === currentFilter;
    });

    const totalPages = Math.ceil(filteredCards.length / CARDS_PER_PAGE) || 1;
    
    // Safety check to prevent out-of-bounds index shifts
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    // 2. Loop through all case cards to alternate grid visibility states
    Array.from(caseCards).forEach(card => card.classList.add("hidden-node"));

    // 3. Calculate target visibility window
    const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
    const endIndex = startIndex + CARDS_PER_PAGE;
    
    filteredCards.slice(startIndex, endIndex).forEach(card => {
        card.classList.remove("hidden-node");
    });

    // 4. Update core operational UI state parameters
    pageIndicator.textContent = `${currentPage} / ${totalPages}`;
    prevPageBtn.disabled = (currentPage === 1);
    nextPageBtn.disabled = (currentPage === totalPages);
}

// Attach Event Listeners to individual dynamic filter keys
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        
        currentPage = 1; // Reset matrix alignment back to first index
        updatePagination();
    });
});

// Navigation Triggers
if (prevPageBtn && nextPageBtn) {
    prevPageBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
            document.getElementById("use-cases").scrollIntoView({ behavior: "smooth" });
        }
    });

    nextPageBtn.addEventListener("click", () => {
        const totalPages = Math.ceil(filteredCards.length / CARDS_PER_PAGE) || 1;
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
            document.getElementById("use-cases").scrollIntoView({ behavior: "smooth" });
        }
    });
}

// --- 4.0 BACK TO TOP CORE EXECUTION ---
const scrollTopBtn = document.getElementById("scroll-top-btn");
if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Initial runtime boot sequence allocation
updatePagination();


/// --- 5.0 NEW: Modal Pop-Up System ---

const contentMap = {
  methodology: `[<div class="methodology-content"><h1>METHODOLOGY</h1>...</div>]`,
  solutions: `[<div class="solutions-content">
  <h1>FROM DIAGNOSTIC TO RESOLUTION</h1>
  <div class="solutions-grid">
    <div class="package-card">
      <h2>BASIC</h2>
      <p>€15,000 + €12,000</p>
      <ul>
        <li>Targeted cartography</li>
        <li>One anomaly resolved</li>
      </ul>
    </div>
    <div class="package-card">
      <h2>ADVANCED</h2>
      <p>€35,000</p>
      <ul>
        <li>Complete dependency map</li>
        <li>Severity-scored register</li>
      </ul>
    </div>
    <div class="package-card">
      <h2>ENTERPRISE</h2>
      <p>€45,000 — €65,000+</p>
      <ul>
        <li>Full Shadow-Organ Protocol</li>
        <li>Zero-downtime guarantee</li>
      </ul>
    </div>
  </div>
</div>]`,
  cases: `[Carousel des Études de Cas]`
};

function openModal(type) {
  //const modalBody = document.getElementById('modal-body');
  //modalBody.innerHTML = contentMap[type]; // Charge le contenu
  //document.getElementById('a4-modal').style.display = 'block';
  document.getElementById('modal-body').innerHTML = type;
  document.getElementById('a4-modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('a4-modal').style.display = 'none';
}

/// ---6.0 NEW: Interactive Use cases ---


const studies = [
  { 
    title: "Newrest - Zero Downtime Migration",
    context: "Global airline catering group.",
    challenge: "ERP scaling from artisanal to industrial.",
    action: "Shadow-Organ Protocol.",
    result: "50% revenue sustained, Zero bugs."
  }
  // Ajouter les autres cas ici
];

let currentIndex = 0;

function showStudy(index) {
  const modalBody = document.getElementById('modal-body');
  const s = studies[index];
  modalBody.innerHTML = `<h3>${s.title}</h3><p>${s.context}</p>...`;
}

    
});