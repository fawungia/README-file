const fs = require('fs');
const path = require('path');

const headerCode = `<header>
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

const footerCode = `<footer>
    <a href="index.html" class="f-logo">SkinHonestly</a>
    <div class="f-container">
        <div class="f-col">
            <h5>Editorial</h5>
            <a href="index.html">Front Page</a>
            <a href="blog.html">The Journal</a>
            <a href="about.html">The Philosophy</a>
        </div>
        <div class="f-col">
            <h5>Shop Curation</h5>
            <a href="shop.html">The Exclusive Line</a>
            <a href="shop.html">Derm-Trusted Picks</a>
        </div>
        <div class="f-col">
            <h5>Connect</h5>
            <a href="#">Instagram</a>
            <a href="#">YouTube</a>
            <a href="#">Pinterest</a>
        </div>
        <div class="f-col">
            <h5>Trust & Support</h5>
            <a href="privacy.html">Privacy Policy</a>
            <a href="privacy.html">Disclosures</a>
            <a href="about.html">Contact Us</a>
        </div>
    </div>
    <div class="f-bottom">
        <p>&copy; 2024 SKINHONESTLY. REAL SKINCARE. HONESTLY.</p>
    </div>
</footer>`;

const files = [
    'index.html', 'blog.html', 'shop.html', 'about.html',
    'post1.html', 'post2.html', 'post3.html', 'post4.html',
    'post5.html', 'post6.html', 'post7.html', 'post8.html',
    'privacy.html'
];

files.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`File ${file} does not exist. Skipping.`);
        return;
    }

    let content = fs.readFileSync(file, 'utf8');

    // Replace Header
    // Handle cases where the header might be multiline or have spaces
    content = content.replace(/<header[\s\S]*?<\/header>/i, headerCode);

    // Replace Footer
    content = content.replace(/<footer>[\s\S]*?<\/footer>/i, footerCode);

    // Clean up any extra announcement bars, trust bars, or back-to-top buttons left outside the new tags
    content = content.replace(/<div class="header-top">[\s\S]*?<\/div>/ig, '');
    content = content.replace(/<div class="header-trust-bar">[\s\S]*?<\/div>/ig, '');
    content = content.replace(/<div class="back-to-top"[\s\S]*?<\/div>/ig, '');

    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
});
