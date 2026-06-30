document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Elevated Preloader Logic
    const preloader = document.getElementById('preloader');
    const preloaderText = document.querySelector('.preloader-text');
    const heroImage = document.querySelector('.hero-image-wrapper');
    const conceptPill = document.querySelector('.concept-pill');

    setTimeout(() => {
        if(preloaderText) preloaderText.classList.add('reveal');
    }, 100);

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('slide-up');
            if (heroImage) heroImage.style.transform = 'scale(1)'; 
            
            setTimeout(() => {
                document.querySelectorAll('.reveal-up, .fade-in').forEach(el => {
                    el.classList.add('is-visible');
                });
                // Unlocked for mobile: Pill fades in gracefully
                if(conceptPill) {
                    conceptPill.style.opacity = '1';
                }
            }, 600);
            
            setTimeout(() => { preloader.style.display = 'none'; }, 1200);
        }, 1200); 
    });

    // 2. High-End Scroll Observer
    const scrollObserverOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); 
            }
        });
    }, scrollObserverOptions);

    document.querySelectorAll('.fade-up').forEach(el => { scrollObserver.observe(el); });

    // 3. Subtle Parallax (Editorial pacing)
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.parallax-img').forEach(img => {
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const distance = (rect.top + (rect.height / 2)) - (window.innerHeight / 2);
                img.style.transform = `translateY(${distance * 0.08}px) scale(1.05)`;
            }
        });
    });

    // 4. Interactive Menu Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuPanels = document.querySelectorAll('.menu-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            menuPanels.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const targetPanel = document.getElementById(btn.getAttribute('data-target'));
            if (targetPanel) targetPanel.classList.add('active');
        });
    });

    // 5. Concept Reservation Form UX
    const reserveForm = document.getElementById('reservation-form');
    const successMessage = document.getElementById('reserve-success');

    if (reserveForm) {
        reserveForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            reserveForm.style.opacity = '0';
            reserveForm.style.pointerEvents = 'none';
            setTimeout(() => {
                successMessage.classList.add('is-active');
                successMessage.style.position = 'relative'; 
                successMessage.style.transform = 'translateY(0)';
                reserveForm.style.display = 'none';
            }, 800);
        });
    }

    // 6. Dynamic Scroll Nav & Pill Morphing
    const glassNav = document.querySelector('.glass-nav');
    if (glassNav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                glassNav.classList.add('nav-scrolled');
                if (conceptPill) conceptPill.style.opacity = '0'; // Unlocked for mobile: Hides when scrolling
            } else {
                glassNav.classList.remove('nav-scrolled');
                if (conceptPill) conceptPill.style.opacity = '1'; // Unlocked for mobile: Returns at top
            }
        });
    }
});
