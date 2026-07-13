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
            document.body.classList.toggle('menu-open');
            
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
                document.body.classList.remove('menu-open');
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

    // 8. EXIT/TIMED NEWSLETTER POPUP (Task 3)
    const initNewsletterPopup = () => {
        if (sessionStorage.getItem('skinhonestly_popup_shown')) return;

        // Create Modal HTML
        const modalHtml = `
            <div class="modal-overlay" id="newsletter-modal">
                <div class="modal-content">
                    <div class="modal-close" id="modal-close-btn">✕</div>
                    <h2>Join The Glow List</h2>
                    <p>Subscribe for clinical skincare research, exclusive editorial drops, and 15% off your first curation order.</p>
                    <form action="https://manage.kmail-lists.com/subscriptions/subscribe" method="POST" target="_blank" class="newsletter-form">
                        <input type="hidden" name="g" value="RiVwwC">
                        <div style="display: flex; gap: 10px; flex-direction: column;">
                            <input type="email" name="email" placeholder="Your email address" required style="padding: 1.2rem; border-radius: 4px; border: 1px solid var(--border); font-size: 1rem; width: 100%;">
                            <button type="submit" class="btn btn-primary" style="width: 100%;">Subscribe & Save</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        // Inject Modal into Body
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        const modal = document.getElementById('newsletter-modal');
        const closeBtn = document.getElementById('modal-close-btn');

        const showModal = () => {
            if (sessionStorage.getItem('skinhonestly_popup_shown')) return;
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('active'), 10);
            sessionStorage.setItem('skinhonestly_popup_shown', 'true');
        };

        // Close logic
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.style.display = 'none', 400);
        });

        // Trigger 1: Timed (15s desktop, 25s mobile)
        const delay = window.innerWidth <= 768 ? 25000 : 15000;
        setTimeout(showModal, delay);

        // Trigger 2: Exit Intent (Desktop only)
        if (window.innerWidth > 768) {
            document.addEventListener('mouseleave', (e) => {
                if (e.clientY < 0) showModal();
            }, { once: true });
        }
    };

    initNewsletterPopup();

});
