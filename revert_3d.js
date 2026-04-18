const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const cleanEngine = `// Engine de Máscara (Estilo Blueprint Flat Premium - Clean UI)
function generatePerfectMask(dev) {
    const W = dev.w, H = dev.h, CR = dev.cr;
    const BW = 16; // Borda flat mais limpa e gordinha
    let cam = '';
    
    // Sem luzes cafonas. Design minimalista "Wireframe Premium" (Flat escuro elegante)
    const defs = \`<defs>
        <filter id="soft-shadow"><feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.3"/></filter>
    </defs>\`;

    const lensFilter = 'filter="url(#soft-shadow)"';
    // Lente simples, minimalista e fotográfica
    const drawLens = (cx, cy, r) => \`<circle cx="\${cx}" cy="\${cy}" r="\${r}" fill="#0a0a0a" stroke="#333" stroke-width="1.5"/>\`;

    // Desenho Geométrico Fiel - APPLE
    if(dev.type === 'apple_pro') {
        cam += \`<rect x="\${BW+8}" y="\${BW+8}" width="100" height="106" rx="24" fill="#18181b" \${lensFilter} stroke="#27272a" stroke-width="1"/>\`;
        cam += drawLens(BW+36, BW+36, 17);
        cam += drawLens(BW+80, BW+36, 17);
        cam += drawLens(BW+36, BW+82, 17);
        cam += \`<circle cx="\${BW+80}" cy="\${BW+80}" r="7" fill="#d4d4d8"/>\`; // flash
        cam += \`<circle cx="\${BW+80}" cy="\${BW+60}" r="4" fill="#111"/>\`; // lidar
    } else if (dev.type === 'apple_diag_sq') {
        cam += \`<rect x="\${BW+8}" y="\${BW+8}" width="82" height="82" rx="20" fill="#18181b" \${lensFilter} stroke="#27272a" stroke-width="1"/>\`;
        cam += drawLens(BW+31, BW+31, 16);
        cam += drawLens(BW+67, BW+67, 16);
        cam += \`<circle cx="\${BW+68}" cy="\${BW+26}" r="6" fill="#d4d4d8"/>\`; 
    } else if (dev.type === 'apple_vert_sq') {
        cam += \`<rect x="\${BW+8}" y="\${BW+8}" width="82" height="82" rx="20" fill="#18181b" \${lensFilter} stroke="#27272a" stroke-width="1"/>\`;
        cam += drawLens(BW+31, BW+31, 16);
        cam += drawLens(BW+31, BW+67, 16);
        cam += \`<circle cx="\${BW+68}" cy="\${BW+48}" r="6" fill="#d4d4d8"/>\`; 
    } else if (dev.type === 'apple_16_pill') {
        cam += \`<rect x="\${BW+12}" y="\${BW+12}" width="52" height="100" rx="26" fill="#18181b" \${lensFilter} stroke="#27272a" stroke-width="1"/>\`;
        cam += drawLens(BW+38, BW+38, 15);
        cam += drawLens(BW+38, BW+80, 15);
        cam += \`<circle cx="\${BW+80}" cy="\${BW+60}" r="6" fill="#d4d4d8"/>\`; 
    } else if (dev.type === 'apple_pill') {
        cam += \`<rect x="\${BW+12}" y="\${BW+12}" width="40" height="80" rx="20" fill="#18181b" \${lensFilter}/>\`;
        cam += drawLens(BW+32, BW+30, 12);
        cam += drawLens(BW+32, BW+70, 12);
        cam += \`<circle cx="\${BW+32}" cy="\${BW+50}" r="4" fill="#d4d4d8"/>\`;
    } else if (dev.type === 'apple_single') {
        cam += \`<rect x="\${BW+10}" y="\${BW+10}" width="50" height="30" rx="15" fill="#18181b" \${lensFilter}/>\`;
        cam += drawLens(BW+25, BW+25, 11);
        cam += \`<circle cx="\${BW+48}" cy="\${BW+25}" r="4" fill="#d4d4d8"/>\`;
    
    // Desenho Geométrico Fiel - SAMSUNG
    } else if (dev.type === 's_ultra') {
        const cx = BW + 28;
        cam += drawLens(cx, BW+35, 16);
        cam += drawLens(cx, BW+80, 16);
        cam += drawLens(cx, BW+125, 16);
        cam += drawLens(cx+32, BW+50, 9);
        cam += \`<circle cx="\${cx+32}" cy="\${BW+95}" r="6" fill="#d4d4d8"/>\`;
    } else if (dev.type === 's_float') {
        const cx = BW + 28;
        cam += drawLens(cx, BW+35, 15);
        cam += drawLens(cx, BW+80, 15);
        cam += drawLens(cx, BW+125, 15);
        cam += \`<circle cx="\${cx+32}" cy="\${BW+55}" r="5" fill="#d4d4d8"/>\`;
    } else if (dev.type === 's_block_quad') {
        cam += \`<rect x="\${BW+10}" y="\${BW+10}" width="65" height="120" rx="14" fill="#18181b" \${lensFilter}/>\`;
        cam += drawLens(BW+40, BW+35, 13);
        cam += drawLens(BW+40, BW+70, 13);
        cam += drawLens(BW+40, BW+105, 13);
        cam += \`<circle cx="\${BW+63}" cy="\${BW+50}" r="4.5" fill="#d4d4d8"/>\`;
        cam += drawLens(BW+63, BW+80, 7); 
    } else if (dev.type === 's_block_vert') {
        cam += \`<rect x="\${BW}" y="\${BW}" width="50" height="130" rx="18" fill="#18181b" \${lensFilter}/>\`;
        cam += drawLens(BW+28, BW+35, 14);
        cam += drawLens(BW+28, BW+75, 14);
        cam += drawLens(BW+28, BW+115, 14);
        cam += \`<circle cx="\${BW+65}" cy="\${BW+40}" r="5" fill="#d4d4d8"/>\`;

    // Desenho Geométrico Fiel - OUTROS
    } else if (dev.type === 'moto_std') {
        cam += \`<rect x="\${BW+10}" y="\${BW+10}" width="65" height="115" rx="16" fill="#18181b" \${lensFilter}/>\`;
        cam += drawLens(BW+42, BW+42, 17);
        cam += drawLens(BW+42, BW+95, 17);
        cam += \`<circle cx="\${BW+82}" cy="\${BW+68}" r="5" fill="#d4d4d8"/>\`;
    } else if (dev.type === 'moto_sq') {
        cam += \`<rect x="\${BW+10}" y="\${BW+10}" width="75" height="75" rx="16" fill="#18181b" \${lensFilter}/>\`;
        cam += drawLens(BW+32, BW+32, 13);
        cam += drawLens(BW+62, BW+32, 13);
        cam += drawLens(BW+32, BW+62, 13);
        cam += drawLens(BW+62, BW+62, 13);
    } else if (dev.type === 'xiaomi_rect') {
        cam += \`<rect x="\${BW+8}" y="\${BW+8}" width="100" height="110" rx="10" fill="#18181b" \${lensFilter}/>\`;
        cam += drawLens(BW+38, BW+38, 18);
        cam += drawLens(BW+38, BW+88, 18);
        cam += drawLens(BW+84, BW+48, 10);
        cam += \`<circle cx="\${BW+84}" cy="\${BW+85}" r="5" fill="#d4d4d8"/>\`;
    } else if (dev.type === 'lg_sq') {
        cam += \`<rect x="\${W/2 - 40}" y="\${BW+15}" width="80" height="80" rx="14" fill="#18181b" \${lensFilter}/>\`;
        cam += drawLens(W/2 - 18, BW+35, 11);
        cam += drawLens(W/2 + 18, BW+35, 11);
        cam += drawLens(W/2 - 18, BW+71, 11);
        cam += drawLens(W/2 + 18, BW+71, 11);
        cam += \`<circle cx="\${W/2}" cy="\${BW+110}" r="5" fill="#d4d4d8"/>\`;
    } else if (dev.type === 'lg_hz') {
        cam += \`<rect x="\${W/2 - 60}" y="\${BW+20}" width="120" height="30" rx="15" fill="#18181b" \${lensFilter}/>\`;
        cam += drawLens(W/2 - 42, BW+35, 9);
        cam += drawLens(W/2 - 14, BW+35, 9);
        cam += drawLens(W/2 + 14, BW+35, 9);
        cam += drawLens(W/2 + 42, BW+35, 9);
    } else {
        // Fallback
        cam += \`<rect x="\${BW+8}" y="\${BW+8}" width="70" height="120" rx="20" fill="#18181b" \${lensFilter}/>\`;
        cam += drawLens(BW+40, BW+35, 13);
        cam += drawLens(BW+40, BW+80, 13);
    }

    function rrp(x,y,w,h,r){return \`M\${x+r},\${y}h\${w-2*r}a\${r},\${r} 0 0 1 \${r},\${r}v\${h-2*r}a\${r},\${r} 0 0 1 -\${r},\${r}h-\${w-2*r}a\${r},\${r} 0 0 1 -\${r},-\${r}v-\${h-2*r}a\${r},\${r} 0 0 1 \${r},-\${r}z \`;}
    function rrc(x,y,w,h,r){return \`M\${x+r},\${y}a\${r},\${r} 0 0 0 -\${r},\${r}v\${h-2*r}a\${r},\${r} 0 0 0 \${r},\${r}h\${w-2*r}a\${r},\${r} 0 0 0 \${r},-\${r}v-\${h-2*r}a\${r},\${r} 0 0 0 -\${r},-\${r}z \`;}

    const svg = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${W}" height="\${H}">
        \${defs}
        <!-- Bumper Flat (Minimalista, exato e sem bugs visuais em navegadores ruins) -->
        <path fill-rule="evenodd" fill="#222" opacity="0.95" d="\${rrp(0,0,W,H,CR)}\${rrc(BW,BW,W-BW*2,H-BW*2,Math.max(8,CR-BW/2))}"/>
        <!-- Linha interna fina -->
        <path fill="none" stroke="#000" stroke-width="1.5" opacity="0.3" d="\${rrp(BW,BW,W-BW*2,H-BW*2,Math.max(8,CR-BW/2))}"/>
        \${cam}
    </svg>\`;
    return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}`;

html = html.replace(/function generatePerfectMask\(dev\) \{[\s\S]*?return 'data:image\/svg\+xml;charset=utf-8,'\+encodeURIComponent\(svg\);\n\}/, cleanEngine);
fs.writeFileSync('index.html', html);
console.log('UI Flat Wireframe Premium applied.');
