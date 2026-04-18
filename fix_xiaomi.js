const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const newXiaomiBlock = `    Xiaomi: [
        { n: "Redmi Note 13 Pro+ 5G", w: 315, h: 660, maskUrl: null, type: 'xiaomi_float', cr: 30 },
        { n: "Redmi Note 13 Pro 5G", w: 315, h: 660, maskUrl: null, type: 'xiaomi_sq', cr: 28 },
        { n: "Redmi Note 13", w: 315, h: 660, maskUrl: null, type: 'xiaomi_sq', cr: 28 },
        { n: "Redmi Note 12 Pro", w: 315, h: 660, maskUrl: null, type: 'xiaomi_vert_rect', cr: 28 },
        { n: "Redmi Note 12", w: 315, h: 660, maskUrl: null, type: 'xiaomi_vert_rect', cr: 26 },
        { n: "Redmi Note 11 Pro", w: 315, h: 660, maskUrl: null, type: 'xiaomi_vert_rect', cr: 26 },
        { n: "Redmi Note 11", w: 315, h: 660, maskUrl: null, type: 'xiaomi_vert_rect', cr: 26 },
        { n: "Redmi Note 10 Pro", w: 315, h: 660, maskUrl: null, type: 'xiaomi_vert_rect', cr: 26 },
        { n: "Redmi Note 10", w: 315, h: 660, maskUrl: null, type: 'xiaomi_vert_rect', cr: 26 },
        { n: "Redmi 13C", w: 315, h: 660, maskUrl: null, type: 'xiaomi_float', cr: 26 },
        { n: "Redmi 12C", w: 315, h: 660, maskUrl: null, type: 'xiaomi_sq', cr: 26 },
        { n: "Poco X6 Pro", w: 315, h: 660, maskUrl: null, type: 'xiaomi_poco_wide', cr: 28 },
        { n: "Poco X6", w: 315, h: 660, maskUrl: null, type: 'xiaomi_poco_wide', cr: 28 },
        { n: "Poco F5 Pro", w: 315, h: 660, maskUrl: null, type: 'xiaomi_vert_rect', cr: 28 },
        { n: "Poco F5", w: 315, h: 660, maskUrl: null, type: 'xiaomi_float', cr: 28 },
        { n: "Poco X5 Pro", w: 315, h: 660, maskUrl: null, type: 'xiaomi_poco_wide', cr: 26 }
    ],`;

// Replace older Xiaomi devices array
html = html.replace(/    Xiaomi: \[[\s\S]*?\],\n/m, newXiaomiBlock + '\n');

// Replace old xiaomi_rect generator code with the highly accurate specific new geometries
const oldGenerator = `    } else if (dev.type === 'xiaomi_rect') {
        cam += \`<rect x="\${BW+8}" y="\${BW+8}" width="100" height="110" rx="10" fill="#18181b" \${lensFilter}/>\`;
        cam += drawLens(BW+38, BW+38, 18);
        cam += drawLens(BW+38, BW+88, 18);
        cam += drawLens(BW+84, BW+48, 10);
        cam += \`<circle cx="\${BW+84}" cy="\${BW+85}" r="5" fill="#d4d4d8"/>\`;`;

const newGeneratorParts = `    } else if (dev.type === 'xiaomi_float') {
        cam += drawLens(BW+35, BW+38, 18);
        cam += drawLens(BW+35, BW+88, 18);
        cam += \`<circle cx="\${BW+80}" cy="\${BW+60}" r="8" fill="#d4d4d8"/>\`;
    } else if (dev.type === 'xiaomi_sq') {
        cam += \`<rect x="\${BW+8}" y="\${BW+8}" width="90" height="90" rx="12" fill="#18181b" \${lensFilter}/>\`;
        cam += drawLens(BW+35, BW+35, 16);
        cam += drawLens(BW+35, BW+72, 16);
        cam += drawLens(BW+75, BW+55, 9);
    } else if (dev.type === 'xiaomi_poco_wide') {
        cam += \`<rect x="\${BW+4}" y="\${BW+10}" width="\${W-BW*2-8}" height="85" rx="8" fill="#18181b" \${lensFilter}/>\`;
        cam += drawLens(BW+35, BW+52, 18);
        cam += drawLens(BW+85, BW+52, 18);
        cam += \`<circle cx="\${BW+130}" cy="\${BW+52}" r="8" fill="#d4d4d8"/>\`;
    } else if (dev.type === 'xiaomi_vert_rect') {
        cam += \`<rect x="\${BW+8}" y="\${BW+8}" width="75" height="120" rx="10" fill="#18181b" \${lensFilter}/>\`;
        cam += drawLens(BW+45, BW+38, 15);
        cam += drawLens(BW+30, BW+85, 9);
        cam += drawLens(BW+60, BW+85, 9);
        cam += \`<circle cx="\${BW+45}" cy="\${BW+108}" r="5" fill="#d4d4d8"/>\`;`;

html = html.replace(oldGenerator, newGeneratorParts);

fs.writeFileSync('index.html', html);
console.log('Xiaomi fully corrected.');
