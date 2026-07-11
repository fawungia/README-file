const fs = require('fs');

const postsData = JSON.parse(fs.readFileSync('posts_data.json', 'utf8'));

const template = fs.readFileSync('post1.html', 'utf8');

postsData.forEach(p => {
    // We already have a good post1.html, let's use it as a base for others
    // but swap the content
    let html = template;
    
    // swap title
    html = html.replace(/<title>[\s\S]*?<\/title>/i, '<title>' + p.title + '</title>');
    // swap description
    html = html.replace(/<meta name="description" content="[\s\S]*?">/i, '<meta name="description" content="' + p.excerpt + '">');
    // swap headline
    html = html.replace(/<h1>[\s\S]*?<\/h1>/i, '<h1>' + p.title + '</h1>');
    // swap category tag
    html = html.replace(/<span class="cat-tag">[\s\S]*?<\/span>/i, '<span class="cat-tag">' + p.category + ' • SKINHONESTLY</span>');
    // swap meta date
    html = html.replace(/<span>By Editor • [\s\S]*?<\/span>/i, '<span>By Editor • ' + p.date + '</span>');
    // swap main img
    html = html.replace(/<img src="images\/content-pixie-Q0y-1aorvJo-unsplash.webp" alt="Evening Routine" class="main-img">/i, '<img src="' + p.img + '" alt="' + p.title + '" class="main-img">');
    // swap article body
    html = html.replace(/<article class="article-content">[\s\S]*?<\/article>/i, '<article class="article-content">' + p.content + '</article>');
    // swap shop items in sidebar
    html = html.replace(/<h3 class="widget-title">Shop This Post<\/h3>[\s\S]*?<\/div>\s*<\/div>/i, '<h3 class="widget-title">Shop This Post</h3>' + p.shopItems + '</div></div>');

    // 1. Build Related Section (always 3 items)
    let related = postsData.filter(rp => rp.category === p.category && rp.id !== p.id);
    if (related.length < 3) {
        const others = postsData.filter(rp => rp.category !== p.category && rp.id !== p.id);
        related = [...related, ...others].slice(0, 3);
    } else {
        related = related.slice(0, 3);
    }

    let relatedHtml = '\n    <section class="related-posts">\n        <div class="related-header">\n            <h3>You Might Also Like</h3>\n            <a href="blog.html" class="btn-read">View All Stories</a>\n        </div>\n        <div class="related-grid">\n';
    related.forEach(rp => {
        relatedHtml += '            <a href="' + rp.id + '" class="post-card" style="text-decoration: none; color: inherit;">\n                <img src="' + rp.img + '" alt="' + rp.title + '" style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px; margin-bottom: 1.5rem;">\n                <div class="post-content">\n                    <span class="post-meta" style="font-size: 0.7rem; text-transform: uppercase; font-weight: 700; color: var(--secondary); margin-bottom: 0.5rem; letter-spacing: 1px; display: block;">' + rp.category + ' • ' + rp.date + '</span>\n                    <h4 class="post-title" style="font-size: 1.4rem; color: var(--primary); margin-bottom: 1rem; line-height: 1.3; font-family: \'Playfair Display\', serif;">' + rp.title + '</h4>\n                    <span class="btn-read" style="font-weight: bold; text-transform: uppercase; font-size: 0.75rem; border-bottom: 2px solid var(--highlight); padding-bottom: 3px;">Read Article</span>\n                </div>\n            </a>\n';
    });
    relatedHtml += '        </div>\n    </section>\n';

    // replace related section
    html = html.replace(/<section class="related-posts">[\s\S]*?<\/section>/i, relatedHtml);

    fs.writeFileSync(p.id, html);
    console.log("SYNCED: " + p.id);
});
