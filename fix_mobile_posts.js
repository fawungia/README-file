const fs = require('fs');

const fixMediaBody = `
        @media (max-width: 1100px) {
            .article-layout { grid-template-columns: 1fr !important; }
            .sidebar { border-left: none !important; padding-left: 0 !important; flex-direction: row !important; flex-wrap: wrap !important; margin-top: 4rem !important; }
            .sidebar-widget { flex: 1 !important; min-width: 300px !important; }
            .f-container { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 900px) { .related-grid { grid-template-columns: 1fr; } }
`;

for (let i = 1; i <= 10; i++) {
    const fileName = 'post' + i + '.html';
    if (!fs.existsSync(fileName)) continue;

    let content = fs.readFileSync(fileName, 'utf8');

    // Remove the current (incomplete) media queries
    content = content.replace(/@media \(max-width: 1100px\) \{ \.f-container \{ grid-template-columns: 1fr 1fr; \} \}/g, '');
    content = content.replace(/@media \(max-width: 900px\) \{ \.related-grid \{ grid-template-columns: 1fr; \} \}/g, '');
    
    // Also remove any existing attempt from the previous turn
    content = content.replace(/@media \(max-width: 1100px\) \{\s*\.article-layout \{[\s\S]*?\}\s*\}/g, '');

    // Inject the correct one before </style>
    content = content.replace('</style>', fixMediaBody + '    </style>');

    fs.writeFileSync(fileName, content);
    console.log("FIXED MEDIA QUERY: " + fileName);
}
