/* ==========================================================================
   SkinHonestly build_blog.js
   Regenerates the dynamic parts of blog.html (post grid, hero rotator data,
   trending sidebar) from posts_data.json — the same source of truth used
   by build.js for the post pages themselves. Run this any time
   posts_data.json changes, right alongside `node build.js`.

   This does NOT touch blog.html's header, footer, or hero/filter markup
   structure — only the sections that must stay in sync with the posts.
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const posts = JSON.parse(fs.readFileSync(path.join(ROOT, 'posts_data.json'), 'utf8'));

// --- Parse "July 14" style dates (assumes current content year) for sorting ---
const MONTHS = { January:0, February:1, March:2, April:3, May:4, June:5, July:6, August:7, September:8, October:9, November:10, December:11 };
function parseDate(str) {
    const m = str.match(/([A-Za-z]+)\s+(\d+)/);
    if (!m) return new Date(0);
    const month = MONTHS[m[1]];
    return new Date(2026, month, parseInt(m[2], 10));
}

const sortedByDate = [...posts].sort((a, b) => parseDate(b.date) - parseDate(a.date));

function titleCase(cat) {
    return cat.charAt(0) + cat.slice(1).toLowerCase();
}

// --- 1. Build the post-card grid (all posts, most recent first) ---
function buildPostCard(post) {
    const catSlug = post.category.toLowerCase();
    return `
            <article class="post-card card-lift scroll-reveal" data-category="${catSlug}">
                <a href="${post.id}" style="display: block; overflow: hidden; border-radius: 8px; margin-bottom: 1.5rem;">
                    <img src="${post.img}" alt="${post.title}">
                </a>
                <div class="post-content">
                    <span class="post-meta">${titleCase(post.category)} • ${post.date}</span>
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <a href="${post.id}" class="btn-read">Read Article</a>
                </div>
            </article>`;
}

const gridHtml = sortedByDate.map(buildPostCard).join('\n');

// --- 2. Build heroData: "all" = most recent post overall, one per category = most recent in that category ---
function heroEntry(post, badge) {
    return `{
                badge: "${badge}",
                title: "${post.title.replace(/"/g, '\\"')}",
                text: "${post.excerpt.replace(/"/g, '\\"')}",
                img: "${post.img}",
                link: "${post.id}"
            }`;
}

const categoryBadges = { BARRIER: 'Barrier Health', RITUALS: 'Morning Rituals', SCIENCE: 'Ingredient Science', REVIEWS: 'Derm Reviews' };
const categories = ['BARRIER', 'RITUALS', 'SCIENCE', 'REVIEWS'];

const heroParts = [`'all': ${heroEntry(sortedByDate[0], "Editor's Highlight")}`];
categories.forEach(cat => {
    const best = sortedByDate.find(p => p.category === cat);
    if (best) heroParts.push(`'${cat.toLowerCase()}': ${heroEntry(best, categoryBadges[cat])}`);
});
const heroDataJs = `        const heroData = {\n            ${heroParts.join(',\n            ')}\n        };`;

// --- 3. Build trending sidebar (3 most recent posts, excluding whichever is the "all" hero) ---
const trending = sortedByDate.filter(p => p.id !== sortedByDate[0].id).slice(0, 3);
const trendingHtml = trending.map(p => `
                <a href="${p.id}" class="trending-row">
                    <img src="${p.img}" alt="${p.title}">
                    <h5>${p.title}</h5>
                </a>`).join('');

// --- Apply all three replacements to blog.html ---
let content = fs.readFileSync(path.join(ROOT, 'blog.html'), 'utf8');

// Replace the post grid: everything between <section class="article-feed"> and the pagination div
content = content.replace(
    /(<section class="article-feed">)([\s\S]*?)(\s*<div class="pagination)/,
    `$1\n${gridHtml}\n$3`
);

// Replace the initial (non-JS, first-paint) hero content to match heroData.all
const allHero = sortedByDate[0];
content = content.replace(/<img id="hero-img" src=".*?" alt=".*?">/, `<img id="hero-img" src="${allHero.img}" alt="${allHero.title}">`);
content = content.replace(/<span id="hero-badge" class="badge">.*?<\/span>/, `<span id="hero-badge" class="badge">Editor's Highlight</span>`);
content = content.replace(/<h2 id="hero-title">.*?<\/h2>/, `<h2 id="hero-title">${allHero.title}</h2>`);
content = content.replace(/<p id="hero-text">.*?<\/p>/, `<p id="hero-text">${allHero.excerpt}</p>`);
content = content.replace(/<a id="hero-link" href=".*?" class="btn-read">/, `<a id="hero-link" href="${allHero.id}" class="btn-read">`);

// Replace heroData JS object
content = content.replace(/const heroData = \{[\s\S]*?\n\s*\};/, heroDataJs);

// Replace trending sidebar: everything between "Most Popular Now" heading and the closing </div> of that widget
content = content.replace(
    /(<h3 class="widget-title">Most Popular Now<\/h3>)([\s\S]*?)(\n\s*<\/div>\s*\n\s*<div class="widget scroll-reveal" style="background: var\(--primary\))/,
    `$1${trendingHtml}\n            $3`
);

// Wire up the ?cat= URL param so the header dropdown links actually filter on load (previously dead)
if (!content.includes('URLSearchParams')) {
    content = content.replace(
        '</script>\n</body>',
        `\n        // Apply the ?cat= filter on page load so links from the header dropdown\n        // (e.g. blog.html?cat=rituals) actually filter, instead of doing nothing.\n        document.addEventListener('DOMContentLoaded', () => {\n            const params = new URLSearchParams(window.location.search);\n            const cat = params.get('cat');\n            if (cat && cat !== 'all') filterPosts(cat, null);\n        });\n    </script>\n</body>`
    );
}

fs.writeFileSync(path.join(ROOT, 'blog.html'), content);
console.log(`blog.html rebuilt: ${posts.length} post cards, hero + trending synced from posts_data.json, ?cat= filter wired up.`);
