const fs = require('fs');

const postsData = [
    { id: 'post1.html', title: "My Evening Wind-Down Routine", category: "barrier", date: "July 01", img: "images/content-pixie-Q0y-1aorvJo-unsplash.webp", excerpt: "How I take the day off and prep my skin for overnight recovery." },
    { id: 'post2.html', title: "My Honest Morning Routine", category: "rituals", date: "June 23", img: "images/skin-improvement.webp", excerpt: "A clinical approach to morning skincare for protection and hydration." },
    { id: 'post3.html', title: "5 Affordable Products", category: "reviews", date: "July 01", img: "images/featured-image.webp", excerpt: "Clinical results on a budget. Five affordable finds we love." },
    { id: 'post4.html', title: "Peptides Explained", category: "science", date: "July 05", img: "images/kalos-skincare-kzjH8CCWAD0-unsplash.webp", excerpt: "A clinical breakdown of how peptides communicate with skin cells." },
    { id: 'post5.html', title: "Gentle Exfoliation", category: "rituals", date: "June 20", img: "images/young-lady-pointing-phone-sign-white-bathrobe-towel-looking-pleased-front-view.webp", excerpt: "Here’s what happened when I put down the strong peels." },
    { id: 'post6.html', title: "Skin Barrier 101", category: "barrier", date: "June 19", img: "images/christian-agbede-TqmyIxQpo5s-unsplash.webp", excerpt: "Understand why the skin barrier is the most important factor." },
    { id: 'post7.html', title: "The Truth About Eye Creams", category: "reviews", date: "June 17", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200", excerpt: "Are eye creams a true must-have or just an expensive moisturizer?" },
    { id: 'post8.html', title: "Evening Wind-Down Routine", category: "barrier", date: "July 01", img: "images/content-pixie-Q0y-1aorvJo-unsplash.webp", excerpt: "Prep my skin for overnight recovery with a simple 5-step routine." },
    { id: 'post9.html', title: "The Science of Hyaluronic Acid", category: "science", date: "July 05", img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1200", excerpt: "Is HA really the hydration hero it's claimed to be?" },
    { id: 'post10.html', title: "Retinol for Beginners", category: "reviews", date: "July 10", img: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1200", excerpt: "The clinical guide to introducing retinoids safely." }
];

const progressBarStyle = `
        /* Reading Progress Bar (Fixed just below sticky header) */
        #reading-progress { position: fixed; top: 80px; left: 0; width: 0%; height: 4px; background: var(--primary); z-index: 1001; transition: width 0.1s ease; }
`;

const relatedPostsStyle = `
        /* Related Posts Section (Reusing blog.html styles) */
        .related-posts { max-width: 1300px; margin: 6rem auto; padding: 4rem 5% 0; border-top: 1px solid var(--border); }
        .related-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; }
        .related-header h3 { font-size: 2.2rem; color: var(--primary); margin: 0; }
        .related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; }
        .post-card { display: flex; flex-direction: column; transition: transform 0.3s ease; }
        .post-card:hover { transform: translateY(-5px); }
        .post-card img { width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1.5rem; }
        .post-meta { font-size: 0.7rem; text-transform: uppercase; font-weight: 700; color: var(--secondary); margin-bottom: 0.5rem; letter-spacing: 1px; }
        .post-title { font-size: 1.3rem; color: var(--primary); margin-bottom: 1rem; line-height: 1.3; }
        .btn-read { font-weight: bold; text-transform: uppercase; font-size: 0.75rem; border-bottom: 2px solid var(--highlight); padding-bottom: 3px; color: var(--text); }
        @media (max-width: 900px) { .related-grid { grid-template-columns: 1fr; } }
`;

const progressBarHtml = '    <div id="reading-progress"></div>\n';

const progressScript = `
    <script>
        // Reading Progress Bar Logic
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            const bar = document.getElementById('reading-progress');
            if(bar) bar.style.width = scrolled + "%";
        });
    </script>
`;

for (let i = 1; i <= 10; i++) {
    const fileName = 'post' + i + '.html';
    if (!fs.existsSync(fileName)) continue;

    let content = fs.readFileSync(fileName, 'utf8');
    const currentPost = postsData.find(p => p.id === fileName);
    if (!currentPost) continue;

    // Clean up previous attempts (all patterns from Turn 9 and earlier)
    content = content.replace(/\/\* Reading Progress Bar [\s\S]*?#reading-progress \{[\s\S]*?\}\n/, '');
    content = content.replace(/\/\* Related Posts Section [\s\S]*?\.related-posts \{[\s\S]*?\}\n/, '');
    content = content.replace(/\/\* Reading Progress Bar \(Fixed just below sticky header\) [\s\S]*?#reading-progress \{[\s\S]*?\}\n/, '');
    content = content.replace(/\/\* Related Posts Section \(Reusing blog\.html styles\) [\s\S]*?@media \(max-width: 900px\) \{ \.related-grid \{ grid-template-columns: 1fr; \} \}\n/, '');
    content = content.replace(/<div id="reading-progress"><\/div>\n/, '');
    content = content.replace(/<section class="related-posts[\s\S]*?<\/section>\s+/gi, '');
    content = content.replace(/<script>\s*\/\/ Reading Progress Bar Logic[\s\S]*?<\/script>\s+/gi, '');

    // 1. Add Styles
    content = content.replace('</style>', progressBarStyle + relatedPostsStyle + '\n    </style>');

    // 2. Add Progress Bar Div
    content = content.replace('<body>', '<body>\n' + progressBarHtml);

    // 3. Construct Related Posts HTML
    const related = postsData
        .filter(p => p.category === currentPost.category && p.id !== fileName)
        .slice(0, 3);
    
    let relatedHtml = '\n    <section class="related-posts">\n        <div class="related-header">\n            <h3>You Might Also Like</h3>\n            <a href="blog.html" class="btn-read">View All Stories</a>\n        </div>\n        <div class="related-grid">\n';

    related.forEach(p => {
        relatedHtml += '            <article class="post-card">\n                <a href="' + p.id + '" style="display: block; overflow: hidden; border-radius: 8px;">\n                    <img src="' + p.img + '" alt="' + p.title + '">\n                </a>\n                <div class="post-content" style="padding-top: 1.5rem;">\n                    <span class="post-meta">' + p.category.toUpperCase() + ' • ' + p.date + '</span>\n                    <h4 class="post-title">' + p.title + '</h4>\n                    <a href="' + p.id + '" class="btn-read">Read Article</a>\n                </div>\n            </article>\n';
    });

    relatedHtml += '        </div>\n    </section>\n';

    // 4. Inject Related Posts before Footer
    content = content.replace('<footer>', relatedHtml + '\n    <footer>');

    // 5. Add Script
    content = content.replace('</body>', progressScript + '\n</body>');

    fs.writeFileSync(fileName, content);
    console.log('Updated ' + fileName + ' with corrected interactive features.');
}
