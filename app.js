document.addEventListener("DOMContentLoaded", () => {
    // 1. Preloader Logic
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        // Fade out preloader
        preloader.style.opacity = '0';
        
        setTimeout(() => {
            preloader.style.display = 'none';
            // Trigger Hero Image subtle scale down
            const heroWrapper = document.querySelector('.hero-image-wrapper');
            if (heroWrapper) heroWrapper.style.transform = 'scale(1)';
            
            // Trigger Hero Text animations
            document.querySelectorAll('.reveal-text').forEach(el => {
                el.classList.add('is-visible');
            });
        }, 1000);
    });

    // 2. Scroll Intersection Observer for Elements
    const scrollObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); 
            }
        });
    }, scrollObserverOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        scrollObserver.observe(el);
    });

    // 3. Subtle Parallax for ALL Editorial & Gallery Images
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxImages = document.querySelectorAll('.parallax-img');
        
        parallaxImages.forEach(img => {
            // Check if the image is actually in the viewport to save performance
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // Calculate distance from center of screen for smoother parallax
                const distanceFromCenter = (rect.top + (rect.height / 2)) - (window.innerHeight / 2);
                img.style.transform = `translateY(${distanceFromCenter * 0.1}px) scale(1.05)`;
            }
        });
    });

    // 4. Interactive Menu Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuPanels = document.querySelectorAll('.menu-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            menuPanels.forEach(p => p.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Find and show the target panel
            const targetId = btn.getAttribute('data-target');
            const targetPanel = document.getElementById(targetId);
            
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
// 5. Reservation Form UX Logic
    const reserveForm = document.getElementById('reservation-form');
    const successMessage = document.getElementById('reserve-success');

    if (reserveForm) {
        reserveForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevents page reload
            
            // Fade out the form
            reserveForm.style.opacity = '0';
            reserveForm.style.pointerEvents = 'none';
            
            // Wait slightly, then fade in the success message
            setTimeout(() => {
                successMessage.classList.add('is-active');
                successMessage.style.position = 'relative'; // resets position for layout
                successMessage.style.transform = 'translateY(0)';
                reserveForm.style.display = 'none';
            }, 600);
        });
    }
    // 6. Dynamic Mobile Nav Shrink on Scroll
    const glassNav = document.querySelector('.glass-nav');
    if (glassNav) {
        window.addEventListener('scroll', () => {
            // If the user scrolls down more than 50 pixels, apply the capsule state
            if (window.scrollY > 50) {
                glassNav.classList.add('nav-scrolled');
            } else {
                // If they scroll back to the absolute top, expand the menu again
                glassNav.classList.remove('nav-scrolled');
            }
        });
    }
});
