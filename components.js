const headerHTML = `
<header>
    <nav class="nav-container">
        <a href="index.html" class="logo">SkinHonestly</a>
        <div class="menu-toggle" id="mobile-toggle">☰</div> 
        <div class="nav-links" id="nav-menu">
            <a href="index.html">Front Page</a>
            <div class="nav-dropdown">
                <a href="shop.html">The Curation ▾</a>
                <div class="dropdown-content">
                    <a href="shop.html">All Products</a>
                    <a href="shop.html?cat=cleansers">Cleansers</a>
                    <a href="shop.html?cat=serums">Serums</a>
                    <a href="shop.html?cat=moisturizers">Moisturizers</a>
                    <a href="shop.html?cat=spf">SPF</a>
                    <a href="shop.html?cat=treatments">Treatments</a>
                </div>
            </div>
            <div class="nav-dropdown">
                <a href="blog.html">The Journal ▾</a>
                <div class="dropdown-content">
                    <a href="blog.html?cat=all">Latest Stories</a>
                    <a href="blog.html?cat=rituals">Morning Rituals</a>
                    <a href="blog.html?cat=science">Ingredient Science</a>
                    <a href="blog.html?cat=reviews">Derm Reviews</a>
                    <a href="blog.html?cat=barrier">Barrier Health</a>
                </div>
            </div>
            <a href="about.html">About</a>
        </div>
    </nav>
</header>`;

const footerHTML = `
<footer>
    <a href="index.html" class="f-logo">SkinHonestly</a>
    <div class="f-container">
        <div class="f-col"><h5>Editorial</h5><a href="index.html">Front Page</a><a href="blog.html">The Journal</a><a href="about.html">The Philosophy</a></div>
        <div class="f-col"><h5>Shop Curation</h5><a href="shop.html">The Exclusive Line</a><a href="shop.html">Derm-Trusted Picks</a></div>
        <div class="f-col"><h5>Connect</h5><a href="#">Instagram</a><a href="#">YouTube</a><a href="#">Pinterest</a></div>
        <div class="f-col"><h5>Trust & Support</h5><a href="privacy.html">Privacy Policy</a><a href="privacy.html">Disclosures</a><a href="about.html">Contact Us</a></div>
    </div>
    <div class="f-bottom"><p>&copy; 2024 SKINHONESTLY. REAL SKINCARE. HONESTLY.</p></div>
</footer>`;

document.addEventListener("DOMContentLoaded", () => {
    const h = document.getElementById('header-placeholder');
    const f = document.getElementById('footer-placeholder');
    if (h) h.innerHTML = headerHTML;
    if (f) f.innerHTML = footerHTML;

    // Mobile menu logic
    setTimeout(() => {
        const toggle = document.getElementById('mobile-toggle');
        const menu = document.getElementById('nav-menu');
        if (toggle && menu) {
            toggle.addEventListener('click', () => menu.classList.toggle('active'));
        }
    }, 100);
});
