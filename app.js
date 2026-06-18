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


    // --- 2.0NEW: Native Multilingual Language Switcher Logic ---
    const langBtn = document.getElementById("lang-switch-btn");
    // Remplace par "fr" par défaut si tu veux initialiser le site en français
    let currentLang = localStorage.getItem("lexer_pref_lang") || "en"; 

    function applyLanguage(lang) {
        const translatableElements = document.querySelectorAll("[data-en][data-fr]");
        
        translatableElements.forEach(element => {
            const translation = element.getAttribute(`data-${lang}`);
            if (translation) {
                // Si l'élément est un champ de formulaire (placeholder)
                if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
                    element.setAttribute("placeholder", translation);
                } else {
                    // Sinon on injecte dans le texte standard
                    element.textContent = translation;
                }
            }
        });

        // Met à jour l'étiquette visuelle du bouton de contrôle
        if (langBtn) {
            langBtn.textContent = lang.toUpperCase();
        }
        
        // Sauvegarde la préférence pour la navigation inter-pages
        localStorage.setItem("lexer_pref_lang", lang);
    }

    if (langBtn) {
        langBtn.addEventListener("click", () => {
            currentLang = (currentLang === "en") ? "fr" : "en";
            applyLanguage(currentLang);
        });
    }

    // Applique la langue sauvegardée dès le chargement initial de la structure
    applyLanguage(currentLang);

    // --- 2. NEW: Static Cross-Fade Carousel Handler ---
    const slides = document.querySelectorAll(".gallery-item");
    let currentSlideIndex = 0;
    const slideIntervalTime =5000;//Changes images every 5second

    function nextSlide() {
        // Remove active visibility from current image
        slides[currentSlideIndex].classList.remove("active");
        
        // Move to the next index layout block natively
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        
        // Add visibility to the next image
        slides[currentSlideIndex].classList.add("active");
    }

    // Initialize loop sequence only if elements exist on page
    if (slides.length > 0) {
        setInterval(nextSlide, slideIntervalTime);
    }

    // --- 3. Existing Dynamic Matrix Filter Core Loop ---
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