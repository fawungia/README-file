const fs = require('fs');
const path = require('path');

// Load Template
const templateContent = fs.readFileSync('post8.html', 'utf8');

function extract(content, regex) {
    const match = content.match(regex);
    return match ? match[1].trim() : '';
}

const postFiles = ['post1.html', 'post2.html', 'post3.html', 'post4.html', 'post5.html', 'post6.html', 'post7.html'];

postFiles.forEach(file => {
    if (!fs.existsSync(file)) return;
    
    const content = fs.readFileSync(file, 'utf8');
    
    const title = extract(content, /<title>([\s\S]*?)<\/title>/i);
    const description = extract(content, /<meta name="description" content="([\s\S]*?)">/i);
    
    // Article Meta / Category Tag
    const articleMeta = extract(content, /<span class="article-meta"[^>]*>([\s\S]*?)<\/span>/i) || extract(content, /<span class="cat-tag"[^>]*>([\s\S]*?)<\/span>/i);
    const headline = extract(content, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
    
    // Featured Image
    const imgMatch = content.match(/<img[^>]+class="main-img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"/i) || content.match(/<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"[^>]+class="main-img/i);
    const imgSrc = imgMatch ? imgMatch[1] : '';
    const imgAlt = imgMatch ? imgMatch[2] : '';
    
    // Body Content
    let articleBody = '';
    const bodyMatch = content.match(/<article class="article-content">([\s\S]*?)<\/article>/i) || content.match(/<div class="article-content[\s\S]*?">([\s\S]*?)<\/div>/i);
    if (bodyMatch) {
        articleBody = bodyMatch[1].trim();
    }
    
    // Sidebar
    let shopItems = '';
    const shopWidgetMatch = content.match(/<h3 class="widget-title">Shop This Post<\/h3>([\s\S]*?)<\/div>\s*<\/div>/i) || content.match(/<h3 class="widget-title">Shop The Recovery<\/h3>([\s\S]*?)<\/div>\s*<\/div>/i) || content.match(/<h3 class="widget-title">Shop the Ritual<\/h3>([\s\S]*?)<\/div>\s*<\/div>/i);
    if (shopWidgetMatch) {
        shopItems = shopWidgetMatch[1].trim();
    }

    let newContent = templateContent;
    
    newContent = newContent.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
    newContent = newContent.replace(/<meta name="description" content="[\s\S]*?">/i, `<meta name="description" content="${description}">`);
    newContent = newContent.replace(/<span class="cat-tag">[\s\S]*?<\/span>/i, `<span class="cat-tag">${articleMeta}</span>`);
    newContent = newContent.replace(/<h1>[\s\S]*?<\/h1>/i, `<h1>${headline}</h1>`);
    newContent = newContent.replace(/<img src="images\/content-pixie-Q0y-1aorvJo-unsplash.webp" alt="Evening Routine" class="main-img">/i, `<img src="${imgSrc}" alt="${imgAlt}" class="main-img">`);
    
    const templateBodyRegex = /<article class="article-content">[\s\S]*?<\/article>/i;
    newContent = newContent.replace(templateBodyRegex, `<article class="article-content">\n                ${articleBody}\n            </article>`);
    
    const templateShopRegex = /<h3 class="widget-title">Shop This Post<\/h3>[\s\S]*?<\/div>\s*<\/div>/i;
    if (shopItems) {
        newContent = newContent.replace(templateShopRegex, `<h3 class="widget-title">Shop This Post</h3>\n                ${shopItems}\n            </div>`);
    }

    fs.writeFileSync(file, newContent);
    console.log(`Standardized ${file}`);
});
