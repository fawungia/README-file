const fs = require('fs');
const path = require('path');

// THE APPROVED STYLE BLOCK CONTENT (from Eye Creams post provided by user)
const approvedStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=Inter:wght@300;400;600;700&display=swap');

        :root {
            --bg: #FAF7F2;
            --primary: #5E795B; 
            --secondary: #D4886B;
            --text: #2B2B2B;
            --text-light: #666;
            --white: #FFFFFF;
            --border: #EAE6DF;
            --highlight: #C9A876;
        }

        /* Global Reset & Phone Stability */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { overflow-x: hidden; width: 100%; position: relative; }
        body { background-color: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; line-height: 1.8; }
        a { text-decoration: none; color: inherit; transition: 0.3s ease; }
        img { max-width: 100%; height: auto; display: block; }
        h1, h2, h3, h4, h5 { font-family: 'Playfair Display', serif; }

        /* MASTER HEADER */
        header { background-color: var(--white); position: sticky; top: 0; z-index: 1000; border-bottom: 1px solid var(--border); box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
        .nav-container { display: flex; justify-content: space-between; align-items: center; padding: 0 5%; max-width: 1400px; margin: 0 auto; height: 80px; }
        .logo { font-size: 1.8rem; font-weight: 600; color: var(--primary); letter-spacing: -1px; }
        .nav-links { display: flex; gap: 3rem; align-items: center; }
        .nav-links a { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; font-weight: 600; color: var(--text-light); }
        .nav-links a:hover { color: var(--primary); }
        .menu-toggle { display: none; font-size: 1.8rem; cursor: pointer; color: var(--primary); padding: 10px; }

        @media (max-width: 768px) {
            .menu-toggle { display: block; }
            .nav-links { 
                display: none; flex-direction: column; position: absolute; top: 80px; left: 0; width: 100%; 
                background-color: var(--white); padding: 2rem; border-bottom: 1px solid var(--border); 
                box-shadow: 0 10px 15px rgba(0,0,0,0.05); gap: 1.5rem; z-index: 1001;
            }
            .nav-links.active { display: flex; }
        }

        /* Editorial Article Layout */
        .article-layout { max-width: 1300px; margin: 4rem auto; padding: 0 5%; display: grid; grid-template-columns: 1fr 350px; gap: 6rem; }
        .cat-tag { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 2px; color: var(--secondary); font-weight: 700; margin-bottom: 1rem; display: block; }
        .article-header h1 { font-size: clamp(2.2rem, 5vw, 3.8rem); margin-bottom: 1.5rem; line-height: 1.1; color: var(--primary); }
        .article-meta { display: flex; gap: 20px; font-size: 0.85rem; color: #999; border-bottom: 1px solid var(--border); padding-bottom: 1.5rem; margin-bottom: 3rem; }

        /* Full-Frame Professional Image */
        .main-img { width: 100%; height: 550px; object-fit: cover; margin-bottom: 4rem; border-radius: 8px; box-shadow: 0 15px 40px rgba(0,0,0,0.04); }

        /* Content Styling */
        .article-content p { font-size: 1.15rem; color: #444; margin-bottom: 2rem; }
        .article-content p:first-of-type::first-letter { font-family: 'Playfair Display'; font-size: 4.5rem; float: left; margin-top: 0.5rem; margin-right: 0.8rem; line-height: 1; color: var(--primary); font-weight: 600; }
        .article-content h2 { font-size: 2.2rem; margin: 4rem 0 1.5rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem; color: var(--primary); }
        .article-content ul { padding-left: 1.5rem; margin-bottom: 2rem; }
        .article-content li { margin-bottom: 1rem; font-size: 1.1rem; color: #444; }

        /* Sidebar Widgets */
        .sidebar { display: flex; flex-direction: column; gap: 5rem; border-left: 1px solid var(--border); padding-left: 3rem; }
        .widget-title { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; color: var(--primary); border-bottom: 1px solid var(--border); padding-bottom: 1rem; margin-bottom: 2rem; }
        .shop-widget-item { display: grid; grid-template-columns: 80px 1fr; gap: 1.5rem; align-items: center; margin-bottom: 2rem; }
        .shop-widget-item img { height: 80px; width: 80px; object-fit: cover; border-radius: 4px; }
        .shop-btn { font-size: 0.7rem; color: var(--secondary); font-weight: 700; text-transform: uppercase; border-bottom: 1px solid var(--secondary); }

        /* Newsletter Banner */
        .newsletter-cta { background: var(--primary); color: white; padding: 6rem 5%; text-align: center; margin-top: 6rem; border-radius: 4px; }
        .newsletter-cta h2 { color: white; font-size: 2.8rem; margin-bottom: 1rem; }
        .newsletter-form { display: flex; justify-content: center; gap: 10px; max-width: 600px; margin: 2.5rem auto 0; }
        .newsletter-form input { flex: 1; padding: 1.2rem; border-radius: 4px; border: none; font-size: 1rem; outline: none; }
        .newsletter-form button { background: var(--secondary); color: white; border: none; padding: 0 3rem; font-weight: 700; text-transform: uppercase; font-size: 0.8rem; border-radius: 4px; cursor: pointer; }

        /* MASTER FOOTER */
        footer { padding: 8rem 5% 4rem; background: var(--white); border-top: 1px solid var(--border); margin-top: 5rem; }
        .f-logo { font-size: 2.5rem; font-family: 'Playfair Display', serif; color: var(--primary); margin-bottom: 3rem; display: block; text-align: center; text-decoration: none; }
        .f-container { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 4rem; border-bottom: 1px solid var(--border); padding-bottom: 6rem; text-align: left; }
        
        /* Green Column Titles Fix */
        .f-col h5 { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 2.5rem; color: var(--primary); font-weight: 700; }
        
        .f-col a { display: block; margin-bottom: 1.2rem; font-size: 0.9rem; color: var(--text-light); transition: 0.3s; }
        .f-col a:hover { color: var(--primary); }
        .f-bottom { padding-top: 4rem; text-align: center; font-size: 0.75rem; color: #999; letter-spacing: 2px; text-transform: uppercase; }

        @media (max-width: 1100px) {
            .article-layout { grid-template-columns: 1fr; }
            .sidebar { border-left: none; padding-left: 0; flex-direction: row; flex-wrap: wrap; margin-top: 4rem; }
            .sidebar-widget { flex: 1; min-width: 300px; }
            .f-container { grid-template-columns: 1fr 1fr; gap: 3rem; }
        }
        @media (max-width: 768px) {
            .newsletter-form { flex-direction: column; }
            .newsletter-form button { padding: 1.2rem; }
            .main-img { height: 350px; }
        }

        /* KEEP NAV DROPDOWN CSS */
        .nav-dropdown { position: relative; display: inline-block; }
        .dropdown-content { 
            display: block; position: absolute; background-color: var(--white); min-width: 220px; 
            box-shadow: 0 10px 30px rgba(0,0,0,0.05); z-index: 1002; border: 1px solid var(--border);
            top: 100%; left: 50%; transform: translateX(-50%);
            max-height: 0; opacity: 0; overflow: hidden;
            transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
        }
        .dropdown-content a { color: var(--text-light); padding: 1rem 1.5rem; text-decoration: none; display: block; font-size: 0.7rem; text-transform: uppercase; border-bottom: 1px solid var(--border); letter-spacing: 1px; font-weight: 700; text-align: center; }
        .dropdown-content a:last-child { border-bottom: none; }
        .dropdown-content a:hover { background-color: var(--bg); color: var(--primary); }
        .nav-dropdown:hover .dropdown-content { max-height: 400px; opacity: 1; }
`;

function extract(content, regex) {
    const match = content.match(regex);
    return match ? match[1].trim() : '';
}

const postFiles = ['post1.html', 'post2.html', 'post3.html', 'post4.html', 'post5.html', 'post6.html', 'post7.html', 'post8.html'];

postFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    const content = fs.readFileSync(file, 'utf8');

    // Extract Header
    const headerMatch = content.match(/<header>([\s\S]*?)<\/header>/i);
    const header = headerMatch ? headerMatch[0] : '';

    // Extract Footer
    const footerMatch = content.match(/<footer>([\s\S]*?)<\/footer>/i);
    const footer = footerMatch ? footerMatch[0] : '';

    // Extract Script
    const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/i) || content.match(/<script src="script.js"><\/script>/i);
    const script = scriptMatch ? scriptMatch[0] : '';

    // Extract Unique Data
    const title = extract(content, /<title>([\s\S]*?)<\/title>/i);
    const description = extract(content, /<meta name="description" content="([\s\S]*?)">/i);
    
    // Extract Category/Meta
    const category = extract(content, /<span class="cat-tag">([\s\S]*?)<\/span>/i) || extract(content, /<span class="article-meta">([\s\S]*?)<\/span>/i);
    const headline = extract(content, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
    
    // Extract Date/ReadTime (very rough)
    let metaAuthor = 'By Editor';
    let metaDate = 'July 2026';
    let metaRead = '5 Min Read';
    const metaBox = content.match(/<div class="article-meta">([\s\S]*?)<\/div>/i);
    if (metaBox) {
        const spans = metaBox[1].match(/<span>([\s\S]*?)<\/span>/ig);
        if (spans && spans.length >= 2) {
            metaDate = spans[0].replace(/<\/?span>/ig, '');
            metaRead = spans[1].replace(/<\/?span>/ig, '');
        }
    }

    // Extract Main Image
    const imgMatch = content.match(/<img[^>]+class="main-img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"/i) || content.match(/<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"[^>]+class="main-img/i);
    const imgSrc = imgMatch ? imgMatch[1] : '';
    const imgAlt = imgMatch ? imgMatch[2] : '';

    // Extract Article Content
    let articleInner = '';
    const bodyMatch = content.match(/<article class="article-content">([\s\S]*?)<\/article>/i) || content.match(/<div class="article-content[\s\S]*?">([\s\S]*?)<\/div>/i);
    if (bodyMatch) {
        articleInner = bodyMatch[1].trim();
    }

    // Extract Shop Widget Items
    let shopItems = '';
    const shopWidgetMatch = content.match(/<h3 class="widget-title">Shop This Post<\/h3>([\s\S]*?)<\/div>\s*<\/div>/i) || content.match(/<h3 class="widget-title">Shop The Recovery<\/h3>([\s\S]*?)<\/div>\s*<\/div>/i);
    if (shopWidgetMatch) {
        shopItems = shopWidgetMatch[1].trim();
    }

    // CONSTRUCT NEW CONTENT
    const newContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta name="p:domain_verify" content="614a5afefa741fa072c6f9319d2f14d0"/>
    
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-33SX49MXHN"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-33SX49MXHN');
    </script>

    <style>${approvedStyles}</style>
</head>
<body>

    ${header}

    <main class="article-layout">
        <div class="article-body">
            <header class="article-header">
                <span class="cat-tag">${category}</span>
                <h1>${headline}</h1>
                <div class="article-meta">
                    <span>${metaDate}</span>
                    <span>${metaRead}</span>
                </div>
            </header>

            <img src="${imgSrc}" alt="${imgAlt}" class="main-img">

            <article class="article-content">
                ${articleInner}
            </article>
        </div>

        <aside class="sidebar">
            <div class="sidebar-widget">
                <h3 class="widget-title">The Editor</h3>
                <div style="text-align: center;">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400" alt="Sarah" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 1.5rem; border: 1px solid var(--border);">
                    <p style="font-size: 0.9rem; font-style: italic; color: var(--text-light);">"Real skincare starts with honesty. I'm here to find what actually works."</p>
                </div>
            </div>

            <div class="sidebar-widget">
                <h3 class="widget-title">Shop This Post</h3>
                ${shopItems}
            </div>
        </aside>
    </main>

    <!-- NEWSLETTER SECTION -->
    <section class="newsletter-cta">
        <h2>Join The Glow List</h2>
        <p>Get exclusive clinical research and early access to drops.</p>
        <form action="https://manage.kmail-lists.com/subscriptions/subscribe" method="POST" target="_blank" class="newsletter-form">
            <input type="hidden" name="g" value="WpSSkZ">
            <input type="email" name="email" placeholder="Your email address" required>
            <button type="submit">Subscribe</button>
        </form>
    </section>

    ${footer}

    ${script}
</body>
</html>`;

    fs.writeFileSync(file, newContent);
    console.log(`Standardized Body Style for ${file}`);
});
