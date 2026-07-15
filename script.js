/* ==========================================================================
   SkinHonestly Master Script
   Every page loads this file. Do not duplicate mobile-menu, dropdown, or
   newsletter-popup logic inline in a page — add it here once instead.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const headerNav = document.querySelector('.nav-container');
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    let scrollY = 0;

    // 1. MOBILE MENU: reparent nav-links to <body> on mobile
    // iOS Safari has a known bug where a position:fixed element nested inside
    // a position:sticky ancestor (our <header>) can fail to stack/scroll
    // correctly. Moving #nav-menu to be a direct child of <body> on mobile
    // (and back into the header on desktop) avoids it. Re-checked on every
    // breakpoint change, not just once at page load, so resizing/rotating
    // the device can't leave the menu in a broken state.
    function placeMenu(isMobile) {
        if (!navMenu || !headerNav) return;
        if (isMobile && navMenu.parentElement !== document.body) {
            document.body.appendChild(navMenu);
        } else if (!isMobile && navMenu.parentElement !== headerNav) {
            headerNav.appendChild(navMenu);
        }
    }

    function closeMenu() {
        document.body.classList.remove('menu-open');
        document.body.style.top = '';
        window.scrollTo(0, scrollY);
        if (navMenu) navMenu.classList.remove('active');
        document.querySelectorAll('.nav-dropdown.active').forEach(d => d.classList.remove('active'));
        if (mobileToggle) {
            mobileToggle.textContent = '☰';
            mobileToggle.setAttribute('aria-expanded', 'false');
        }
    }

    function openMenu() {
        scrollY = window.scrollY;
        document.body.style.top = `-${scrollY}px`;
        document.body.classList.add('menu-open');
        if (navMenu) navMenu.classList.add('active');
        if (mobileToggle) {
            mobileToggle.textContent = '✕';
            mobileToggle.setAttribute('aria-expanded', 'true');
        }
    }

    if (mobileToggle && navMenu) {
        placeMenu(mobileQuery.matches);

        mobileQuery.addEventListener('change', (e) => {
            placeMenu(e.matches);
            if (!e.matches) closeMenu();
        });

        mobileToggle.addEventListener('click', () => {
            navMenu.classList.contains('active') ? closeMenu() : openMenu();
        });

        // Close the mobile menu when a real destination link is tapped
        navMenu.querySelectorAll('a:not(.nav-dropdown > a)').forEach(link => {
            link.addEventListener('click', () => {
                if (mobileQuery.matches) closeMenu();
            });
        });
    }

    // 2. MOBILE DROPDOWN TAP-TO-OPEN (Curation / Journal)
    // Checked live against mobileQuery on every click, so it keeps working
    // if the viewport changes after the page has already loaded.
    document.querySelectorAll('.nav-dropdown > a').forEach(link => {
        link.addEventListener('click', function (e) {
            if (mobileQuery.matches) {
                e.preventDefault();
                const parent = this.parentElement;
                const wasActive = parent.classList.contains('active');
                document.querySelectorAll('.nav-dropdown.active').forEach(d => d.classList.remove('active'));
                if (!wasActive) parent.classList.add('active');
            }
        });
    });

    // 3. STICKY HEADER SHADOW ON SCROLL
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.style.boxShadow = window.scrollY > 20
                ? '0 4px 20px rgba(0,0,0,0.08)'
                : '0 2px 10px rgba(0,0,0,0.02)';
        });
    }

    // 4. READING PROGRESS BAR (present on post/article pages only)
    const progressBar = document.getElementById('reading-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
            progressBar.style.width = scrolled + '%';
        });
    }

    // 5. AUTO-DETECT ACTIVE NAVIGATION LINK
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPath = link.getAttribute('href');
        if (!linkPath) return;
        if (linkPath !== 'index.html' && currentPath.includes(linkPath)) {
            link.classList.add('active');
        } else if ((currentPath === '/' || currentPath.endsWith('index.html')) && linkPath === 'index.html') {
            link.classList.add('active');
        }
    });

    // 6. FORM SUBMIT FEEDBACK
    document.querySelectorAll('.newsletter-form, .contact-form, .n-form').forEach(form => {
        form.addEventListener('submit', () => {
            const btn = form.querySelector('button, input[type="submit"]');
            if (btn) {
                btn.textContent = 'Joining...';
                btn.style.opacity = '0.7';
            }
        });
    });

    // 7. SCROLL-REVEAL (cards, headings, affiliate boxes)
    const revealElements = document.querySelectorAll('.scroll-reveal');
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('revealed'));
    }

    // 8. HERO STAGGERED FADE-IN
    document.querySelectorAll('.stagger-item').forEach((item, index) => {
        setTimeout(() => item.classList.add('revealed'), index * 200 + 100);
    });

    // 9. EXIT/TIMED NEWSLETTER POPUP
    const initNewsletterPopup = () => {
        if (sessionStorage.getItem('skinhonestly_popup_shown')) return;

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

        document.body.insertAdjacentHTML('beforeend', modalHtml);

        const modal = document.getElementById('newsletter-modal');
        const closeBtn = document.getElementById('modal-close-btn');

        const showModal = () => {
            if (sessionStorage.getItem('skinhonestly_popup_shown')) return;
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('active'), 10);
            sessionStorage.setItem('skinhonestly_popup_shown', 'true');
        };

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.style.display = 'none', 400);
        });

        const delay = mobileQuery.matches ? 25000 : 15000;
        setTimeout(showModal, delay);

        if (!mobileQuery.matches) {
            document.addEventListener('mouseleave', (e) => {
                if (e.clientY < 0) showModal();
            }, { once: true });
        }
    };

    initNewsletterPopup();

});
