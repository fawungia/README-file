const fs = require('fs');

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

        /* Dropdown Styles */
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

        @media (max-width: 768px) {
            .menu-toggle { display: block; }
            .nav-links { 
                display: none; flex-direction: column; position: absolute; top: 80px; left: 0; width: 100%; 
                background-color: var(--white); padding: 2rem; border-bottom: 1px solid var(--border); 
                box-shadow: 0 10px 15px rgba(0,0,0,0.05); gap: 1.5rem; z-index: 1001;
            }
            .nav-links.active { display: flex; }
            .nav-dropdown { width: 100%; }
            .dropdown-content { position: static; box-shadow: none; border: none; padding-left: 1rem; display: block; width: 100%; max-height: 0; opacity: 0; overflow: hidden; transition: max-height 0.4s ease, opacity 0.4s ease; }
            .nav-dropdown.active .dropdown-content { max-height: 400px; opacity: 1; }
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
`;

const postsData = {
    'post1.html': {
        title: "My Honest Morning Routine | SkinHonestly Journal",
        description: "A clinical approach to morning skincare. Why protection and hydration are the only true goals for a morning glow.",
        category: "Rituals • Daily Guidance",
        headline: "My Honest Morning Routine: What I Use Every Single Day.",
        metaDate: "June 23, 2026",
        metaRead: "5 Min Read",
        imgSrc: "images/skin-improvement.webp",
        imgAlt: "Morning Skincare",
        articleContent: `
                <p>I’ll be the first to admit it: my skincare routine used to be exhausting. I thought I needed a ten-step process to achieve that elusive "glass skin," but in reality, all I got was an empty wallet and skin that felt overwhelmed and congested. Over the last year, I’ve drastically simplified my mornings.</p>
                <p>I’ve realized that when it comes to the start of the day, protection and hydration are the only true goals. Here is the honest, paired-down routine I actually stick to:</p>
                
                <h2>The Morning Philosophy</h2>
                <p>Morning skincare is not about "fixing" the skin—that happens at night. In the AM, your job is to shield your barrier from UV rays, pollution, and dehydration. If you aren't doing that, the rest of your products are essentially a waste of time.</p>

                <ul>
                    <li><strong>Gentle Cleanse:</strong> I often skip cleanser in the morning and just use lukewarm water. This preserves the natural lipids produced overnight.</li>
                    <li><strong>Antioxidant Protection:</strong> A Vitamin C serum is my non-negotiable. It fights free radicals and boosts the efficacy of my SPF.</li>
                    <li><strong>Hydration Layer:</strong> I use our <strong>Daily Reset Serum</strong>. It's lightweight but deeply hydrating, providing a perfect base for what's next.</li>
                    <li><strong>SPF, Always:</strong> If you only do one thing, let it be this. I use a mineral SPF 50 every single day, rain or shine.</li>
                </ul>

                <p>Simplicity is the ultimate sophistication in skincare. Find what works, stick to it, and don't let the marketing myths convince you that more is better.</p>
        `,
        shopItems: `
                <div class="shop-widget-item">
                    <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200" alt="Serum">
                    <div>
                        <h5>Daily Reset Serum</h5>
                        <a href="shop.html" class="shop-btn">Shop Now — $42</a>
                    </div>
                </div>
        `
    },
    'post2.html': {
        title: "5 Affordable Products | SkinHonestly Journal",
        description: "Clinical results on a budget. These five affordable skincare finds have earned their spot in my daily rotation.",
        category: "Curation • Budget Science",
        headline: "5 Affordable Products That Deliver Real Results.",
        metaDate: "July 01, 2026",
        metaRead: "5 Min Read",
        imgSrc: "images/featured-image.webp",
        imgAlt: "Budget Skincare",
        articleContent: `
                <p>There is a massive misconception in the beauty world that you have to spend a car payment on a tiny jar of cream to get glowing skin. Let me be the first to tell you: that is simply not true. Consistently using effective basics is the real secret to barrier health.</p>
                <p>I test a lot of formulations for this journal, and I’m always thrilled when a budget-friendly option clinically performs better than a luxury one. Here are five affordable products that have genuinely earned their permanent spot.</p>

                <h2>1. The Hydrating Cleanser</h2>
                <p>You don't need expensive actives in a product you're going to wash down the drain in 60 seconds. Look for a pH-balanced, non-foaming cleanser that leaves your skin feeling soft, not tight.</p>

                <h2>2. Pure Squalane Oil</h2>
                <p>Squalane is a skin-identical lipid that provides incredible hydration without being heavy or greasy. Many luxury brands sell this for $80+, but you can find pure versions for under $15 that work exactly the same.</p>

                <h2>3. Mineral Sunscreen</h2>
                <p>High-quality zinc oxide doesn't have to be pricey. Many drugstore formulations now offer elegant finishes without the heavy white cast of the past.</p>

                <p>The Bottom Line: Don't let the price tag fool you. Read the labels, understand the ingredients, and invest your money where it counts—in high-stability serums and barrier-repairing creams.</p>
        `,
        shopItems: `
                <div class="shop-widget-item">
                    <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=200" alt="Cleanser">
                    <div>
                        <h5>Hydrating Cleanser</h5>
                        <a href="shop.html" class="shop-btn">View in Shop</a>
                    </div>
                </div>
        `
    },
    'post3.html': {
        title: "Peptides Explained | SkinHonestly Journal",
        description: "A clinical breakdown of how peptides communicate with skin cells for barrier repair and remodeling.",
        category: "Science • Ingredient Deep-Dive",
        headline: "Peptides Explained: The Foundation of Skin Remodeling.",
        metaDate: "July 05, 2026",
        metaRead: "6 Min Read",
        imgSrc: "images/kalos-skincare-kzjH8CCWAD0-unsplash.webp",
        imgAlt: "Peptides",
        articleContent: `
                <p>If you've wandered down a skincare aisle recently, you’ve probably seen the word "Peptides" plastered across every other jar. They are undoubtedly the buzziest ingredient right now. But what actually are they, and more importantly, do they live up to the hype?</p>
                <p>Think of your skin as a brick wall. Collagen and elastin are the mortar holding everything together. As we age, that mortar starts to break down. Peptides are tiny fragments of proteins that send signals to your cells, "tricking" them into producing more collagen to fix the damage.</p>

                <h2>How They Work</h2>
                <p>Peptides act as messengers. When applied topically, they signal the skin to perform specific functions like building collagen, soothing inflammation, or increasing hydration. Unlike large collagen molecules which are too big to penetrate the skin, peptides are small enough to get where they need to go.</p>

                <ul>
                    <li><strong>Signal Peptides:</strong> The most common type, these tell your skin to make more collagen and elastin.</li>
                    <li><strong>Carrier Peptides:</strong> These deliver trace minerals like copper to the skin to aid in wound healing.</li>
                    <li><strong>Enzyme-Inhibitor Peptides:</strong> These work to slow down the natural breakdown of collagen.</li>
                </ul>

                <p>For those looking for long-term remodeling and firmness without the irritation often associated with Retinoids, Peptides are an essential tool in your clinical arsenal.</p>
        `,
        shopItems: `
                <div class="shop-widget-item">
                    <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200" alt="Serum">
                    <div>
                        <h5>Daily Reset Serum</h5>
                        <a href="shop.html" class="shop-btn">Shop Now — $42</a>
                    </div>
                </div>
        `
    },
    'post4.html': {
        title: "Barrier Health 101 | SkinHonestly Journal",
        description: "Redness, stinging, and breakouts? Your skin barrier might be compromised. Here is how to fix it.",
        category: "Barrier • Repair Protocol",
        headline: "Barrier Health 101: How to Heal a Compromised Skin Barrier.",
        metaDate: "July 08, 2026",
        metaRead: "8 Min Read",
        imgSrc: "images/christian-agbede-TqmyIxQpo5s-unsplash.webp",
        imgAlt: "Barrier Health",
        articleContent: `
                <p>The "squeaky clean" feeling we were taught to chase in the 90s was actually the sound of our skin barriers screaming for help. Your stratum corneum—the outermost layer of your skin—is your body's first line of defense against the world. When it's healthy, your skin is plump, glowing, and resilient. When it's broken, everything else goes wrong.</p>
                
                <h2>Signs of a Broken Barrier</h2>
                <p>If your skin feels tight after washing, stings when you apply a basic moisturizer, or is suddenly breaking out in areas you usually don't, your barrier is likely compromised. This allows moisture to leak out (Transepidermal Water Loss) and irritants to get in.</p>

                <h2>The 3-Step Repair Protocol</h2>
                <ul>
                    <li><strong>Strip it back:</strong> Stop all acids, retinoids, and physical scrubs immediately. Go back to a "Zero Routine."</li>
                    <li><strong>Replenish Lipids:</strong> Use products rich in Ceramides, Cholesterol, and Fatty Acids. These are the building blocks of your barrier.</li>
                    <li><strong>Seal it in:</strong> Use an occlusive layer at night to prevent moisture from escaping while you sleep.</li>
                </ul>

                <p>Be patient. A barrier takes about 28 days to fully cycle and repair. Once the stinging stops, you can slowly reintroduce your actives—one at a time.</p>
        `,
        shopItems: `
                <div class="shop-widget-item">
                    <img src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=200" alt="Balm">
                    <div>
                        <h5>Centella Barrier Balm</h5>
                        <a href="shop.html" class="shop-btn">View in Shop</a>
                    </div>
                </div>
        `
    },
    'post5.html': {
        title: "Nightly Rituals | SkinHonestly Journal",
        description: "Maximize your skin's repair phase. A clinical guide to the ultimate nightly skincare ritual.",
        category: "Rituals • Nightly Recovery",
        headline: "Nightly Rituals: Maximizing the Skin's Repair Phase.",
        metaDate: "July 10, 2026",
        metaRead: "6 Min Read",
        imgSrc: "images/ibnu-ihza-QbHwPe1HE84-unsplash.webp",
        imgAlt: "Night Skincare",
        articleContent: `
                <p>While you sleep, your skin goes into "overdrive" mode. Blood flow to the skin increases, and it focuses on repairing the damage done by UV rays and pollution during the day. This is the time to use your most powerful actives and deepest hydrators.</p>
                
                <h2>The Double Cleanse</h2>
                <p>I always start with an oil-based cleanser to melt away the day's SPF and pollution, followed by a gentle water-based cleanser. You cannot repair skin that still has a layer of urban grime sitting on top of it.</p>

                <h2>Active Treatment</h2>
                <p>This is where I rotate my "power players." One night it might be a Retinoid for cellular turnover, the next night a Peptide serum for remodeling. Never overload your skin with too many actives at once.</p>

                <p>Finally, I seal everything in with a rich, ceramide-heavy night cream. Wake up with skin that feels rested, even if your brain doesn't.</p>
        `,
        shopItems: `
                <div class="shop-widget-item">
                    <img src="https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=200" alt="Oil">
                    <div>
                        <h5>Bakuchiol Night Oil</h5>
                        <a href="shop.html" class="shop-btn">View in Shop</a>
                    </div>
                </div>
        `
    },
    'post6.html': {
        title: "The Sunscreen Truth | SkinHonestly Journal",
        description: "Everything you need to know about SPF stability, chemical vs physical, and the real secret to anti-aging.",
        category: "Science • Sun Protection",
        headline: "The Sunscreen Truth: The Real Secret to Anti-Aging.",
        metaDate: "July 11, 2026",
        metaRead: "7 Min Read",
        imgSrc: "images/content-pixie-Q0y-1aorvJo-unsplash.webp",
        imgAlt: "Sunscreen",
        articleContent: `
                <p>If you aren't wearing sunscreen every single day, you are essentially throwing money away on the rest of your skincare. 90% of visible skin aging is caused by sun exposure. It's the most powerful anti-aging tool we have, yet it's often the most neglected.</p>
                
                <h2>Chemical vs. Physical</h2>
                <p>Chemical sunscreens work like a sponge, absorbing UV rays and turning them into heat. Physical (mineral) sunscreens work like a shield, sitting on top of the skin and reflecting rays away. Both are effective, but mineral is often better for sensitive or acne-prone skin.</p>

                <h2>The Reapplication Myth</h2>
                <p>Yes, you do need to reapply if you are outdoors. But for a normal office day? One solid application in the morning is usually enough, provided you aren't sweating it off. The most important thing is finding a formula you actually enjoy wearing.</p>

                <p>Protect your investment. Wear your SPF. Honestly.</p>
        `,
        shopItems: `
                <div class="shop-widget-item">
                    <img src="https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=200" alt="SPF">
                    <div>
                        <h5>Mineral SPF 50 Shield</h5>
                        <a href="shop.html" class="shop-btn">View in Shop</a>
                    </div>
                </div>
        `
    },
    'post7.html': {
        title: "The Truth About Eye Creams | SkinHonestly Journal",
        description: "It’s the most debated step in any skincare routine. Let’s talk honestly about whether eye cream is a true must-have or just an expensive moisturizer.",
        category: "Analysis • Product Truths",
        headline: "The Truth About Eye Creams: Do You Really Need One?",
        metaDate: "June 17, 2026",
        metaRead: "7 Min Read",
        imgSrc: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200",
        imgAlt: "Eye Skincare",
        articleContent: `
                <p>If there is one question that pops up in my DMs more than any other, it’s this: <em>"Do I actually need to buy a separate eye cream?"</em> The beauty industry loves to convince us that if we don't have a highly specific product for every square inch of our faces, we are doing something wrong.</p>
                
                <h2>The Short Answer</h2>
                <p>For most people? No, you don't <em>need</em> an eye cream. The skin around your eyes is indeed thinner and more delicate, but a solid, fragrance-free facial moisturizer is perfectly capable of keeping your under-eyes protected.</p>
                <p>I always bring our <strong>SkinHonestly Daily Reset Serum</strong> right up to my orbital bone. Because it's formulated without harsh actives, it provides that perfect, gentle plumping effect without causing milia.</p>

                <h2>When Should You Buy One?</h2>
                <p>You only need a dedicated eye cream if you are trying to treat a <em>specific</em> under-eye issue that your regular moisturizer can’t handle:</p>
                <ul>
                    <li><strong>Dark Circles & Puffiness:</strong> You need an eye cream formulated with caffeine to constrict blood vessels.</li>
                    <li><strong>Deep Crow's Feet:</strong> You need a specialized retinol eye cream formulated at a lower concentration to prevent severe irritation.</li>
                </ul>

                <p>The Bottom Line: If your current routine is keeping your under-eyes soft, save your money. Skincare is personal, and there are no absolute rules—only what works best for your skin and your budget!</p>
        `,
        shopItems: `
                <div class="shop-widget-item">
                    <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200" alt="Serum">
                    <div>
                        <h5>Daily Reset Serum</h5>
                        <a href="shop.html" class="shop-btn">View in Shop</a>
                    </div>
                </div>
        `
    },
    'post8.html': {
        title: "Evening Wind-Down Routine | SkinHonestly Journal",
        description: "How I take the day off and prep my skin for overnight recovery. A simple, clinical 5-step evening skincare routine.",
        category: "Rituals • Evening Recovery",
        headline: "My Evening Wind-Down Routine for Recovery.",
        metaDate: "July 01, 2026",
        metaRead: "5 Min Read",
        imgSrc: "images/content-pixie-Q0y-1aorvJo-unsplash.webp",
        imgAlt: "Evening Routine",
        articleContent: `
                <p>By the time 8 PM rolls around, my brain is usually fried from staring at screens all day, and my skin feels completely suffocated. Between the commute, the office AC, and the stress of balancing a busy schedule, my evening skincare routine has become less about "fixing" my face and more about preserving my sanity.</p>
                <p>I don't do a 10-step routine. I don't have the energy for it, and honestly, neither does my skin barrier. My goal at night is simple: take the day off, release the physical tension in my face, and flood my skin with hydration so it can repair itself while I sleep.</p>

                <h2>Step 1: The "Melt"</h2>
                <p>If you wear SPF or makeup, a water-based cleanser alone isn't going to cut it. I start with a soothing cleansing balm.</p>

                <h2>Step 2: The Clean Slate</h2>
                <p>Next, I go in with a gentle, non-foaming hydrating cleanser. Your skin should never feel "squeaky clean" or tight after this step.</p>

                <p>Finally, I seal everything in with a rich, ceramide-heavy night cream. Wake up with skin that feels rested, even if your brain doesn't.</p>
        `,
        shopItems: `
                <div class="shop-widget-item">
                    <img src="https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=200" alt="Oil">
                    <div>
                        <h5>Bakuchiol Night Oil</h5>
                        <a href="shop.html" class="shop-btn">View in Shop</a>
                    </div>
                </div>
        `
    }
};

Object.keys(postsData).forEach(file => {
    const data = postsData[file];
    const oldContent = fs.readFileSync(file, 'utf8');

    // Extract Header (preserve untouched)
    const headerMatch = oldContent.match(/<header>([\s\S]*?)<\/header>/i);
    const header = headerMatch ? headerMatch[0] : '';
    
    // Extract Footer (preserve untouched)
    const footerMatch = oldContent.match(/<footer>([\s\S]*?)<\/footer>/i);
    const footer = footerMatch ? footerMatch[0] : '';

    const newContent = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\">\n    <title>" + data.title + "</title>\n    <meta name=\"description\" content=\"" + data.description + "\">\n    <meta name=\"p:domain_verify\" content=\"614a5afefa741fa072c6f9319d2f14d0\"/>\n    \n    <script async src=\"https://www.googletagmanager.com/gtag/js?id=G-33SX49MXHN\"></script>\n    <script>\n      window.dataLayer = window.dataLayer || [];\n      function gtag(){dataLayer.push(arguments);}\n      gtag('js', new Date());\n      gtag('config', 'G-33SX49MXHN');\n    </script>\n\n    <style>" + approvedStyles + "</style>\n</head>\n<body>\n\n" + header + "\n\n    <main class=\"article-layout\">\n        <div class=\"article-body\">\n            <header class=\"article-header\">\n                <span class=\"cat-tag\">" + data.category + "</span>\n                <h1>" + data.headline + "</h1>\n                <div class=\"article-meta\">\n                    <span>By Editor • " + data.metaDate + "</span>\n                    <span>" + data.metaRead + "</span>\n                </div>\n            </header>\n\n            <img src=\"" + data.imgSrc + "\" alt=\"" + data.imgAlt + "\" class=\"main-img\">\n\n            <article class=\"article-content\">\n                " + data.articleContent + "\n            </article>\n        </div>\n\n        <aside class=\"sidebar\">\n            <div class=\"sidebar-widget\">\n                <h3 class=\"widget-title\">The Editor</h3>\n                <div style=\"text-align: center;\">\n                    <img src=\"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400\" alt=\"Sarah\" style=\"width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 1.5rem; border: 1px solid var(--border); display: block; margin-left: auto; margin-right: auto;\">\n                    <p style=\"font-size: 0.9rem; font-style: italic; color: var(--text-light);\">\"Real skincare starts with honesty. I'm here to find what actually works.\"</p>\n                </div>\n            </div>\n\n            <div class=\"sidebar-widget\">\n                <h3 class=\"widget-title\">Shop This Post</h3>\n                " + data.shopItems + "\n            </div>\n        </aside>\n    </main>\n\n    <!-- NEWSLETTER SECTION -->\n    <section class=\"newsletter-cta\">\n        <h2>Join The Glow List</h2>\n        <p>Get exclusive clinical research and early access to drops.</p>\n        <form action=\"https://manage.kmail-lists.com/subscriptions/subscribe\" method=\"POST\" target=\"_blank\" class=\"newsletter-form\">\n            <input type=\"hidden\" name=\"g\" value=\"WpSSkZ\">\n            <input type=\"email\" name=\"email\" placeholder=\"Your email address\" required>\n            <button type=\"submit\">Subscribe</button>\n        </form>\n    </section>\n\n" + footer + "\n\n    <script src=\"script.js\"></script>\n</body>\n</html>";

    fs.writeFileSync(file, newContent);
    console.log("REBUILT CLEAN: " + file);
});
