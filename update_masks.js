const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The new accurate mask drawing logic
const newMaskGen = `    if(dev.type === 'pro') {
        // iPhone Pro Series
        cam += \`<rect x="\${BW+6}" y="\${BW+6}" width="100" height="100" rx="24" fill="#18181b" filter="url(#shadow)" stroke="#333" stroke-width="1.5"/>\`;
        cam += \`<circle cx="\${BW+32}" cy="\${BW+32}" r="17" fill="url(#lens)" stroke="#444" stroke-width="2"/>\`;
        cam += \`<circle cx="\${BW+80}" cy="\${BW+32}" r="17" fill="url(#lens)" stroke="#444" stroke-width="2"/>\`;
        cam += \`<circle cx="\${BW+32}" cy="\${BW+80}" r="17" fill="url(#lens)" stroke="#444" stroke-width="2"/>\`;
        cam += \`<circle cx="\${BW+80}" cy="\${BW+80}" r="8" fill="#e0e0e0"/>\`;
    } else if (dev.type === 'std') {
        // iPhone Base Series (Diagonal)
        cam += \`<rect x="\${BW+6}" y="\${BW+6}" width="80" height="80" rx="20" fill="#18181b" filter="url(#shadow)" stroke="#333" stroke-width="1.5"/>\`;
        cam += \`<circle cx="\${BW+26}" cy="\${BW+26}" r="15" fill="url(#lens)" stroke="#444" stroke-width="2"/>\`;
        cam += \`<circle cx="\${BW+62}" cy="\${BW+62}" r="15" fill="url(#lens)" stroke="#444" stroke-width="2"/>\`;
        cam += \`<circle cx="\${BW+62}" cy="\${BW+24}" r="6" fill="#e0e0e0"/>\`;
    } else if (dev.type === 'apple_vert') {
        // iPhone 16 / 11 / 12 Base (Vertical)
        cam += \`<rect x="\${BW+6}" y="\${BW+6}" width="50" height="90" rx="22" fill="#18181b" filter="url(#shadow)"/>\`;
        cam += \`<circle cx="\${BW+31}" cy="\${BW+30}" r="14" fill="url(#lens)"/>\`;
        cam += \`<circle cx="\${BW+31}" cy="\${BW+70}" r="14" fill="url(#lens)"/>\`;
        cam += \`<circle cx="\${BW+65}" cy="\${BW+50}" r="5" fill="#e0e0e0"/>\`;
    } else if (dev.type === 's_ultra') {
        // Samsung Ultra series
        const cx = BW + 24;
        cam += \`<circle cx="\${cx}" cy="\${BW+30}" r="16" fill="url(#lens)" filter="url(#shadow)" stroke="#3a3a3a" stroke-width="2"/>\`;
        cam += \`<circle cx="\${cx}" cy="\${BW+74}" r="16" fill="url(#lens)" filter="url(#shadow)" stroke="#3a3a3a" stroke-width="2"/>\`;
        cam += \`<circle cx="\${cx}" cy="\${BW+118}" r="16" fill="url(#lens)" filter="url(#shadow)" stroke="#3a3a3a" stroke-width="2"/>\`;
        cam += \`<circle cx="\${cx+30}" cy="\${BW+40}" r="8" fill="url(#lens)"/>\`;
        cam += \`<circle cx="\${cx+30}" cy="\${BW+80}" r="8" fill="url(#lens)"/>\`;
    } else if (dev.type === 'ultra') {
        // Samsung Base/A series (Vertical Floating)
        const cx = BW + 26;
        cam += \`<circle cx="\${cx}" cy="\${BW+30}" r="15" fill="url(#lens)" filter="url(#shadow)" stroke="#3a3a3a" stroke-width="1.5"/>\`;
        cam += \`<circle cx="\${cx}" cy="\${BW+65}" r="15" fill="url(#lens)" filter="url(#shadow)" stroke="#3a3a3a" stroke-width="1.5"/>\`;
        cam += \`<circle cx="\${cx}" cy="\${BW+100}" r="15" fill="url(#lens)" filter="url(#shadow)" stroke="#3a3a3a" stroke-width="1.5"/>\`;
        cam += \`<circle cx="\${cx+30}" cy="\${BW+45}" r="5" fill="#e0e0e0"/>\`;
    } else if (dev.type === 'moto_std') {
        // Motorola Moto G typical
        cam += \`<rect x="\${BW+12}" y="\${BW+12}" width="60" height="110" rx="16" fill="#18181b" filter="url(#shadow)"/>\`;
        cam += \`<circle cx="\${BW+42}" cy="\${BW+40}" r="18" fill="url(#lens)"/>\`;
        cam += \`<circle cx="\${BW+42}" cy="\${BW+90}" r="18" fill="url(#lens)"/>\`;
        cam += \`<circle cx="\${BW+80}" cy="\${BW+65}" r="5" fill="#e0e0e0"/>\`;
    } else if (dev.type === 'xiaomi_rect') {
        // Xiaomi Redmi Note / Poco X
        cam += \`<rect x="\${BW+6}" y="\${BW+6}" width="100" height="110" rx="10" fill="#18181b" filter="url(#shadow)"/>\`;
        cam += \`<circle cx="\${BW+35}" cy="\${BW+35}" r="18" fill="url(#lens)"/>\`;
        cam += \`<circle cx="\${BW+35}" cy="\${BW+85}" r="18" fill="url(#lens)"/>\`;
        cam += \`<circle cx="\${BW+80}" cy="\${BW+45}" r="12" fill="url(#lens)"/>\`;
        cam += \`<circle cx="\${BW+80}" cy="\${BW+80}" r="6" fill="#e0e0e0"/>\`;
    } else if (dev.type === 'lg_sq') {
        // LG K52 / K62
        cam += \`<rect x="\${W/2 - 40}" y="\${BW+15}" width="80" height="80" rx="14" fill="#18181b" filter="url(#shadow)"/>\`;
        cam += \`<circle cx="\${W/2 - 18}" cy="\${BW+35}" r="10" fill="url(#lens)"/>\`;
        cam += \`<circle cx="\${W/2 + 18}" cy="\${BW+35}" r="10" fill="url(#lens)"/>\`;
        cam += \`<circle cx="\${W/2 - 18}" cy="\${BW+70}" r="10" fill="url(#lens)"/>\`;
        cam += \`<circle cx="\${W/2 + 18}" cy="\${BW+70}" r="10" fill="url(#lens)"/>\`;
        cam += \`<circle cx="\${W/2}" cy="\${BW+110}" r="5" fill="#e0e0e0"/>\`;
    } else if (dev.type === 'lg_hz') {
        // LG K41S / K51S / K61
        cam += \`<rect x="\${W/2 - 60}" y="\${BW+20}" width="120" height="30" rx="15" fill="#18181b" filter="url(#shadow)"/>\`;
        cam += \`<circle cx="\${W/2 - 40}" cy="\${BW+35}" r="8" fill="url(#lens)"/>\`;
        cam += \`<circle cx="\${W/2 - 15}" cy="\${BW+35}" r="8" fill="url(#lens)"/>\`;
        cam += \`<circle cx="\${W/2 + 10}" cy="\${BW+35}" r="8" fill="url(#lens)"/>\`;
        cam += \`<circle cx="\${W/2 + 35}" cy="\${BW+35}" r="8" fill="url(#lens)"/>\`;
    } else {
        cam += \`<rect x="\${BW+8}" y="\${BW+8}" width="70" height="130" rx="22" fill="#18181b" filter="url(#shadow)"/>\`;
        cam += \`<circle cx="\${BW+43}" cy="\${BW+35}" r="14" fill="url(#lens)"/>\`;
        cam += \`<circle cx="\${BW+43}" cy="\${BW+80}" r="14" fill="url(#lens)"/>\`;
    }`;

// Replace the old condition block
html = html.replace(/if\(dev\.type === 'pro'\) \{[\s\S]*?else \{[\s\S]*?\}/, newMaskGen);

// Update devices type directly in string
html = html.replace(/{ n: "Galaxy S24 Ultra"(.+?)type: 'ultra'/g, '{ n: "Galaxy S24 Ultra"$1type: \'s_ultra\'');
html = html.replace(/{ n: "Galaxy S23 Ultra"(.+?)type: 'ultra'/g, '{ n: "Galaxy S23 Ultra"$1type: \'s_ultra\'');
html = html.replace(/{ n: "Galaxy S22 Ultra"(.+?)type: 'ultra'/g, '{ n: "Galaxy S22 Ultra"$1type: \'s_ultra\'');

// Update motorola to moto_std
html = html.replace(/type: 'std'(.*)cr: 26(.*)\}/g, "type: 'moto_std'$1cr: 26$2}");

// Update Xiaomi to xiaomi_rect
html = html.replace(/Redmi Note(.+?)type: 'pro'/g, "Redmi Note$1type: 'xiaomi_rect'");
html = html.replace(/Poco(.+?)type: 'pro'/g, "Poco$1type: 'xiaomi_rect'");

// Update LG
html = html.replace(/LG K62(.+?)type: 'std'/g, "LG K62$1type: 'lg_sq'");
html = html.replace(/LG K52(.+?)type: 'std'/g, "LG K52$1type: 'lg_sq'");
html = html.replace(/LG K[456]1S(.+?)type: 'std'/g, "LG K$1S$1type: 'lg_hz'");

// Update iPhone Base Verticals
html = html.replace(/iPhone 16"(.+?)type: 'std'/g, 'iPhone 16"$1type: \'apple_vert\'');
html = html.replace(/iPhone 16 Plus"(.+?)type: 'std'/g, 'iPhone 16 Plus"$1type: \'apple_vert\'');
html = html.replace(/iPhone 11"(.+?)type: 'std'/g, 'iPhone 11"$1type: \'apple_vert\'');

fs.writeFileSync('index.html', html);
console.log('Update done.');
