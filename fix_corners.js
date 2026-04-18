const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix the generatePerfectMask to include a "Corner Mask" layer
// This layer fills the 4 sharp corners of the canvas so the rounded phone looks clean
const oldSvgTemplate = /const svg = `<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" width="\$\{W\}" height="\$\{H\}">[\s\S]*?<\/svg>`;/m;

const newSvgTemplate = `const svg = \`<svg xmlns="http://www.w3.org/2000/svg" width="\${W}" height="\${H}">
        \${defs}
        <!-- MÁSCARA DE CANTO: Limpa as sobras quadradas fora do arredondado do celular -->
        <path fill="#09090b" d="M0,0 H\${W} V\${H} H0 Z \${rrp(0,0,W,H,CR)}" fill-rule="evenodd" />
        
        <!-- Bumper Flat (Minimalista) -->
        <path fill-rule="evenodd" fill="#222" opacity="0.95" d="\${rrp(0,0,W,H,CR)}\${rrc(BW,BW,W-BW*2,H-BW*2,Math.max(8,CR-BW/2))}"/>
        
        <!-- Linha interna fina -->
        <path fill="none" stroke="#000" stroke-width="1.5" opacity="0.3" d="\${rrp(BW,BW,W-BW*2,H-BW*2,Math.max(8,CR-BW/2))}"/>
        \${cam}
    </svg>\`;`;

html = html.replace(oldSvgTemplate, newSvgTemplate);

// 2. Set Canvas Background to transparent
html = html.replace(/backgroundColor: '#ffffff'/g, "backgroundColor: 'transparent'");

fs.writeFileSync('index.html', html);
console.log('Cantos arredondados corrigidos e máscara de fundo aplicada.');
