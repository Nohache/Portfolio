// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Animation des cartes au défilement (Intersection Observer)
    const animatedElements = document.querySelectorAll('.card, .cert-item, .profile-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Ajouter un petit délai progressif si désiré
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

    // Effet de survol subtil sur les liens de navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            if (!link.classList.contains('active')) {
                link.style.transform = 'translateY(-2px)';
            }
        });
        link.addEventListener('mouseleave', (e) => {
            link.style.transform = 'translateY(0)';
        });
    });

    // Ajout d'une classe 'scrolled' à la navbar si besoin (optionnel)
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 10) {
            navbar.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'var(--shadow)';
        }
    });
});