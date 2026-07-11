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

const postsData = JSON.parse(fs.readFileSync('posts_data.json', 'utf8'));
const indexContent = fs.readFileSync('index.html', 'utf8');

const headerMatch = indexContent.match(/<header>([\s\S]*?)<\/header>/i);
const header = headerMatch[0];
const footerMatch = indexContent.match(/<footer>([\s\S]*?)<\/footer>/i);
const footer = footerMatch[0];

Object.keys(postsData).forEach(file => {
    const data = postsData[file];
    let html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n';
    html += '    <meta charset="UTF-8">\n';
    html += '    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\n';
    html += '    <title>' + data.title + '</title>\n';
    html += '    <meta name="description" content="' + data.description + '">\n';
    html += '    <meta name="p:domain_verify" content="614a5afefa741fa072c6f9319d2f14d0"/>\n';
    html += '    <script async src="https://www.googletagmanager.com/gtag/js?id=G-33SX49MXHN"></script>\n';
    html += '    <script>\n      window.dataLayer = window.dataLayer || [];\n      function gtag(){dataLayer.push(arguments);}\n      gtag("js", new Date());\n      gtag("config", "G-33SX49MXHN");\n    </script>\n';
    html += '    <style>' + approvedStyles + '</style>\n';
    html += '</head>\n<body>\n\n';
    html += header + '\n\n';
    html += '    <main class="article-layout">\n';
    html += '        <div class="article-body">\n';
    html += '            <header class="article-header">\n';
    html += '                <span class="cat-tag">' + data.category + '</span>\n';
    html += '                <h1>' + data.headline + '</h1>\n';
    html += '                <div class="article-meta">\n';
    html += '                    <span>By Sarah • ' + data.metaDate + '</span>\n';
    html += '                    <span>' + data.metaRead + '</span>\n';
    html += '                </div>\n';
    html += '            </header>\n\n';
    html += '            <img src="' + data.imgSrc + '" alt="' + data.imgAlt + '" class="main-img">\n\n';
    html += '            <article class="article-content">\n';
    html += '                ' + data.articleContent + '\n';
    html += '            </article>\n';
    html += '        </div>\n\n';
    html += '        <aside class="sidebar">\n';
    html += '            <div class="sidebar-widget">\n';
    html += '                <h3 class="widget-title">The Editor</h3>\n';
    html += '                <div style="text-align: center;">\n';
    html += '                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400" alt="Sarah" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 1.5rem; border: 1px solid var(--border); display: block; margin-left: auto; margin-right: auto;">\n';
    html += '                    <p style="font-size: 0.9rem; font-style: italic; color: var(--text-light);">"Real skincare starts with honesty. I\'m here to find what actually works."</p>\n';
    html += '                </div>\n';
    html += '            </div>\n\n';
    html += '            <div class="sidebar-widget">\n';
    html += '                <h3 class="widget-title">Shop This Post</h3>\n';
    html += '                ' + data.shopItems + '\n';
    html += '            </div>\n';
    html += '        </aside>\n';
    html += '    </main>\n\n';
    html += '    <section class="newsletter-cta">\n';
    html += '        <h2>Join The Glow List</h2>\n';
    html += '        <p>Get exclusive clinical research and early access to drops.</p>\n';
    html += '        <form action="https://manage.kmail-lists.com/subscriptions/subscribe" method="POST" target="_blank" class="newsletter-form">\n';
    html += '            <input type="hidden" name="g" value="WpSSkZ">\n';
    html += '            <input type="email" name="email" placeholder="Your email address" required>\n';
    html += '            <button type="submit">Subscribe</button>\n';
    html += '        </form>\n';
    html += '    </section>\n\n';
    html += footer + '\n\n';
    html += '    <script src="script.js"></script>\n';
    html += '</body>\n</html>';

    fs.writeFileSync(file, html);
    console.log('GENERATED: ' + file);
});
