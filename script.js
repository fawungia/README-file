// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if(menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Email Capture Form Handler (CRO tracking placeholder)
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
// Wait for the page to fully load
document.addEventListener("DOMContentLoaded", function() {
    
    // Find the hamburger icon and the menu links
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    // When the hamburger is clicked, toggle the 'active' class
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", function() {
            navLinks.classList.toggle("active");
        });
    }
});
