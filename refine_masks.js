const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const newEngine = `function generatePerfectMask(dev) {
    const W = dev.w, H = dev.h, CR = dev.cr;
    const BW = 14; 
    let cam = '';
    
    const defs = \`<defs>
        <filter id="studio-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="-8" dy="15" stdDeviation="12" flood-color="#000" flood-opacity="0.6"/>
            <feDropShadow dx="2" dy="5" stdDeviation="4" flood-color="#000" flood-opacity="0.3"/>
        </filter>
        <linearGradient id="tpu-base" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#2a2a2d"/><stop offset="10%" stop-color="#141415"/>
            <stop offset="50%" stop-color="#050505"/><stop offset="90%" stop-color="#09090b"/><stop offset="100%" stop-color="#1a1a1c"/>
        </linearGradient>
        <linearGradient id="metal-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#d4d4d8"/><stop offset="50%" stop-color="#18181b"/><stop offset="100%" stop-color="#a1a1aa"/>
        </linearGradient>
        <radialGradient id="lens-glass" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#52525b"/><stop offset="50%" stop-color="#050505"/><stop offset="100%" stop-color="#27272a"/>
        </radialGradient>
        <linearGradient id="glass-glare" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="rgba(255,255,255,0.2)"/><stop offset="30%" stop-color="rgba(255,255,255,0)"/><stop offset="100%" stop-color="rgba(255,255,255,0.03)"/>
        </linearGradient>
    </defs>\`;

    const lensFilter = 'filter="url(#studio-shadow)"';
    const drawLens = (cx, cy, r) => \`<circle cx="\${cx}" cy="\${cy}" r="\${r}" fill="url(#lens-glass)" stroke="url(#metal-ring)" stroke-width="\${r*0.15}"/>
                                     <circle cx="\${cx - r*0.3}" cy="\${cy - r*0.3}" r="\${r*0.1}" fill="#fff" opacity="0.6"/>\`;

    // APPLE
    if(dev.type === 'apple_pro') {
        // iPhone Pro (Squircle, 3 Lenses)
        cam += \`<rect x="\${BW+6}" y="\${BW+6}" width="105" height="108" rx="26" fill="url(#tpu-base)" \${lensFilter} stroke="#3f3f46" stroke-width="1.5"/>\`;
        cam += drawLens(BW+36, BW+36, 18);
        cam += drawLens(BW+82, BW+36, 18);
        cam += drawLens(BW+36, BW+82, 18);
        cam += \`<circle cx="\${BW+82}" cy="\${BW+82}" r="8" fill="#e4e4e7" stroke="#71717a" stroke-width="2"/>\`; 
        cam += \`<circle cx="\${BW+82}" cy="\${BW+60}" r="4" fill="#111"/>\`; 
    } else if (dev.type === 'apple_diag_sq') {
        // iPhone 13, 14, 15 Base (Squircle, 2 Diagonal Lenses)
        cam += \`<rect x="\${BW+6}" y="\${BW+6}" width="85" height="85" rx="22" fill="url(#tpu-base)" \${lensFilter} stroke="#3f3f46" stroke-width="1.5"/>\`;
        cam += drawLens(BW+32, BW+32, 17);
        cam += drawLens(BW+68, BW+68, 17);
        cam += \`<circle cx="\${BW+70}" cy="\${BW+26}" r="7" fill="#e4e4e7"/>\`; 
    } else if (dev.type === 'apple_vert_sq') {
        // iPhone 11, 12 Base (Squircle, 2 Vertical Lenses)
        cam += \`<rect x="\${BW+6}" y="\${BW+6}" width="85" height="85" rx="22" fill="url(#tpu-base)" \${lensFilter} stroke="#3f3f46" stroke-width="1.5"/>\`;
        cam += drawLens(BW+32, BW+32, 17);
        cam += drawLens(BW+32, BW+68, 17);
        cam += \`<circle cx="\${BW+70}" cy="\${BW+50}" r="7" fill="#e4e4e7"/>\`; 
    } else if (dev.type === 'apple_16_pill') {
        // iPhone 16 Base (Pill, 2 Vertical Lenses)
        cam += \`<rect x="\${BW+12}" y="\${BW+12}" width="55" height="110" rx="27" fill="url(#tpu-base)" \${lensFilter} stroke="#3f3f46" stroke-width="1.5"/>\`;
        cam += drawLens(BW+39, BW+39, 16);
        cam += drawLens(BW+39, BW+84, 16);
        cam += \`<circle cx="\${BW+85}" cy="\${BW+60}" r="7" fill="#e4e4e7"/>\`; // flash outside
    } else if (dev.type === 'apple_pill') {
        // iPhone X, XS (Small Pill)
        cam += \`<rect x="\${BW+12}" y="\${BW+12}" width="40" height="85" rx="20" fill="url(#tpu-base)" \${lensFilter} stroke="#3f3f46" stroke-width="1.5"/>\`;
        cam += drawLens(BW+32, BW+32, 11);
        cam += drawLens(BW+32, BW+72, 11);
        cam += \`<circle cx="\${BW+32}" cy="\${BW+52}" r="5" fill="#e4e4e7"/>\`;
    } else if (dev.type === 'apple_single') {
        // iPhone 7, 8, SE (Single Horizontal Pill / Circle)
        cam += \`<rect x="\${BW+10}" y="\${BW+10}" width="50" height="30" rx="15" fill="url(#tpu-base)" \${lensFilter} stroke="#3f3f46" stroke-width="1"/>\`;
        cam += drawLens(BW+24, BW+25, 12);
        cam += \`<circle cx="\${BW+48}" cy="\${BW+25}" r="5" fill="#e4e4e7"/>\`;
    
    // SAMSUNG
    } else if (dev.type === 's_ultra') {
        // S Ultra (Floating 3 + 2 aside)
        const cx = BW + 28;
        cam += drawLens(cx, BW+35, 17);
        cam += drawLens(cx, BW+80, 17);
        cam += drawLens(cx, BW+125, 17);
        cam += drawLens(cx+32, BW+50, 9);
        cam += \`<circle cx="\${cx+32}" cy="\${BW+95}" r="7" fill="#e4e4e7" stroke="#71717a" stroke-width="2"/>\`;
    } else if (dev.type === 's_float') {
        // S24, S23, A54 (Floating 3 vertical)
        const cx = BW + 28;
        cam += drawLens(cx, BW+35, 16);
        cam += drawLens(cx, BW+80, 16);
        cam += drawLens(cx, BW+125, 16);
        cam += \`<circle cx="\${cx+30}" cy="\${BW+55}" r="6" fill="#e4e4e7"/>\`;
    } else if (dev.type === 's_block_quad') {
        // Older A series like A52, A53 (Rectangular block)
        cam += \`<rect x="\${BW+10}" y="\${BW+10}" width="65" height="120" rx="14" fill="url(#tpu-base)" \${lensFilter}/>\`;
        cam += drawLens(BW+40, BW+35, 14);
        cam += drawLens(BW+40, BW+70, 14);
        cam += drawLens(BW+40, BW+105, 14);
        cam += \`<circle cx="\${BW+63}" cy="\${BW+50}" r="5" fill="#e4e4e7"/>\`;
        cam += drawLens(BW+63, BW+80, 7); // 4th small lens
    } else if (dev.type === 's_block_vert') {
        // S21, S21 FE (Vertical block attached to side)
        cam += \`<rect x="\${BW}" y="\${BW}" width="50" height="130" rx="18" fill="url(#tpu-base)" \${lensFilter}/>\`;
        cam += drawLens(BW+28, BW+35, 15);
        cam += drawLens(BW+28, BW+75, 15);
        cam += drawLens(BW+28, BW+115, 15);
        cam += \`<circle cx="\${BW+65}" cy="\${BW+40}" r="6" fill="#e4e4e7"/>\`;

    // MOTOROLA & XIAOMI & LG
    } else if (dev.type === 'moto_std') {
        cam += \`<rect x="\${BW+12}" y="\${BW+12}" width="65" height="120" rx="18" fill="url(#tpu-base)" \${lensFilter}/>\`;
        cam += drawLens(BW+45, BW+45, 19);
        cam += drawLens(BW+45, BW+100, 19);
        cam += \`<circle cx="\${BW+85}" cy="\${BW+72}" r="6" fill="#e4e4e7"/>\`;
    } else if (dev.type === 'moto_sq') {
        cam += \`<rect x="\${BW+12}" y="\${BW+12}" width="80" height="80" rx="18" fill="url(#tpu-base)" \${lensFilter}/>\`;
        cam += drawLens(BW+35, BW+35, 14);
        cam += drawLens(BW+68, BW+35, 14);
        cam += drawLens(BW+35, BW+68, 14);
        cam += drawLens(BW+68, BW+68, 14);
    } else if (dev.type === 'xiaomi_rect') {
        cam += \`<rect x="\${BW+8}" y="\${BW+8}" width="105" height="115" rx="10" fill="url(#tpu-base)" \${lensFilter}/>\`;
        cam += drawLens(BW+40, BW+38, 20);
        cam += drawLens(BW+40, BW+90, 20);
        cam += drawLens(BW+88, BW+50, 10);
        cam += \`<circle cx="\${BW+88}" cy="\${BW+85}" r="6" fill="#e4e4e7"/>\`;
    } else if (dev.type === 'lg_sq') {
        cam += \`<rect x="\${W/2 - 45}" y="\${BW+15}" width="90" height="90" rx="16" fill="url(#tpu-base)" \${lensFilter}/>\`;
        cam += drawLens(W/2 - 20, BW+38, 12);
        cam += drawLens(W/2 + 20, BW+38, 12);
        cam += drawLens(W/2 - 20, BW+78, 12);
        cam += drawLens(W/2 + 20, BW+78, 12);
        cam += \`<circle cx="\${W/2}" cy="\${BW+120}" r="6" fill="#e4e4e7"/>\`;
    } else if (dev.type === 'lg_hz') {
        cam += \`<rect x="\${W/2 - 65}" y="\${BW+20}" width="130" height="35" rx="18" fill="url(#tpu-base)" \${lensFilter}/>\`;
        cam += drawLens(W/2 - 45, BW+38, 10);
        cam += drawLens(W/2 - 15, BW+38, 10);
        cam += drawLens(W/2 + 15, BW+38, 10);
        cam += drawLens(W/2 + 45, BW+38, 10);
    } else {
        cam += \`<rect x="\${BW+8}" y="\${BW+8}" width="70" height="130" rx="22" fill="url(#tpu-base)" \${lensFilter}/>\`;
        cam += drawLens(BW+43, BW+35, 14);
        cam += drawLens(BW+43, BW+80, 14);
    }

    function rrp(x,y,w,h,r){return \`M\${x+r},\${y}h\${w-2*r}a\${r},\${r} 0 0 1 \${r},\${r}v\${h-2*r}a\${r},\${r} 0 0 1 -\${r},\${r}h-\${w-2*r}a\${r},\${r} 0 0 1 -\${r},-\${r}v-\${h-2*r}a\${r},\${r} 0 0 1 \${r},-\${r}z \`;}
    function rrc(x,y,w,h,r){return \`M\${x+r},\${y}a\${r},\${r} 0 0 0 -\${r},\${r}v\${h-2*r}a\${r},\${r} 0 0 0 \${r},\${r}h\${w-2*r}a\${r},\${r} 0 0 0 \${r},-\${r}v-\${h-2*r}a\${r},\${r} 0 0 0 -\${r},-\${r}z \`;}

    const svg = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${W}" height="\${H}" style="overflow: visible">
        \${defs}
        <path filter="url(#studio-shadow)" fill-rule="evenodd" fill="url(#tpu-base)" d="\${rrp(0,0,W,H,CR)}\${rrc(BW,BW,W-BW*2,H-BW*2,Math.max(8,CR-BW/2))}"/>
        <path fill="none" stroke="#3f3f46" stroke-width="2" d="\${rrp(BW,BW,W-BW*2,H-BW*2,Math.max(8,CR-BW/2))}"/>
        \${cam}
        <path fill="url(#glass-glare)" d="\${rrp(0,0,W,H,CR)}"/>
    </svg>\`;
    return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}`;

// Update DEVICE type mappings
const devicesReplacementString = `const DEVICES = {
    Apple: [
        { n: "iPhone 17 Pro Max", w: 320, h: 660, maskUrl: null, type: 'apple_pro', cr: 38 },
        { n: "iPhone 17 Pro", w: 300, h: 630, maskUrl: null, type: 'apple_pro', cr: 36 },
        { n: "iPhone 17 Plus", w: 320, h: 660, maskUrl: null, type: 'apple_16_pill', cr: 38 },
        { n: "iPhone 17", w: 300, h: 630, maskUrl: null, type: 'apple_16_pill', cr: 36 },
        { n: "iPhone 16 Pro Max", w: 320, h: 660, maskUrl: null, type: 'apple_pro', cr: 38 },
        { n: "iPhone 16 Pro", w: 300, h: 630, maskUrl: null, type: 'apple_pro', cr: 36 },
        { n: "iPhone 16 Plus", w: 320, h: 660, maskUrl: null, type: 'apple_16_pill', cr: 38 },
        { n: "iPhone 16", w: 300, h: 630, maskUrl: null, type: 'apple_16_pill', cr: 36 },
        { n: "iPhone 15 Pro Max", w: 320, h: 660, maskUrl: null, type: 'apple_pro', cr: 38 },
        { n: "iPhone 15 Pro", w: 300, h: 630, maskUrl: null, type: 'apple_pro', cr: 36 },
        { n: "iPhone 15 Plus", w: 320, h: 660, maskUrl: null, type: 'apple_diag_sq', cr: 38 },
        { n: "iPhone 15", w: 300, h: 620, maskUrl: null, type: 'apple_diag_sq', cr: 34 },
        { n: "iPhone 14 Pro Max", w: 320, h: 660, maskUrl: null, type: 'apple_pro', cr: 36 },
        { n: "iPhone 14 Pro", w: 300, h: 630, maskUrl: null, type: 'apple_pro', cr: 34 },
        { n: "iPhone 14 Plus", w: 320, h: 660, maskUrl: null, type: 'apple_diag_sq', cr: 36 },
        { n: "iPhone 14", w: 300, h: 620, maskUrl: null, type: 'apple_diag_sq', cr: 34 },
        { n: "iPhone 13 Pro Max", w: 320, h: 660, maskUrl: null, type: 'apple_pro', cr: 36 },
        { n: "iPhone 13 Pro", w: 300, h: 620, maskUrl: null, type: 'apple_pro', cr: 32 },
        { n: "iPhone 13", w: 300, h: 615, maskUrl: null, type: 'apple_diag_sq', cr: 32 },
        { n: "iPhone 13 mini", w: 280, h: 590, maskUrl: null, type: 'apple_diag_sq', cr: 30 },
        { n: "iPhone 12 Pro Max", w: 320, h: 660, maskUrl: null, type: 'apple_pro', cr: 34 },
        { n: "iPhone 12 / 12 Pro", w: 300, h: 620, maskUrl: null, type: 'apple_vert_sq', cr: 32 },
        { n: "iPhone 12 mini", w: 280, h: 590, maskUrl: null, type: 'apple_vert_sq', cr: 30 },
        { n: "iPhone 11 Pro Max", w: 320, h: 650, maskUrl: null, type: 'apple_pro', cr: 36 },
        { n: "iPhone 11 Pro", w: 300, h: 610, maskUrl: null, type: 'apple_pro', cr: 34 },
        { n: "iPhone 11", w: 310, h: 630, maskUrl: null, type: 'apple_vert_sq', cr: 34 },
        { n: "iPhone XR", w: 310, h: 630, maskUrl: null, type: 'apple_single', cr: 34 },
        { n: "iPhone XS Max", w: 320, h: 650, maskUrl: null, type: 'apple_pill', cr: 36 },
        { n: "iPhone X / XS", w: 300, h: 610, maskUrl: null, type: 'apple_pill', cr: 34 },
        { n: "iPhone SE (2022)", w: 280, h: 580, maskUrl: null, type: 'apple_single', cr: 28 },
        { n: "iPhone 7 / 8", w: 280, h: 580, maskUrl: null, type: 'apple_single', cr: 28 },
        { n: "iPhone 7 Plus / 8 Plus", w: 320, h: 640, maskUrl: null, type: 'apple_single', cr: 32 }
    ],
    Samsung: [
        { n: "Galaxy S24 Ultra", w: 330, h: 670, maskUrl: null, type: 's_ultra', cr: 16 },
        { n: "Galaxy S24+", w: 315, h: 650, maskUrl: null, type: 's_float', cr: 28 },
        { n: "Galaxy S24", w: 300, h: 620, maskUrl: null, type: 's_float', cr: 28 },
        { n: "Galaxy S24 FE", w: 315, h: 650, maskUrl: null, type: 's_float', cr: 28 },
        { n: "Galaxy S23 Ultra", w: 330, h: 670, maskUrl: null, type: 's_ultra', cr: 16 },
        { n: "Galaxy S23+", w: 315, h: 650, maskUrl: null, type: 's_float', cr: 26 },
        { n: "Galaxy S23", w: 290, h: 610, maskUrl: null, type: 's_float', cr: 28 },
        { n: "Galaxy S23 FE", w: 310, h: 640, maskUrl: null, type: 's_float', cr: 28 },
        { n: "Galaxy S22 Ultra", w: 330, h: 670, maskUrl: null, type: 's_ultra', cr: 16 },
        { n: "Galaxy S22+", w: 315, h: 650, maskUrl: null, type: 's_block_vert', cr: 26 },
        { n: "Galaxy S22", w: 290, h: 610, maskUrl: null, type: 's_block_vert', cr: 26 },
        { n: "Galaxy S21 Ultra", w: 330, h: 670, maskUrl: null, type: 's_ultra', cr: 24 },
        { n: "Galaxy S21 FE", w: 310, h: 640, maskUrl: null, type: 's_block_vert', cr: 28 },
        { n: "Galaxy S20 FE", w: 310, h: 640, maskUrl: null, type: 's_block_vert', cr: 28 },
        { n: "Galaxy A55", w: 315, h: 660, maskUrl: null, type: 's_float', cr: 26 },
        { n: "Galaxy A54", w: 310, h: 640, maskUrl: null, type: 's_float', cr: 26 },
        { n: "Galaxy A53 5G", w: 310, h: 640, maskUrl: null, type: 's_block_quad', cr: 26 },
        { n: "Galaxy A52 / A52s", w: 310, h: 640, maskUrl: null, type: 's_block_quad', cr: 26 },
        { n: "Galaxy A35", w: 315, h: 660, maskUrl: null, type: 's_float', cr: 26 },
        { n: "Galaxy A34", w: 315, h: 660, maskUrl: null, type: 's_float', cr: 26 },
        { n: "Galaxy A33", w: 310, h: 640, maskUrl: null, type: 's_block_quad', cr: 26 },
        { n: "Galaxy A25", w: 310, h: 650, maskUrl: null, type: 's_float', cr: 26 },
        { n: "Galaxy A24", w: 310, h: 650, maskUrl: null, type: 's_float', cr: 26 },
        { n: "Galaxy A15", w: 310, h: 650, maskUrl: null, type: 's_float', cr: 24 },
        { n: "Galaxy A14", w: 315, h: 660, maskUrl: null, type: 's_float', cr: 24 },
        { n: "Galaxy A13", w: 315, h: 660, maskUrl: null, type: 's_block_quad', cr: 24 },
        { n: "Galaxy A12", w: 315, h: 660, maskUrl: null, type: 's_block_quad', cr: 24 },
        { n: "Galaxy A05 / A05s", w: 315, h: 660, maskUrl: null, type: 's_float', cr: 24 }
    ],`;

html = html.replace(/function generatePerfectMask\(dev\) \{[\s\S]*?return 'data:image\/svg\+xml;charset=utf-8,'\+encodeURIComponent\(svg\);\n\}/, newEngine);
html = html.replace(/const DEVICES = \{[\s\S]*?Samsung: \[[\s\S]*?\],\n/m, devicesReplacementString + '\n');
fs.writeFileSync('index.html', html);
console.log('Fidelidade 100% atualizada');
