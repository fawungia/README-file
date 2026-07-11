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

postsData.forEach(p => {
    const fileName = p.id;
    if (!fs.existsSync(fileName)) return;
    
    let content = fs.readFileSync(fileName, 'utf8');

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
        relatedHtml += '            <article class="post-card">\n                <a href="' + rp.id + '" style="display: block; overflow: hidden; border-radius: 8px; margin-bottom: 1.5rem;">\n                    <img src="' + rp.img + '" alt="' + rp.title + '">\n                </a>\n                <div class="post-content">\n                    <span class="post-meta">' + rp.category.toUpperCase() + ' • ' + rp.date + '</span>\n                    <h4 class="post-title">' + rp.title + '</h4>\n                    <a href="' + rp.id + '" class="btn-read">Read Article</a>\n                </div>\n            </article>\n';
    });
    relatedHtml += '        </div>\n    </section>\n';

    // 2. Clean previous sections
    content = content.replace(/<section class="related-posts">[\s\S]*?<\/section>/gi, '');
    content = content.replace(/<section class="related-posts scroll-reveal">[\s\S]*?<\/section>/gi, '');
    
    // 3. Inject new section before footer
    content = content.replace('<footer>', relatedHtml + '    <footer>');

    // 4. Ensure Progress Bar exists
    if (!content.includes('id="reading-progress"')) {
        content = content.replace('<body>', '<body>\n    <div id="reading-progress"></div>');
    }

    // 5. Ensure styles exist (using simpler CSS injection)
    if (!content.includes('#reading-progress {')) {
        const styles = '\n        /* Task 1 Improvements */\n        #reading-progress { position: fixed; top: 80px; left: 0; width: 0%; height: 4px; background: var(--primary); z-index: 2001; transition: width 0.1s ease; }\n        .related-posts { max-width: 1300px; margin: 6rem auto; padding: 4rem 5% 0; border-top: 1px solid var(--border); }\n        .related-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; }\n        .related-header h3 { font-size: 2.2rem; color: var(--primary); margin: 0; font-family: "Playfair Display", serif; }\n        .related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; }\n        .post-card { display: flex; flex-direction: column; transition: transform 0.3s ease; }\n        .post-card:hover { transform: translateY(-5px); }\n        .post-card img { width: 100%; height: 250px; object-fit: cover; border-radius: 8px; margin-bottom: 1.5rem; }\n        .post-meta { font-size: 0.7rem; text-transform: uppercase; font-weight: 700; color: var(--secondary); margin-bottom: 0.5rem; letter-spacing: 1px; }\n        .post-title { font-size: 1.4rem; color: var(--primary); margin-bottom: 1rem; line-height: 1.3; font-family: "Playfair Display", serif; }\n        .btn-read { font-weight: bold; text-transform: uppercase; font-size: 0.75rem; border-bottom: 2px solid var(--highlight); padding-bottom: 3px; color: var(--text); text-decoration: none; }\n        @media (max-width: 900px) { .related-grid { grid-template-columns: 1fr; } }\n';
        content = content.replace('</style>', styles + '    </style>');
    }

    fs.writeFileSync(fileName, content);
    console.log("RE-RE-FIXED: " + fileName);
});
