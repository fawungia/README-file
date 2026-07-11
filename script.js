/* ==========================================================================
   SkinHonestly Master Script with Animations and Micro-Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MOBILE MENU TOGGLE (with Hamburger-to-X animation and slide/fade)
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Hamburger-to-X transition / toggle icon text & rotation
            if (navMenu.classList.contains('active')) {
                mobileToggle.textContent = '✕';
                mobileToggle.style.transform = 'rotate(90deg)';
            } else {
                mobileToggle.textContent = '☰';
                mobileToggle.style.transform = 'rotate(0deg)';
            }
        });

        // Close mobile menu when a nav link is clicked
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.textContent = '☰';
                mobileToggle.style.transform = 'rotate(0deg)';
            });
        });
    }

    // 2. STICKY HEADER SHADOW ON SCROLL
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.02)';
            }
        });
    }

    // 3. AUTO-DETECT ACTIVE NAVIGATION LINK
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath && currentPath.includes(linkPath) && linkPath !== 'index.html') {
            link.classList.add('active');
        } else if (currentPath === '/' || currentPath.endsWith('index.html')) {
            if (linkPath === 'index.html') link.classList.add('active');
        }
    });

    // 4. FORM INTERACTION (Subtle Feedback)
    const forms = document.querySelectorAll('.newsletter-form, .contact-form, .n-form');
    forms.forEach(form => {
        form.addEventListener('submit', () => {
            const btn = form.querySelector('button, input[type="submit"]');
            if (btn) {
                btn.textContent = 'Joining...';
                btn.style.opacity = '0.7';
            }
        });
    });

    // 5. INTERSECTION OBSERVER FOR SCROLL REVEAL (Cards, headings, and affiliate boxes)
    const revealElements = document.querySelectorAll('.scroll-reveal');
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers or if preferred-reduced-motion is active
        revealElements.forEach(el => el.classList.add('revealed'));
    }

    // 6. HERO SECTION: SUBTLE STAGGERED FADE-IN
    const staggerItems = document.querySelectorAll('.stagger-item');
    staggerItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('revealed');
        }, index * 200 + 100);
    });

    // 7. NAV DROPDOWNS: SMOOTH HEIGHT/OPACITY TRANSITION ON MOBILE
    const dropdownTitles = document.querySelectorAll('.nav-dropdown > a');
    dropdownTitles.forEach(dropdownTitle => {
        dropdownTitle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = dropdownTitle.parentElement;
                parent.classList.toggle('active');
                
                // Close other dropdowns
                dropdownTitles.forEach(otherTitle => {
                    if (otherTitle !== dropdownTitle) {
                        otherTitle.parentElement.classList.remove('active');
                    }
                });
            }
        });
    });

});
