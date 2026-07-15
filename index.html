/* ==========================================================================
   SkinHonestly build_index.js
   Regenerates the dynamic parts of index.html (hero cover story, "Latest
   From The Lab" feed, trending sidebar) from posts_data.json. Run this any
   time posts_data.json changes, alongside build.js and build_blog.js.

   Does NOT touch index.html's header, footer, brand-philosophy section,
   or the "Editor's Essentials" shop row (that's product catalog, not
   post data — unrelated to posts_data.json).
   ========================================================================== */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const posts = JSON.parse(fs.readFileSync(path.join(ROOT, 'posts_data.json'), 'utf8'));

const MONTHS = { January:0, February:1, March:2, April:3, May:4, June:5, July:6, August:7, September:8, October:9, November:10, December:11 };
function parseDate(str) {
    const m = str.match(/([A-Za-z]+)\s+(\d+)/);
    if (!m) return new Date(0);
    return new Date(2026, MONTHS[m[1]], parseInt(m[2], 10));
}

const sortedByDate = [...posts].sort((a, b) => parseDate(b.date) - parseDate(a.date));

// Non-overlapping picks: hero = most recent, feed = next 4, trending = next 3 after that
const hero = sortedByDate[0];
const feedPosts = sortedByDate.slice(1, 5);
const trendingPosts = sortedByDate.slice(5, 8);

// --- 1. Hero cover story ---
const heroBlock = `    <section class="hero-cover">
        <div class="hero-inner">
            <div class="hero-text">
                <span class="stagger-item">Volume 01 • Exclusive Feature</span>
                <h1 class="stagger-item">${hero.title}</h1>
                <p class="stagger-item">${hero.excerpt}</p>
                <a href="${hero.id}" class="btn-editorial stagger-item">Read Feature Story</a>
            </div>
            <img src="${hero.img}" alt="${hero.title}" class="hero-image">
        </div>
    </section>`;

// --- 2. "Latest From The Lab" article feed (4 cards) ---
function articleCard(post) {
    return `
            <article class="article-card card-lift scroll-reveal">
                <img src="${post.img}" alt="${post.title}">
                <div class="article-content">
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <a href="${post.id}" class="link-more">Read Story</a>
                </div>
            </article>`;
}
const feedHtml = feedPosts.map(articleCard).join('\n');

// --- 3. Trending sidebar (3 rows) ---
function trendingRow(post, index) {
    const catLabel = post.category.charAt(0) + post.category.slice(1).toLowerCase();
    return `
                <a href="${post.id}" class="trending-row">
                    <span>0${index + 1} • ${catLabel}</span>
                    <h4>${post.title}</h4>
                </a>`;
}
const trendingHtml = trendingPosts.map(trendingRow).join('');

// --- Apply replacements to index.html ---
let content = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

content = content.replace(/<section class="hero-cover">[\s\S]*?<\/section>/, heroBlock);

content = content.replace(
    /(<h2 class="section-title scroll-reveal">Latest From The Lab<\/h2>)([\s\S]*?)(\s*<\/section>\s*<!-- EDITORIAL SIDEBAR -->)/,
    `$1\n${feedHtml}\n        $3`
);

content = content.replace(
    /(<h3 class="widget-h">Trending Stories<\/h3>)([\s\S]*?)(\s*<\/div>\s*\n\s*<div class="sidebar-widget scroll-reveal" style="padding: 2\.5rem)/,
    `$1${trendingHtml}\n            $3`
);

fs.writeFileSync(path.join(ROOT, 'index.html'), content);
console.log(`index.html rebuilt: hero=${hero.id}, feed=[${feedPosts.map(p=>p.id).join(', ')}], trending=[${trendingPosts.map(p=>p.id).join(', ')}]`);
