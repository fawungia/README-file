const fs = require('fs');

const headerHtml = `    <header>
        <nav class="nav-container">
            <a href="index.html" class="logo">SkinHonestly</a>
            <div class="menu-toggle" id="mobile-toggle">☰</div> 
            <div class="nav-links" id="nav-menu">
                <a href="index.html" class="active">Front Page</a>
                
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

const footerHtml = `    <footer>
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

const requiredHeads = `    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">`;

for (let i = 1; i <= 8; i++) {
    const filename = `post${i}.html`;
    if (!fs.existsSync(filename)) continue;
    let content = fs.readFileSync(filename, 'utf8');

    // Cleanly replace placeholders
    content = content.replace(/<header\s+id="header-placeholder"><\/header>/i, headerHtml);
    content = content.replace(/<footer\s+id="footer-placeholder"><\/footer>/i, footerHtml);

    // Find and remove specifically the loadComponent script
    const scriptRegex = /<script>([\s\S]*?)<\/script>/gi;
    let match;
    const scriptsToRemove = [];
    while ((match = scriptRegex.exec(content)) !== null) {
        if (match[1].includes('loadComponent')) {
            scriptsToRemove.push(match[0]);
        }
    }
    scriptsToRemove.forEach(scriptTag => {
        content = content.replace(scriptTag, '');
    });

    // Ensure style.css and fonts in <head>
    if (!content.includes('style.css')) {
        content = content.replace(/<\/head>/i, `${requiredHeads}\n</head>`);
    }

    // Ensure body ends with script.js
    if (!content.includes('src="script.js"')) {
        content = content.replace(/<\/body>/i, `    <script src="script.js"></script>\n</body>`);
    }

    // Add scroll-reveal class safely
    content = content.replace(/<h1([^>]*)>/gi, (m, attrs) => {
        if (attrs.includes('class=')) {
            if (!attrs.includes('scroll-reveal')) {
                return `<h1${attrs.replace(/class="([^"]*)"/gi, 'class="$1 scroll-reveal"')}>`;
            }
            return m;
        } else {
            return `<h1 class="scroll-reveal"${attrs}>`;
        }
    });

    content = content.replace(/<img([^>]*)>/gi, (m, attrs) => {
        if (attrs.includes('main-img') || attrs.includes('featured-image')) {
            if (attrs.includes('class=')) {
                if (!attrs.includes('scroll-reveal')) {
                    return `<img${attrs.replace(/class="([^"]*)"/gi, 'class="$1 scroll-reveal"')}>`;
                }
            } else {
                return `<img class="scroll-reveal"${attrs}>`;
            }
        }
        return m;
    });

    content = content.replace(/<article([^>]*)>/gi, (m, attrs) => {
        if (attrs.includes('article-content')) {
            if (attrs.includes('class=')) {
                if (!attrs.includes('scroll-reveal')) {
                    return `<article${attrs.replace(/class="([^"]*)"/gi, 'class="$1 scroll-reveal"')}>`;
                }
            } else {
                return `<article class="scroll-reveal"${attrs}>`;
            }
        }
        return m;
    });

    content = content.replace(/<aside([^>]*)>/gi, (m, attrs) => {
        if (attrs.includes('sidebar')) {
            if (attrs.includes('class=')) {
                if (!attrs.includes('scroll-reveal')) {
                    return `<aside${attrs.replace(/class="([^"]*)"/gi, 'class="$1 scroll-reveal"')}>`;
                }
            } else {
                return `<aside class="scroll-reveal"${attrs}>`;
            }
        }
        return m;
    });

    fs.writeFileSync(filename, content, 'utf8');
    console.log(`Processed ${filename}`);
}

// Fix blog.html
if (fs.existsSync('blog.html')) {
    let blogContent = fs.readFileSync('blog.html', 'utf8');
    blogContent = blogContent.replace(/<header>[\s\S]*?<\/header>/i, headerHtml);
    blogContent = blogContent.replace(/<footer>[\s\S]*?<\/footer>/i, footerHtml);
    fs.writeFileSync('blog.html', blogContent, 'utf8');
    console.log(`Processed blog.html`);
}
