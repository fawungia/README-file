/* ==========================================================================
   SkinHonestly build.js
   Regenerates every post*.html page from posts_data.json using the
   canonical partials in /partials. This is the ONLY script that should
   ever touch post pages going forward — do not write a new one-off
   "fix" script. Add a new post by adding an entry to posts_data.json,
   then run: node build.js

   Requires: posts_data.json, partials/header.html, partials/footer.html,
   styles.css, script.js all present in the same directory.
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const posts = JSON.parse(fs.readFileSync(path.join(ROOT, 'posts_data.json'), 'utf8'));
const header = fs.readFileSync(path.join(ROOT, 'partials', 'header.html'), 'utf8').trim();
const footer = fs.readFileSync(path.join(ROOT, 'partials', 'footer.html'), 'utf8').trim();

const DOMAIN_VERIFY = '614a5afefa741fa072c6f9319d2f14d0';
const GA_ID = 'G-33SX49MXHN';
const KLAVIYO_LIST_ID = 'RiVwwC';
const SITE_URL = 'https://skinhonestlyco.com';

function buildRelated(post) {
    let related = posts.filter(p => p.category === post.category && p.id !== post.id);
    if (related.length < 3) {
        const others = posts.filter(p => p.category !== post.category && p.id !== post.id);
        related = [...related, ...others].slice(0, 3);
    } else {
        related = related.slice(0, 3);
    }

    const cards = related.map(p => `
            <a href="${p.id}" class="post-card">
                <img src="${p.img}" alt="${p.title}">
                <div class="post-content">
                    <span class="post-meta">${p.category} • ${p.date}</span>
                    <h4 class="post-title">${p.title}</h4>
                    <span class="btn-read">Read Article</span>
                </div>
            </a>`).join('');

    return `
    <section class="related-posts">
        <div class="related-header">
            <h3>You Might Also Like</h3>
            <a href="blog.html" class="btn-read">View All Stories</a>
        </div>
        <div class="related-grid">${cards}
        </div>
    </section>`;
}

function buildPage(post) {
    const catSlug = post.category.toLowerCase();
    const pageUrl = `${SITE_URL}/${post.id}`;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        author: { '@type': 'Organization', name: 'SkinHonestly' },
        publisher: { '@type': 'Organization', name: 'SkinHonestly' },
        image: post.img.startsWith('http') ? post.img : `${SITE_URL}/${post.img}`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl }
    };

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>${post.title} | SkinHonestly Journal</title>
    <meta name="description" content="${post.excerpt}">
    <meta name="p:domain_verify" content="${DOMAIN_VERIFY}"/>
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>

    <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}');
    </script>

    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="reading-progress"></div>
    ${header}

    <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="index.html">Home</a>
        <span class="sep">/</span>
        <a href="blog.html?cat=${catSlug}">The Journal</a>
        <span class="sep">/</span>
        <span class="current">${post.title}</span>
    </nav>

    <main class="article-layout">
        <div class="article-body">
            <header class="article-header">
                <span class="cat-tag">${post.category} • SKINHONESTLY</span>
                <h1>${post.title}</h1>
                <div class="article-meta">
                    <span>By Editor • ${post.date}</span>
                    <span>5 Min Read</span>
                </div>
            </header>

            <img src="${post.img}" alt="${post.title}" class="main-img">

            <article class="article-content">
                ${post.content}
            </article>
        </div>

        <aside class="sidebar">
            <div class="sidebar-widget">
                <h3 class="widget-title">The Editor</h3>
                <div style="text-align: center;">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400" alt="Sarah" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 1.5rem; border: 1px solid var(--border); display: block; margin-left: auto; margin-right: auto;">
                    <p style="font-size: 0.9rem; font-style: italic; color: var(--text-light);">"Real skincare starts with honesty. I'm here to find what actually works."</p>
                </div>
            </div>

            <div class="sidebar-widget">
                <h3 class="widget-title">Shop This Post</h3>
                ${post.shopItems}
            </div>
        </aside>
    </main>

    <section class="newsletter-cta">
        <h2>Join The Glow List</h2>
        <p>Get exclusive clinical research and early access to drops.</p>
        <form action="https://manage.kmail-lists.com/subscriptions/subscribe" method="POST" target="_blank" class="newsletter-form">
            <input type="hidden" name="g" value="${KLAVIYO_LIST_ID}">
            <input type="email" name="email" placeholder="Your email address" required>
            <button type="submit">Subscribe</button>
        </form>
    </section>
    ${buildRelated(post)}

    ${footer}

    <script src="script.js"></script>
</body>
</html>
`;
}

posts.forEach(post => {
    const outPath = path.join(ROOT, post.id);
    fs.writeFileSync(outPath, buildPage(post));
    console.log('BUILT: ' + post.id);
});

console.log(`\nDone. ${posts.length} post pages regenerated from posts_data.json.`);
console.log('To add a new post: add an entry to posts_data.json, then run `node build.js` again.');
