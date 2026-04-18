const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Atualizar o type do Redmi Note 13 na lista de DEVICES
html = html.replace(
    /\{ n: "Redmi Note 13", w: 315, h: 660, maskUrl: null, type: 'xiaomi_sq_2', cr: 28 \}/,
    `{ n: "Redmi Note 13", w: 315, h: 660, maskUrl: null, type: 'xiaomi_float_note13', cr: 30 }`
);

// Adicionar a nova topologia visual "xiaomi_float_note13" perto dos outros xiaomi_float
const newTopography = `    } else if (dev.type === 'xiaomi_float_note13') {
        // Redmi Note 13 (Flutuante, Sem Bloco, 2 Lentes Grandes na Esquerda, 1 Pequena + 1 Flash na Direita)
        cam += drawLens(BW+36, BW+36, 17); // Superior Esquerda (Main)
        cam += drawLens(BW+36, BW+86, 17); // Inferior Esquerda (Ultrawide)
        cam += drawLens(BW+78, BW+36, 9);  // Superior Direita (Macro)
        cam += \`<circle cx="\${BW+78}" cy="\${BW+72}" r="5" fill="#d4d4d8"/>\`; // Flash (Inferior Direita)`;

html = html.replace(
    /} else if \(dev\.type === 'xiaomi_float_tri'\) \{/,
    newTopography + '\n    } else if (dev.type === \'xiaomi_float_tri\') {'
);

fs.writeFileSync('index.html', html);
console.log('Topologia Redmi Note 13 Corrigida.');
