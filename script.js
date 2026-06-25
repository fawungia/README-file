// Wait for the page to fully load
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MOBILE MENU TOGGLE ---
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // --- 2. EMAIL CAPTURE FORM HANDLER ---
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real environment, trigger your email marketing API here
            alert('Thank you! Check your inbox for your 7-Day Glow Routine.');
            form.reset();
        });
    });
    
});
