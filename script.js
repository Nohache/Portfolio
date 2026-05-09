// script.js
document.addEventListener('DOMContentLoaded', () => {
    // ---- Animation des cartes et éléments au défilement ----
    const animatedElements = document.querySelectorAll('.card, .cert-item, .profile-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        // Préparer le style initial pour l'animation
        if (!el.classList.contains('profile-card')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        observer.observe(el);
    });

    // ---- Effet de survol subtil sur les liens de navigation ----
    const navLinkItems = document.querySelectorAll('.nav-link');
    navLinkItems.forEach(link => {
        link.addEventListener('mouseenter', () => {
            if (!link.classList.contains('active')) {
                link.style.transform = 'translateY(-2px)';
            }
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });

    // ---- Ombre dynamique sur la navbar au scroll ----
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 10) {
            navbar.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'var(--shadow)';
        }
    });

    // ---- Menu hamburger ----
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (event) => {
            event.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fermer le menu quand on clique sur un lien
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Fermer le menu quand on clique en dehors
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ============ GESTION DES MODALES (PPE) ============
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const body = document.body;

    // Ouvrir la modale correspondante
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            // On empêche la propagation pour ne pas déclencher d'autres écouteurs éventuels
            e.stopPropagation();
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                // Fermer toute modale déjà ouverte avant d'ouvrir celle-ci
                const previouslyActive = document.querySelector('.modal.active');
                if (previouslyActive && previouslyActive !== modal) {
                    previouslyActive.classList.remove('active');
                }
                modal.classList.add('active');
                body.style.overflow = 'hidden'; // empêche le scroll de fond
            }
        });
    });

    // Fermer les modales (clic sur la croix ou en dehors du contenu)
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) {
        modalContainer.addEventListener('click', (e) => {
            // Si on clique directement sur le fond (modal) ou sur la croix (modal-close)
            if (e.target.classList.contains('modal') || e.target.classList.contains('modal-close')) {
                const activeModal = document.querySelector('.modal.active');
                if (activeModal) {
                    activeModal.classList.remove('active');
                    body.style.overflow = ''; // restaure le scroll
                }
            }
        });
    }

    // Fermer avec la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                activeModal.classList.remove('active');
                body.style.overflow = '';
            }
        }
    });
});