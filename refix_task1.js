const fs = require('fs');

const postsData = [
    { id: 'post1.html', title: "My Evening Wind-Down Routine", category: "barrier", date: "July 01", img: "images/content-pixie-Q0y-1aorvJo-unsplash.webp", excerpt: "How I take the day off and prep my skin for overnight recovery to wake up with a balanced glow." },
    { id: 'post2.html', title: "My Honest Morning Routine", category: "rituals", date: "June 23", img: "images/poko-skincare-oXI2_S1ILQI-unsplash.webp", excerpt: "I’ve finally nailed down a routine that keeps my skin hydrated and glowing without feeling heavy." },
    { id: 'post3.html', title: "5 Affordable Skincare Products", category: "reviews", date: "June 22", img: "images/ibnu-ihza-QbHwPe1HE84-unsplash.webp", excerpt: "You don’t need to spend a fortune to get great skin. These budget-friendly finds have earned their spot." },
    { id: 'post4.html', title: "Peptides Explained", category: "science", date: "June 21", img: "images/plantadea-zSD0OWrbtlw-unsplash.webp", excerpt: "They’re the buzziest ingredient right now, but what do peptides actually do? Let's break down the science." },
    { id: 'post5.html', title: "Gentle Exfoliation", category: "rituals", date: "June 20", img: "images/young-lady-pointing-phone-sign-white-bathrobe-towel-looking-pleased-front-view.webp", excerpt: "Here’s what happened when I put down the strong peels and switched to a kinder, more effective approach." },
    { id: 'post6.html', title: "Skin Barrier 101", category: "barrier", date: "June 19", img: "images/christian-agbede-TqmyIxQpo5s-unsplash.webp", excerpt: "Understand why the skin barrier is the most important factor in your routine and how to fix a compromised one." },
    { id: 'post7.html', title: "The Truth About Eye Creams", category: "reviews", date: "June 17", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200", excerpt: "Are eye creams a true must-have or just an expensive moisturizer? Let's look at the facts." },
    { id: 'post8.html', title: "Evening Wind-Down Routine", category: "barrier", date: "July 01", img: "images/content-pixie-Q0y-1aorvJo-unsplash.webp", excerpt: "Prep my skin for overnight recovery with a simple 5-step routine that actually works." },
    { id: 'post9.html', title: "The Science of Hyaluronic Acid", category: "science", date: "July 05", img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1200", excerpt: "Is HA really the hydration hero it's claimed to be? Let's look at the molecular science behind this ingredient." },
    { id: 'post10.html', title: "Retinol for Beginners", category: "reviews", date: "July 10", img: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1200", excerpt: "The clinical guide to introducing retinoids without destroying your barrier. Start your retinol journey safely." }
];

const sharedStyles = `
        /* Interactive Enhancements */
        #reading-progress { position: fixed; top: 80px; left: 0; width: 0%; height: 4px; background: var(--primary); z-index: 2001; transition: width 0.1s ease; }
        
        .related-posts { max-width: 1300px; margin: 6rem auto; padding: 4rem 5% 0; border-top: 1px solid var(--border); }
        .related-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; }
        .related-header h3 { font-size: 2.2rem; color: var(--primary); margin: 0; font-family: 'Playfair Display', serif; }
        
        .related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; }
        .post-card { display: flex; flex-direction: column; transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .post-card:hover { transform: translateY(-5px); }
        .post-card img { width: 100%; height: 250px; object-fit: cover; border-radius: 8px; margin-bottom: 1.5rem; transition: opacity 0.3s ease; }
        .post-card:hover img { opacity: 0.9; }
        .post-meta { font-size: 0.7rem; text-transform: uppercase; font-weight: 700; color: var(--secondary); margin-bottom: 0.5rem; letter-spacing: 1px; }
        .post-title { font-size: 1.4rem; color: var(--primary); margin-bottom: 1rem; line-height: 1.3; font-family: 'Playfair Display', serif; }
        .post-excerpt { font-size: 0.9rem; color: var(--text-light); margin-bottom: 1.5rem; line-height: 1.5; }
        .btn-read { font-weight: bold; text-transform: uppercase; font-size: 0.75rem; border-bottom: 2px solid var(--highlight); padding-bottom: 3px; color: var(--text); text-decoration: none; transition: all 0.3s ease; }
        .btn-read:hover { color: var(--primary); border-color: var(--primary); }
        
        @media (max-width: 900px) { .related-grid { grid-template-columns: 1fr; } }
`;

const progressScript = `
    <script>
        // Progress Bar Logic
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
    const fileName = "post" + i + ".html";
    if (!fs.existsSync(fileName)) continue;

    let html = fs.readFileSync(fileName, 'utf8');
    const currentPost = postsData.find(p => p.id === fileName);
    if (!currentPost) continue;

    // CLEANUP ALL PREVIOUS ATTEMPTS (regex for various snippets)
    html = html.replace(/\/\* Reading Progress Bar [\s\S]*?transition: width 0\.1s ease; \}/gi, '');
    html = html.replace(/\/\* Related Posts Section [\s\S]*?@media \(max-width: 900px\) \{ \.related-grid \{ grid-template-columns: 1fr; \} \}/gi, '');
    html = html.replace(/\/\* Interactive Enhancements \*\/[\s\S]*?@media \(max-width: 900px\) \{ \.related-grid \{ grid-template-columns: 1fr; \} \}/gi, '');
    html = html.replace(/<div id="reading-progress"><\/div>/gi, '');
    html = html.replace(/<section class="related-posts">[\s\S]*?<\/section>/gi, '');
    html = html.replace(/<section class="related-posts scroll-reveal">[\s\S]*?<\/section>/gi, '');
    html = html.replace(/<script>\s*\/\/ Reading Progress Bar Logic[\s\S]*?<\/script>/gi, '');
    html = html.replace(/<script>\s*\/\/ Progress Bar Logic[\s\S]*?<\/script>/gi, '');

    // 1. Inject CSS
    html = html.replace("</style>", sharedStyles + "\n    </style>");

    // 2. Inject Progress Bar Div
    html = html.replace("<body>", "<body>\n    <div id=\"reading-progress\"></div>");

    // 3. Build Related Posts HTML (matching blog.html structure exactly)
    let related = postsData.filter(p => p.category === currentPost.category && p.id !== fileName);
    if (related.length < 3) {
        // Fill with random other posts if not enough in same category
        const others = postsData.filter(p => p.category !== currentPost.category && p.id !== fileName);
        related = [...related, ...others].slice(0, 3);
    } else {
        related = related.slice(0, 3);
    }

    let relatedHtml = "\n    <section class=\"related-posts\">\n        <div class=\"related-header\">\n            <h3>You Might Also Like</h3>\n            <a href=\"blog.html\" class=\"btn-read\">View All Stories</a>\n        </div>\n        <div class=\"related-grid\">\n";

    related.forEach(p => {
        relatedHtml += "            <article class=\"post-card\">\n                <a href=\"" + p.id + "\" style=\"display: block; overflow: hidden; border-radius: 8px; margin-bottom: 1.5rem;\">\n                    <img src=\"" + p.img + "\" alt=\"" + p.title + "\">\n                </a>\n                <div class=\"post-content\">\n                    <span class=\"post-meta\">" + p.category.toUpperCase() + " • " + p.date + "</span>\n                    <h4 class=\"post-title\">" + p.title + "</h4>\n                    <p class=\"post-excerpt\">" + p.excerpt + "</p>\n                    <a href=\"" + p.id + "\" class=\"btn-read\">Read Article</a>\n                </div>\n            </article>\n";
    });
    relatedHtml += "        </div>\n    </section>\n";

    // 4. Inject Section before Footer
    html = html.replace("<footer>", relatedHtml + "    <footer>");

    // 5. Inject Script
    html = html.replace("</body>", progressScript + "</body>");

    fs.writeFileSync(fileName, html);
    console.log("RE-FIXED: " + fileName);
}
