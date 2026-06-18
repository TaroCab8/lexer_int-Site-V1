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


// --- 3.0 Existing Dynamic Matrix Filter Core Loop ---
const filterButtons = document.querySelectorAll(".filter-btn");
const caseCards = document.querySelectorAll(".case-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        
        const selectedFilter = button.getAttribute("data-filter");
        caseCards.forEach(card => {
            const cardCategory = card.getAttribute("data-category");
            if (selectedFilter === "all" || cardCategory === selectedFilter) {
                card.classList.remove("hidden-node");
            } else {
                card.classList.add("hidden-node");
            }
        });
    });
});

    
});