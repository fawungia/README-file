const fs = require('fs');

const headerHtml = `  <header>
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

const footerHtml = `  <footer>
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

const files = [
  'index.html', 'about.html', 'blog.html', 'shop.html', 'privacy.html',
  'post1.html', 'post2.html', 'post3.html', 'post4.html',
  'post5.html', 'post6.html', 'post7.html', 'post8.html'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Remove local style tags
  content = content.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '');

  // Cleanly replace ONLY the master/main page header & footer by matching them at top-level body structure
  // Replace the first header in the body
  content = content.replace(/<body>[\s\S]*?<header[\s\S]*?<\/header>/i, (m) => {
    // Preserve body open tag
    const bodyOpen = m.match(/^<body>/i) ? '<body>\n' : '';
    return `${bodyOpen}${headerHtml}`;
  });

  // Replace the last footer in the body before the end scripts/tags
  content = content.replace(/<footer[\s\S]*?<\/footer>([\s\S]*?<\/body>)/i, `${footerHtml}$1`);

  // Ensure external styles.css is referenced
  if (!content.includes('styles.css')) {
    content = content.replace(/<\/head>/i, '    <link rel="stylesheet" href="styles.css">\n</head>');
  }

  // Handle post/article structure safely without breaking inner tags
  const isPost = file.startsWith('post') && file.endsWith('.html');
  if (isPost) {
    // Wrap main tags with class container & article-layout if they don't have it
    content = content.replace(/<main[^>]*>/i, '<main class="article-layout container">');

    // Ensure the article body is wrapped in <div class="article-body"> if not already nicely structured
    content = content.replace(/<div class="article-content[^"]*"/gi, '<div class="article-content scroll-reveal"');
  } else {
    // Wrap major content sections in scroll-reveal
    content = content.replace(/<section class="([^"]*)"/gi, (match, classes) => {
      if (!classes.includes('scroll-reveal')) {
        return `<section class="${classes} scroll-reveal"`;
      }
      return match;
    });
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
});
