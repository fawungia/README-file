/* ==========================================================================
   SkinHonestly Master Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MOBILE MENU TOGGLE
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Toggle the icon text between ☰ and ✕ for a better UX
            mobileToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });
    }

    // 2. STICKY HEADER SHADOW ON SCROLL
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
            header.style.transition = '0.3s ease';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.02)';
        }
    });

    // 3. AUTO-DETECT ACTIVE NAVIGATION LINK
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath.includes(linkPath) && linkPath !== 'index.html') {
            link.classList.add('active');
        } else if (currentPath === '/' || currentPath.endsWith('index.html')) {
            if (linkPath === 'index.html') link.classList.add('active');
        }
    });

    // 4. FORM INTERACTION (Subtle Feedback)
    const forms = document.querySelectorAll('.newsletter-form, .contact-form');
    forms.forEach(form => {
        form.addEventListener('submit', () => {
            // We don't use e.preventDefault() here so the Klaviyo action still works.
            // We just provide immediate visual feedback.
            const btn = form.querySelector('button');
            if (btn) {
                btn.textContent = 'Joining...';
                btn.style.opacity = '0.7';
            }
        });
    });

});
