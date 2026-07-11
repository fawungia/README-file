const fs = require('fs');

const newListId = 'RiVwwC';

// Find all HTML files
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // Pattern 1: <input type="hidden" name="g" value="...">
    const regexG = /<input type="hidden" name="g" value="[^"]+">/gi;
    if (regexG.test(content)) {
        content = content.replace(regexG, `<input type="hidden" name="g" value="${newListId}">`);
        modified = true;
    }

    // Pattern 2: form action URLs that might have the list ID in the path/query
    // Standard Klaviyo form: https://manage.kmail-lists.com/subscriptions/subscribe?a=ACCOUNT_ID&g=LIST_ID
    // We already have name="g" inputs in most forms, but let's check action just in case.

    if (modified) {
        fs.writeFileSync(file, content);
        console.log(`Updated Klaviyo List ID in ${file}`);
    } else {
        // Log if no form was found to be safe
        if (content.includes('kmail-lists.com') || content.includes('klaviyo')) {
             console.log(`Found Klaviyo reference but no hidden 'g' input in ${file} - needs manual check.`);
        }
    }
});
