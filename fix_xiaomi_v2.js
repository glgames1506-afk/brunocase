const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Atualizando Mapeamento Específico Xiaomi
const newXiaomiBlock = `    Xiaomi: [
        { n: "Redmi Note 13 Pro+ 5G", w: 315, h: 660, maskUrl: null, type: 'xiaomi_float_3', cr: 30 },
        { n: "Redmi Note 13 Pro 5G", w: 315, h: 660, maskUrl: null, type: 'xiaomi_sq_3', cr: 28 },
        { n: "Redmi Note 13", w: 315, h: 660, maskUrl: null, type: 'xiaomi_sq_2', cr: 28 },
        { n: "Redmi Note 12 Pro", w: 315, h: 660, maskUrl: null, type: 'xiaomi_rect_3', cr: 28 },
        { n: "Redmi Note 12", w: 315, h: 660, maskUrl: null, type: 'xiaomi_rect_2', cr: 26 },
        { n: "Redmi Note 11 Pro", w: 315, h: 660, maskUrl: null, type: 'xiaomi_rect_3', cr: 26 },
        { n: "Redmi Note 11", w: 315, h: 660, maskUrl: null, type: 'xiaomi_rect_4', cr: 26 },
        { n: "Redmi Note 10", w: 315, h: 660, maskUrl: null, type: 'xiaomi_rect_4', cr: 26 },
        { n: "Redmi 13C", w: 315, h: 660, maskUrl: null, type: 'xiaomi_13c', cr: 26 },
        { n: "Redmi 12C", w: 315, h: 660, maskUrl: null, type: 'xiaomi_sq_2', cr: 26 },
        { n: "Poco X6 Pro", w: 315, h: 660, maskUrl: null, type: 'xiaomi_poco', cr: 28 },
        { n: "Poco X6", w: 315, h: 660, maskUrl: null, type: 'xiaomi_poco', cr: 28 },
        { n: "Poco F5 Pro", w: 315, h: 660, maskUrl: null, type: 'xiaomi_rect_3', cr: 28 },
        { n: "Poco F5", w: 315, h: 660, maskUrl: null, type: 'xiaomi_float_tri', cr: 28 },
        { n: "Poco X5 Pro", w: 315, h: 660, maskUrl: null, type: 'xiaomi_poco', cr: 26 }
    ],`;

html = html.replace(/    Xiaomi: \[[\s\S]*?\],\n/m, newXiaomiBlock + '\n');

// Novas Matrizes Cirurgicas para Xiaomi
const oldXiaomiGenerators = /    \} else if \(dev\.type === 'xiaomi_float'\) \{[\s\S]*?    \} else if \(dev\.type === 'lg_sq'\) \{/m;

const newXiaomiGenerators = `    } else if (dev.type === 'xiaomi_13c') {
        // Redondo e flutuante
        cam += drawLens(BW+36, BW+36, 17);
        cam += drawLens(BW+36, BW+82, 17);
        cam += \`<circle cx="\${BW+75}" cy="\${BW+36}" r="5" fill="#d4d4d8"/>\`; // flash na direita superior
    } else if (dev.type === 'xiaomi_float_3') {
        cam += drawLens(BW+36, BW+36, 17);
        cam += drawLens(BW+36, BW+82, 17);
        cam += drawLens(BW+75, BW+59, 10);
    } else if (dev.type === 'xiaomi_float_tri') {
        cam += drawLens(BW+36, BW+36, 16);
        cam += drawLens(BW+36, BW+80, 16);
        cam += drawLens(BW+75, BW+58, 12);
    } else if (dev.type === 'xiaomi_sq_3') {
        // Bloco quadrado com 3 lentes
        cam += \`<rect x="\${BW+8}" y="\${BW+8}" width="90" height="90" rx="14" fill="#18181b" \${lensFilter}/>\`;
        cam += drawLens(BW+35, BW+35, 15);
        cam += drawLens(BW+35, BW+75, 15);
        cam += drawLens(BW+75, BW+55, 10);
    } else if (dev.type === 'xiaomi_sq_2') {
        // Bloco quadrado com 2 lentes + flash
        cam += \`<rect x="\${BW+8}" y="\${BW+8}" width="85" height="90" rx="14" fill="#18181b" \${lensFilter}/>\`;
        cam += drawLens(BW+35, BW+35, 15);
        cam += drawLens(BW+35, BW+75, 15);
        cam += \`<circle cx="\${BW+70}" cy="\${BW+55}" r="6" fill="#d4d4d8"/>\`;
    } else if (dev.type === 'xiaomi_rect_2') {
        // Bloco retangular com 2 lentes grandes (Note 12)
        cam += \`<rect x="\${BW+8}" y="\${BW+8}" width="75" height="115" rx="12" fill="#18181b" \${lensFilter}/>\`;
        cam += drawLens(BW+45, BW+38, 16);
        cam += drawLens(BW+45, BW+85, 16);
        cam += \`<circle cx="\${BW+65}" cy="\${BW+61}" r="4" fill="#d4d4d8"/>\`;
    } else if (dev.type === 'xiaomi_rect_3') {
        // Bloco retangular com 3 lentes (Note 12 Pro)
        cam += \`<rect x="\${BW+8}" y="\${BW+8}" width="75" height="120" rx="12" fill="#18181b" \${lensFilter}/>\`;
        cam += drawLens(BW+45, BW+35, 14);
        cam += drawLens(BW+35, BW+85, 12);
        cam += drawLens(BW+60, BW+85, 12);
    } else if (dev.type === 'xiaomi_rect_4') {
        // Bloco retangular com 4 matrizes (Note 11)
        cam += \`<rect x="\${BW+8}" y="\${BW+8}" width="70" height="130" rx="12" fill="#18181b" \${lensFilter}/>\`;
        cam += drawLens(BW+43, BW+32, 14);
        cam += drawLens(BW+31, BW+70, 8);
        cam += drawLens(BW+55, BW+70, 8);
        cam += drawLens(BW+43, BW+100, 10);
    } else if (dev.type === 'xiaomi_poco') {
        // Visor largo do Poco X6, etc
        cam += \`<rect x="\${BW+4}" y="\${BW+10}" width="\${W-BW*2-8}" height="85" rx="8" fill="#18181b" \${lensFilter}/>\`;
        cam += drawLens(BW+35, BW+52, 18);
        cam += drawLens(BW+85, BW+52, 18);
        cam += \`<circle cx="\${BW+130}" cy="\${BW+52}" r="8" fill="#d4d4d8"/>\`;
    } else if (dev.type === 'lg_sq') {`;

html = html.replace(oldXiaomiGenerators, newXiaomiGenerators);
fs.writeFileSync('index.html', html);
console.log('Cirurgia Xiaomi concluída com precisão.');
