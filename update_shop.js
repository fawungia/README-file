const fs = require('fs');

// 1. Read shop.html
let html = fs.readFileSync('shop.html', 'utf8');

// 2. Remove the Exclusive Showcase section and Replace with Ad Banner (matching blog.html structure)
const adBanner = `
        <!-- AD BANNER SLOT (Placeholder) -->
        <article id="hero-article" class="featured-article fade-transition scroll-reveal" style="height: 600px; display: flex; align-items: center; justify-content: center; position: relative; border-radius: 12px; overflow: hidden; margin-bottom: 4rem;">
            <img id="hero-img" src="https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1600" alt="Ad Space" style="position: absolute; width: 100%; height: 100%; object-fit: cover; z-index: 1;">
            <div class="featured-overlay" style="position: relative; z-index: 2; width: 45%; background: rgba(255, 255, 255, 0.95); padding: 4rem; border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.15); text-align: center;">
                <span id="hero-badge" class="badge">Partner Feature</span>
                <h2 id="hero-title">Your Ad Here</h2>
                <p id="hero-text">Premium clinical skincare placement. Contact us to feature your brand in The Curation.</p>
                <a id="hero-link" href="#" class="btn btn-primary" style="width: 100%;">Learn More</a>
            </div>
        </article>
`;

html = html.replace(/<!-- SIGNATURE EXCLUSIVE -->[\s\S]*?<\/section>/i, adBanner);

// 3. Update the "The Curation" Dropdown in the header
const curationDropdown = `
            <div class="nav-dropdown">
                <a href="shop.html">The Curation ▾</a>
                <div class="dropdown-content" id="curation-dropdown">
                    <a href="javascript:void(0)" onclick="filterProducts('all', this)">All Products</a>
                    <a href="javascript:void(0)" onclick="filterProducts('cleansers', this)">Cleansers</a>
                    <a href="javascript:void(0)" onclick="filterProducts('serums', this)">Serums</a>
                    <a href="javascript:void(0)" onclick="filterProducts('moisturizers', this)">Moisturizers</a>
                    <a href="javascript:void(0)" onclick="filterProducts('spf', this)">SPF</a>
                    <a href="javascript:void(0)" onclick="filterProducts('treatments', this)">Treatments</a>
                </div>
            </div>
`;

html = html.replace(/<div class="nav-dropdown">\s*<a href="shop\.html">The Curation ▾<\/a>[\s\S]*?<\/div>\s*<\/div>/i, curationDropdown);

// 4. Update the Product Grid with categories for filtering
// Existing products:
// 1. Cleanser (Cleansers)
// 2. Vitamin C (Serums)
// 3. SPF (SPF)
// 4. Toleriane (Moisturizers)
// 5. Squalane (Serums)
// 6. Cicapair (Treatments)
// Adding data-category attributes

html = html.replace('alt="Cleanser">', 'alt="Cleanser" data-category="cleansers">');
html = html.replace('<div class="product-card card-lift scroll-reveal">', '<div class="product-card card-lift scroll-reveal" data-category="cleansers">'); // First one
html = html.replace('<div class="product-card card-lift scroll-reveal">', '<div class="product-card card-lift scroll-reveal" data-category="serums">'); // Second
html = html.replace('<div class="product-card card-lift scroll-reveal">', '<div class="product-card card-lift scroll-reveal" data-category="spf">'); // Third
html = html.replace('<div class="product-card card-lift scroll-reveal">', '<div class="product-card card-lift scroll-reveal" data-category="moisturizers">'); // Fourth
html = html.replace('<div class="product-card card-lift scroll-reveal">', '<div class="product-card card-lift scroll-reveal" data-category="serums">'); // Fifth
html = html.replace('<div class="product-card card-lift scroll-reveal">', '<div class="product-card card-lift scroll-reveal" data-category="treatments">'); // Sixth

// 5. Add filterProducts Logic
const shopScript = `
    <script>
        const shopHeroData = {
            'all': {
                badge: "Partner Feature",
                title: "Your Ad Here",
                text: "Premium clinical skincare placement. Contact us to feature your brand in The Curation.",
                img: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1600",
                link: "#"
            },
            'cleansers': {
                badge: "Category Spotlight",
                title: "Gentle Cleansing",
                text: "The foundation of every routine. Explore our dermatologist-approved cleansers for all skin types.",
                img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1600",
                link: "shop.html?cat=cleansers"
            },
            'serums': {
                badge: "Category Spotlight",
                title: "Active Serums",
                text: "Potent treatments designed to target specific concerns, from brightening to barrier repair.",
                img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1600",
                link: "shop.html?cat=serums"
            },
            'moisturizers': {
                badge: "Category Spotlight",
                title: "Barrier Hydration",
                text: "Seal in your treatments and protect your moisture barrier with our clinical grade moisturizers.",
                img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1600",
                link: "shop.html?cat=moisturizers"
            },
            'spf': {
                badge: "Category Spotlight",
                title: "Daily Protection",
                text: "Dermatologist-recommended sun protection for every lifestyle and skin tone.",
                img: "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=1600",
                link: "shop.html?cat=spf"
            },
            'treatments': {
                badge: "Category Spotlight",
                title: "Specialized Care",
                text: "Targeted solutions for acne, redness, and recovery when your skin needs it most.",
                img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1600",
                link: "shop.html?cat=treatments"
            }
        };

        function filterProducts(category, element) {
            // Update active state in dropdown
            document.querySelectorAll('#curation-dropdown a').forEach(link => {
                link.style.textDecoration = 'none';
                link.style.fontWeight = '700';
            });
            if(element) {
                element.style.textDecoration = 'underline';
                element.style.color = 'var(--primary)';
            }

            const products = document.querySelectorAll('.product-card');
            const hero = document.getElementById('hero-article');
            const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            if (!isReducedMotion) {
                products.forEach(p => { p.style.opacity = '0'; p.style.transform = 'translateY(15px)'; p.style.transition = 'all 0.4s ease'; });
                if(hero) hero.style.opacity = '0';
            }

            setTimeout(() => {
                const data = shopHeroData[category] || shopHeroData['all'];
                if(document.getElementById('hero-img')) document.getElementById('hero-img').src = data.img;
                if(document.getElementById('hero-badge')) document.getElementById('hero-badge').innerText = data.badge;
                if(document.getElementById('hero-title')) document.getElementById('hero-title').innerText = data.title;
                if(document.getElementById('hero-text')) document.getElementById('hero-text').innerText = data.text;
                if(document.getElementById('hero-link')) document.getElementById('hero-link').href = data.link;

                products.forEach(product => {
                    if (category === 'all' || product.getAttribute('data-category') === category) {
                        product.style.display = 'flex';
                    } else {
                        product.style.display = 'none';
                    }
                });

                if (!isReducedMotion) {
                    if(hero) { hero.style.opacity = '1'; hero.style.transition = 'opacity 0.4s ease'; }
                    products.forEach(p => {
                        if (p.style.display !== 'none') {
                            void p.offsetWidth; 
                            p.style.opacity = '1';
                            p.style.transform = 'translateY(0)';
                        }
                    });
                }
            }, isReducedMotion ? 0 : 400);
        }
    </script>
`;

html = html.replace('</body>', shopScript + '\n</body>');

fs.writeFileSync('shop.html', html);
console.log('shop.html updated locally.');
