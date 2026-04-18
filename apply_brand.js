const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Atualizar a Tag Title
html = html.replace(
    /<title>Simulador Pro - Fábrica de Capinhas<\/title>/g,
    '<title>Bruno Case - Simulador Oficial</title>'
);

// Atualizar o Header
const oldHeader = `<header>
        <h1>SIMULADOR DA FÁBRICA</h1>
    </header>`;
    
const newHeader = `<header style="margin-bottom: 25px;">
        <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="3" ry="3"></rect>
                <circle cx="15" cy="6" r="1.5" fill="var(--primary)"></circle>
                <path d="M10 6h1"></path>
                <path d="M12 19h.01"></path>
            </svg>
            <h1 style="font-size: 28px; margin: 0; letter-spacing: 1px;">BRUNO CASE</h1>
        </div>
        <p style="text-align: center; margin-top: 5px; color: var(--text-gray); font-size: 13px;">SISTEMA B2B PREVIEW</p>
    </header>`;

html = html.replace(oldHeader, newHeader);

// Para garantir caso o title seja diferente do esperado, podemos tentar substituir o painel H2 também.
html = html.replace(
    /<h2>Crie sua arte<\/h2>\s*<p>Simulador para personalização de capinhas.<\/p>/g,
    '<h2>Painel de Produção</h2>\\n                <p>Estúdio B2B da Bruno Case.</p>'
);

fs.writeFileSync('index.html', html);
console.log('Logo Bruno Case Aplicada.');
