const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const newEngine = `// Gerador Principal em SVG com Arquitetura Fotorrealista (Render Engine 3D Nativa)
function generatePerfectMask(dev) {
    const W = dev.w, H = dev.h, CR = dev.cr;
    const BW = 14; 
    let cam = '';
    
    // Motor de Renderização de Texturas e Luzes (Glassmorphism 3D)
    const defs = \`<defs>
        <!-- Sombra externa de Estúdio (Mesa) -->
        <filter id="studio-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="-8" dy="15" stdDeviation="12" flood-color="#000" flood-opacity="0.6"/>
            <feDropShadow dx="2" dy="5" stdDeviation="4" flood-color="#000" flood-opacity="0.3"/>
        </filter>
        
        <!-- Base de Silicone Fosco Premium -->
        <linearGradient id="tpu-base" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#2a2a2d"/>
            <stop offset="10%" stop-color="#141415"/>
            <stop offset="50%" stop-color="#050505"/>
            <stop offset="90%" stop-color="#09090b"/>
            <stop offset="100%" stop-color="#1a1a1c"/>
        </linearGradient>
        
        <!-- Aro Metálico Realista das Lentes -->
        <linearGradient id="metal-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#d4d4d8"/>
            <stop offset="25%" stop-color="#52525b"/>
            <stop offset="50%" stop-color="#18181b"/>
            <stop offset="80%" stop-color="#3f3f46"/>
            <stop offset="100%" stop-color="#a1a1aa"/>
        </linearGradient>

        <!-- Vidro da Lente de Câmera (Com brilho esférico central) -->
        <radialGradient id="lens-glass" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#52525b"/>
            <stop offset="15%" stop-color="#18181b"/>
            <stop offset="50%" stop-color="#050505"/>
            <stop offset="85%" stop-color="#000"/>
            <stop offset="100%" stop-color="#27272a"/>
        </radialGradient>

        <!-- Reflexo Frontal de Vitrine (Glare cobrindo tudo) -->
        <linearGradient id="glass-glare" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="rgba(255,255,255,0.2)"/>
            <stop offset="15%" stop-color="rgba(255,255,255,0.05)"/>
            <stop offset="30%" stop-color="rgba(255,255,255,0)"/>
            <stop offset="70%" stop-color="rgba(255,255,255,0)"/>
            <stop offset="100%" stop-color="rgba(255,255,255,0.03)"/>
        </linearGradient>
    </defs>\`;

    const lensFilter = 'filter="url(#studio-shadow)"';

    // Helper lenses
    const drawLens = (cx, cy, r) => \`<circle cx="\${cx}" cy="\${cy}" r="\${r}" fill="url(#lens-glass)" stroke="url(#metal-ring)" stroke-width="\${r*0.15}"/>
                                     <circle cx="\${cx - r*0.3}" cy="\${cy - r*0.3}" r="\${r*0.1}" fill="#fff" opacity="0.6"/>\`; // Micro reflexo

    // Construtor Lógico das Câmeras (Agora com Sombreamento Fisicamente Correto)
    if(dev.type === 'pro') {
        cam += \`<rect x="\${BW+6}" y="\${BW+6}" width="105" height="108" rx="26" fill="url(#tpu-base)" \${lensFilter} stroke="#3f3f46" stroke-width="1.5"/>\`;
        cam += drawLens(BW+36, BW+36, 18);
        cam += drawLens(BW+82, BW+36, 18);
        cam += drawLens(BW+36, BW+82, 18);
        cam += \`<circle cx="\${BW+82}" cy="\${BW+82}" r="8" fill="#e4e4e7" stroke="#71717a" stroke-width="2"/>\`; // Flash 
        cam += \`<circle cx="\${BW+82}" cy="\${BW+60}" r="4" fill="#111"/>\`; // Lidar
    } else if (dev.type === 'std') {
        cam += \`<rect x="\${BW+8}" y="\${BW+8}" width="85" height="85" rx="22" fill="url(#tpu-base)" \${lensFilter} stroke="#3f3f46" stroke-width="1.5"/>\`;
        cam += drawLens(BW+32, BW+32, 17);
        cam += drawLens(BW+68, BW+68, 17);
        cam += \`<circle cx="\${BW+70}" cy="\${BW+26}" r="7" fill="#e4e4e7"/>\`; 
    } else if (dev.type === 'apple_vert') {
        cam += \`<rect x="\${BW+8}" y="\${BW+8}" width="55" height="100" rx="26" fill="url(#tpu-base)" \${lensFilter} stroke="#3f3f46" stroke-width="1"/>\`;
        cam += drawLens(BW+35, BW+35, 16);
        cam += drawLens(BW+35, BW+80, 16);
        cam += \`<circle cx="\${BW+75}" cy="\${BW+58}" r="6" fill="#e4e4e7"/>\`;
    } else if (dev.type === 's_ultra') {
        const cx = BW + 28;
        cam += drawLens(cx, BW+35, 17);
        cam += drawLens(cx, BW+80, 17);
        cam += drawLens(cx, BW+125, 17);
        cam += drawLens(cx+32, BW+50, 9);
        cam += \`<circle cx="\${cx+32}" cy="\${BW+95}" r="7" fill="#e4e4e7" stroke="#71717a" stroke-width="2"/>\`;
    } else if (dev.type === 'ultra') {
        const cx = BW + 28;
        cam += drawLens(cx, BW+35, 16);
        cam += drawLens(cx, BW+80, 16);
        cam += drawLens(cx, BW+125, 16);
        cam += \`<circle cx="\${cx+30}" cy="\${BW+55}" r="6" fill="#e4e4e7"/>\`;
    } else if (dev.type === 'moto_std') {
        cam += \`<rect x="\${BW+12}" y="\${BW+12}" width="65" height="120" rx="18" fill="url(#tpu-base)" \${lensFilter}/>\`;
        cam += drawLens(BW+45, BW+45, 19);
        cam += drawLens(BW+45, BW+100, 19);
        cam += \`<circle cx="\${BW+85}" cy="\${BW+72}" r="6" fill="#e4e4e7"/>\`;
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
        cam += \`<circle cx="\${W/2 + 75}" cy="\${BW+38}" r="5" fill="#e4e4e7"/>\`;
    }

    // Path vazado Master (Silicone Flexível Case): 
    // Frame GERAL externo preenchido de TPU Base, vazando a geometria do celular interno
    function rrp(x,y,w,h,r){return \`M\${x+r},\${y}h\${w-2*r}a\${r},\${r} 0 0 1 \${r},\${r}v\${h-2*r}a\${r},\${r} 0 0 1 -\${r},\${r}h-\${w-2*r}a\${r},\${r} 0 0 1 -\${r},-\${r}v-\${h-2*r}a\${r},\${r} 0 0 1 \${r},-\${r}z \`;}
    function rrc(x,y,w,h,r){return \`M\${x+r},\${y}a\${r},\${r} 0 0 0 -\${r},\${r}v\${h-2*r}a\${r},\${r} 0 0 0 \${r},\${r}h\${w-2*r}a\${r},\${r} 0 0 0 \${r},-\${r}v-\${h-2*r}a\${r},\${r} 0 0 0 -\${r},-\${r}z \`;}

    // O Render Final joga a Borda preta Premium + Camadas de Câmera + Reflexo de Vidro Geral
    const svg = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${W}" height="\${H}" style="overflow: visible">
        \${defs}
        <!-- Bumper TPU (Com Sombra Global) -->
        <path filter="url(#studio-shadow)" fill-rule="evenodd" fill="url(#tpu-base)" d="\${rrp(0,0,W,H,CR)}\${rrc(BW,BW,W-BW*2,H-BW*2,Math.max(8,CR-BW/2))}"/>
        <!-- Reflexo de Borda Interno -->
        <path fill="none" stroke="#3f3f46" stroke-width="2" d="\${rrp(BW,BW,W-BW*2,H-BW*2,Math.max(8,CR-BW/2))}"/>
        \${cam}
        <!-- Camada Alpha Final: Reflexo Frontal Simulando Policarbonato Brilhante -->
        <path fill="url(#glass-glare)" d="\${rrp(0,0,W,H,CR)}"/>
    </svg>\`;
    
    return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}`

html = html.replace(/function generatePerfectMask\(dev\) \{[\s\S]*?return 'data:image\/svg\+xml;charset=utf-8,'\+encodeURIComponent\(svg\);\n\}/, newEngine);
fs.writeFileSync('index.html', html);
console.log('Update done.');
