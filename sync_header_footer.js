const fs = require('fs');
const path = require('path');

const masterHeader = `  <header>
    <div class="header-top">DERMATOLOGIST-LED SKINCARE • FREE SHIPPING ON ORDERS $50+</div>
    <div class="header-main">
        <div class="header-search"><!-- Search placeholder --></div>
        <a href="index.html" class="logo">SkinHonestly</a>
        <div class="header-utility"><!-- Account/Cart placeholders --></div>
    </div>
    <nav class="nav-container">
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
    <div class="header-trust-bar">
        <span>CLINICAL INGREDIENTS</span>
        <span>DERMATOLOGIST APPROVED</span>
        <span>CRUELTY-FREE</span>
    </div>
  </header>`;

const masterFooter = `  <div class="back-to-top" onclick="window.scrollTo({top:0, behavior:'smooth'})">Back to the top</div>

  <footer>
    <div class="footer-newsletter">
        <h3>Subscribe to The Journal</h3>
        <p>Clinical skincare advice and exclusive editorial drops delivered to your inbox.</p>
        <form action="#" class="n-form">
            <input type="email" placeholder="Your email address" required>
            <button type="submit">Join</button>
        </form>
    </div>
    <div class="f-container">
        <div class="f-col">
            <h5>Editorial</h5>
            <a href="index.html">Front Page</a>
            <a href="blog.html">The Journal</a>
            <a href="about.html">About Us</a>
        </div>
        <div class="f-col">
            <h5>Curation</h5>
            <a href="shop.html">Shop All</a>
            <a href="shop.html">SkinHonestly Exclusive</a>
        </div>
        <div class="f-col">
            <h5>Connect</h5>
            <a href="#">Instagram</a>
            <a href="#">Pinterest</a>
            <a href="#">YouTube</a>
        </div>
        <div class="f-col">
            <h5>Trust</h5>
            <a href="privacy.html">Privacy Policy</a>
            <a href="privacy.html">Disclosures</a>
        </div>
    </div>
    <div class="f-bottom">
        <p>&copy; 2024 SKINHONESTLY. CLINICAL RESEARCH. REAL RESULTS. HONESTLY.</p>
    </div>
  </footer>`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace Header
    content = content.replace(/<header>[\s\S]*?<\/header>/i, masterHeader);
    
    // Replace Footer (handling potential back-to-top and existing footer)
    content = content.replace(/(<div class="back-to-top"[\s\S]*?>[\s\S]*?<\/div>\s*)?<footer>[\s\S]*?<\/footer>/i, masterFooter);
    
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
});
