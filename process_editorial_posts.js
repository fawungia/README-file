const fs = require('fs');
const path = require('path');

// 1. Read index.html to extract the EXACT header and footer
const indexHtml = fs.readFileSync('index.html', 'utf8');

const headerMatch = indexHtml.match(/<header[^>]*>([\s\S]*?)<\/header>/i);
if (!headerMatch) {
    console.error("Error: Could not find header in index.html");
    process.exit(1);
}
const exactHeader = headerMatch[0];

const footerMatch = indexHtml.match(/<footer[^>]*>([\s\S]*?)<\/footer>/i);
if (!footerMatch) {
    console.error("Error: Could not find footer in index.html");
    process.exit(1);
}
const exactFooter = footerMatch[0];

// Callout templates to insert (with 80px x 80px sizing styled via CSS or inline)
const affiliateCallouts = [
    `
    <div class="shop-callout scroll-reveal">
        <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200" alt="Daily Reset Serum">
        <div class="shop-callout-content">
            <h4>Daily Reset Serum</h4>
            <p>Our signature molecular recovery formula designed to lock in deep hydration and restore compromised lipid barriers.</p>
            <a href="shop.html" class="shop-callout-btn">Shop Now — $42</a>
        </div>
    </div>
    `,
    `
    <div class="shop-callout scroll-reveal">
        <img src="https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=200" alt="Mineral SPF 50">
        <div class="shop-callout-content">
            <h4>Mineral SPF 50 Shield</h4>
            <p>A lightweight physical block with zinc oxide and natural botanical extracts to guard skin against daily UV rays and pollution.</p>
            <a href="shop.html" class="shop-callout-btn">Shop Now — $34</a>
        </div>
    </div>
    `,
    `
    <div class="shop-callout scroll-reveal">
        <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=200" alt="Hydrating Cleanser">
        <div class="shop-callout-content">
            <h4>Hydrating Milky Cleanser</h4>
            <p>A non-foaming pH-balanced cleanser that gently lifts daily impurities without stripping vital moisture or skin oils.</p>
            <a href="shop.html" class="shop-callout-btn">Shop Now — $24</a>
        </div>
    </div>
    `,
    `
    <div class="shop-callout scroll-reveal">
        <img src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=200" alt="Stainless Face Roller">
        <div class="shop-callout-content">
            <h4>Stainless Steel Face Roller</h4>
            <p>The ultimate recovery tool to sculpt, de-puff, and cool tired skin. Enhances serum penetration for better results.</p>
            <a href="shop.html" class="shop-callout-btn">Shop Now — $28</a>
        </div>
    </div>
    `,
    `
    <div class="shop-callout scroll-reveal">
        <img src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=200" alt="Centella Barrier Balm">
        <div class="shop-callout-content">
            <h4>Centella Soothing Barrier Balm</h4>
            <p>An intense recovery salve rich in madecassoside to rapidly calm visible redness and rescue sensitized dry areas.</p>
            <a href="shop.html" class="shop-callout-btn">Shop Now — $38</a>
        </div>
    </div>
    `,
    `
    <div class="shop-callout scroll-reveal">
        <img src="https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=200" alt="Bakuchiol Night Oil">
        <div class="shop-callout-content">
            <h4>Bakuchiol Night Renewal Oil</h4>
            <p>A natural, plant-derived retinol alternative designed to stimulate cell turnover and minimize fine lines overnight.</p>
            <a href="shop.html" class="shop-callout-btn">Shop Now — $46</a>
        </div>
    </div>
    `
];

for (let i = 1; i <= 8; i++) {
    const filename = `post${i}.html`;
    if (!fs.existsSync(filename)) continue;

    let html = fs.readFileSync(filename, 'utf8');

    // Replace header and footer
    html = html.replace(/<header[^>]*>[\s\S]*?<\/header>/i, exactHeader);
    html = html.replace(/<footer[^>]*>[\s\S]*?<\/footer>/i, exactFooter);

    // Ensure links are clean
    html = html.replace(/<link\s+rel="stylesheet"\s+href="[^"]*style\.css"[^>]*>/gi, '');
    html = html.replace(/<link\s+rel="stylesheet"\s+href="[^"]*styles\.css"[^>]*>/gi, '');
    html = html.replace(/<\/head>/i, '    <link rel="stylesheet" href="styles.css">\n</head>');

    html = html.replace(/<script\s+src="[^"]*script\.js"[^>]*><\/script>/gi, '');
    html = html.replace(/<\/body>/i, '    <script src="script.js"></script>\n</body>');

    const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    if (mainMatch) {
        let mainInner = mainMatch[1];

        // 1. Find or construct the article-header
        let headerArt = '';
        const headerArtMatch = mainInner.match(/<header\s+class="article-header[^>]*>([\s\S]*?)<\/header>/i);
        if (headerArtMatch) {
            headerArt = headerArtMatch[0];
            // Standardize meta if needed inside headerArt, or keep it.
            // Let's ensure <span class="article-meta"> is styled correctly.
            // We want to transform whatever meta was there to have the class article-meta.
            // Let's replace any class="cat-tag" or div class="article-meta" to have the exact requested layout:
            // <span class="article-meta">Category • Date • By Author</span>
            // <h1>Article Title</h1>
            
            // Let's extract the actual Title and Meta info
            const titleMatch = headerArt.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
            const titleText = titleMatch ? titleMatch[1].trim() : "Article Title";

            // Attempt to get category and author/date to reconstruct clean meta
            const catMatch = headerArt.match(/<span[^>]*class="[^"]*(?:cat-tag|category)[^"]*"[^>]*>([\s\S]*?)<\/span>/i);
            const catText = catMatch ? catMatch[1].replace(/&bull;|•/g, '').trim() : "Skincare";

            const metaDivMatch = headerArt.match(/<div[^>]*class="article-meta"[^>]*>([\s\S]*?)<\/div>/i);
            let authorDateText = "By Editor • July 2026";
            if (metaDivMatch) {
                // strip spans, clean up whitespace/bullets
                authorDateText = metaDivMatch[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
            } else {
                const authorMatch = headerArt.match(/<span>By\s+([^<]+)<\/span>/i);
                if (authorMatch) {
                    authorDateText = authorMatch[0].replace(/<[^>]*>/g, '').trim();
                }
            }
            
            headerArt = `
        <header class="article-header scroll-reveal">
          <span class="article-meta">${catText} • ${authorDateText}</span>
          <h1>${titleText}</h1>
        </header>`;
        }

        // 2. Find the main image
        const imgMatch = mainInner.match(/<img[^>]*class="[^"]*(?:main-img|featured-image)[^"]*"[^>]*>/i);
        let mainImg = '';
        if (imgMatch) {
            mainImg = imgMatch[0];
            // Ensure class has "main-img scroll-reveal"
            mainImg = mainImg.replace(/class="[^"]*"/i, 'class="main-img scroll-reveal"');
        }

        // 3. Find the main article content (excluding headers/images/sidebars)
        const articleContentMatch = mainInner.match(/<article[^>]*class="[^"]*article-content[^"]*"[^>]*>([\s\S]*?)<\/article>/i);
        let articleBodyText = '';
        if (articleContentMatch) {
            articleBodyText = articleContentMatch[1];
        } else {
            articleBodyText = mainInner.replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, '')
                                      .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
                                      .replace(/<img[^>]*class="[^"]*(?:main-img|featured-image)[^"]*"[^>]*>/gi, '');
        }

        // Strip existing callouts first to avoid duplicates or messy formatting
        articleBodyText = articleBodyText.replace(/<div class="shop-callout[^"]*"[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi, '');
        articleBodyText = articleBodyText.replace(/<div class="shop-callout[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');

        // Now, clean up paragraphs and inject the fresh shop callouts
        const paragraphs = articleBodyText.split(/<\/p>/i);
        const totalParas = paragraphs.length - 1;

        let newArticleBodyText = '';
        if (totalParas > 5) {
            const interval = Math.max(1, Math.floor(totalParas / 6));
            let calloutIndex = 0;
            for (let pIdx = 0; pIdx < paragraphs.length; pIdx++) {
                let pText = paragraphs[pIdx].trim();
                if (pText) {
                    newArticleBodyText += pText + '</p>';
                    if (pIdx > 0 && pIdx % interval === 0 && calloutIndex < 6) {
                        newArticleBodyText += affiliateCallouts[calloutIndex];
                        calloutIndex++;
                    }
                }
            }
        } else {
            let calloutIndex = 0;
            for (let pIdx = 0; pIdx < paragraphs.length; pIdx++) {
                let pText = paragraphs[pIdx].trim();
                if (pText) {
                    newArticleBodyText += pText + '</p>';
                    if (calloutIndex < 6) {
                        newArticleBodyText += affiliateCallouts[calloutIndex];
                        calloutIndex++;
                    }
                }
            }
        }

        // 4. Extract Sidebar Content
        const sidebarMatch = mainInner.match(/<aside[^>]*class="[^"]*sidebar[^"]*"[^>]*>([\s\S]*?)<\/aside>/i);
        let sidebarContent = '';
        if (sidebarMatch) {
            sidebarContent = sidebarMatch[1];
        } else {
            sidebarContent = `
            <div class="sidebar-widget">
                <h3 class="widget-title">The Editor</h3>
                <div style="text-align: center;">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400" alt="Sarah" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 1.5rem; display: block; margin-left: auto; margin-right: auto;">
                    <p style="font-size: 0.9rem; font-style: italic; color: var(--text-light);">"Real skincare starts with honesty. I'm here to translate the science into routines that work."</p>
                </div>
            </div>`;
        }

        // Reconstruct exact structure:
        // <main class="article-layout container">
        //   <div class="article-body">
        //     <header class="article-header scroll-reveal">
        //       <span class="article-meta">Category • Date • By Author</span>
        //       <h1>Article Title</h1>
        //     </header>
        //     <img src="..." class="main-img scroll-reveal" alt="...">
        //     <div class="article-content scroll-reveal">
        //        <!-- paragraphs and shop-callout cards -->
        //     </div>
        //   </div>
        //   <aside class="sidebar scroll-reveal">
        //     <!-- sidebar widgets -->
        //   </aside>
        // </main>
        
        const rebuiltMain = `
     <main class="article-layout container">
       <div class="article-body">
         ${headerArt}
         ${mainImg}
         <div class="article-content scroll-reveal">
           ${newArticleBodyText}
         </div>
       </div>
       <aside class="sidebar scroll-reveal">
         ${sidebarContent}
       </aside>
     </main>`;

        html = html.replace(/<main[^>]*>[\s\S]*?<\/main>/i, rebuiltMain);
    }

    fs.writeFileSync(filename, html, 'utf8');
    console.log(`Successfully processed and standardized ${filename}`);
}
