const fs = require('fs');

const postsData = [
    { id: 'post1.html', title: "My Evening Wind-Down Routine", category: "rituals", date: "July 01", img: "images/content-pixie-Q0y-1aorvJo-unsplash.webp", excerpt: "How I take the day off and prep my skin for overnight recovery." },
    { id: 'post2.html', title: "My Honest Morning Routine", category: "rituals", date: "June 23", img: "images/skin-improvement.webp", excerpt: "A clinical approach to morning skincare for a protection and hydration." },
    { id: 'post3.html', title: "5 Affordable Products", category: "reviews", date: "July 01", img: "images/featured-image.webp", excerpt: "Clinical results on a budget. Five affordable finds we love." },
    { id: 'post4.html', title: "Peptides Explained", category: "science", date: "July 05", img: "images/kalos-skincare-kzjH8CCWAD0-unsplash.webp", excerpt: "A clinical breakdown of how peptides communicate with skin cells." },
    { id: 'post5.html', title: "Nightly Rituals", category: "rituals", date: "July 10", img: "images/ibnu-ihza-QbHwPe1HE84-unsplash.webp", excerpt: "Maximize your skin's repair phase with the ultimate nightly ritual." },
    { id: 'post6.html', title: "The Sunscreen Truth", category: "science", date: "July 11", img: "images/content-pixie-Q0y-1aorvJo-unsplash.webp", excerpt: "Everything you need to know about SPF stability and protection." },
    { id: 'post7.html', title: "The Truth About Eye Creams", category: "reviews", date: "June 17", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200", excerpt: "Are eye creams a true must-have or just an expensive moisturizer?" },
    { id: 'post8.html', title: "Evening Wind-Down Routine", category: "rituals", date: "July 01", img: "images/content-pixie-Q0y-1aorvJo-unsplash.webp", excerpt: "Prep my skin for overnight recovery with a simple 5-step routine." }
];

const progressBarStyle = `
        /* Reading Progress Bar */
        #reading-progress { position: fixed; top: 0; left: 0; width: 0%; height: 4px; background: var(--primary); z-index: 2000; transition: width 0.1s ease; }
`;

const relatedPostsStyle = `
        /* Related Posts Section */
        .related-posts { max-width: 1300px; margin: 6rem auto; padding: 0 5%; border-top: 1px solid var(--border); padding-top: 4rem; }
        .related-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; }
        .related-header h3 { font-size: 2rem; color: var(--primary); margin: 0; }
        .related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        @media (max-width: 900px) { .related-grid { grid-template-columns: 1fr; } }
`;

const progressBarHtml = `    <div id="reading-progress"></div>\n`;

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

for (let i = 1; i <= 8; i++) {
    const fileName = `post${i}.html`;
    if (!fs.existsSync(fileName)) continue;

    let content = fs.readFileSync(fileName, 'utf8');
    const currentPost = postsData.find(p => p.id === fileName);
    if (!currentPost) continue;

    // 1. Add Styles
    content = content.replace('</style>', `${progressBarStyle}${relatedPostsStyle}\n    </style>`);

    // 2. Add Progress Bar Div
    content = content.replace('<body>', `<body>\n${progressBarHtml}`);

    // 3. Construct Related Posts HTML
    const related = postsData
        .filter(p => p.category === currentPost.category && p.id !== fileName)
        .slice(0, 3);
    
    let relatedHtml = `
    <section class="related-posts scroll-reveal">
        <div class="related-header">
            <h3>You Might Also Like</h3>
            <a href="blog.html" class="shop-btn" style="background: transparent; color: var(--primary); padding: 0; border-bottom: 2px solid var(--highlight);">View All Stories</a>
        </div>
        <div class="related-grid">
    `;

    related.forEach(p => {
        relatedHtml += `
            <article class="post-card" style="display: flex; flex-direction: column;">
                <a href="${p.id}" style="display: block; overflow: hidden; border-radius: 8px; margin-bottom: 1.5rem;">
                    <img src="${p.img}" alt="${p.title}" style="width: 100%; height: 200px; object-fit: cover;">
                </a>
                <div class="post-content">
                    <span class="shop-btn" style="font-size: 0.6rem; padding: 2px 8px; border: 1px solid var(--border); display: inline-block; margin-bottom: 0.5rem; border-radius: 20px;">${p.category.toUpperCase()}</span>
                    <h4 style="font-family: 'Playfair Display', serif; font-size: 1.2rem; margin: 0.5rem 0 1rem; color: var(--primary);">${p.title}</h4>
                    <a href="${p.id}" class="shop-btn" style="background: transparent; color: var(--secondary); padding: 0; border-bottom: 1px solid var(--secondary);">Read Article</a>
                </div>
            </article>
        `;
    });

    relatedHtml += `
        </div>
    </section>
    `;

    // 4. Inject Related Posts before Footer
    content = content.replace('<footer>', `${relatedHtml}\n    <footer>`);

    // 5. Add Script
    content = content.replace('</body>', `${progressScript}\n</body>`);

    fs.writeFileSync(fileName, content);
    console.log(`Updated ${fileName} with interactive features.`);
}
