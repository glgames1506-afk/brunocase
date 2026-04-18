const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Injetando HTML UI
const targetHTML = `<div class="input-group" style="margin-top: 10px;">
                    <label>Imagem da Arte</label>`;

const newHTML = `<div class="input-group override-group" style="background: var(--bg-body); padding: 12px; border-radius: 12px; margin-top: 10px; border: 1px dashed var(--border);">
                    <label style="margin-bottom: 8px; color: var(--text-gray); font-size: 11px; font-weight: 700;">OU TAMANHO ESPECÍFICO MANUAL (EM MILÍMETROS)</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="number" id="custom-w" placeholder="Largura (ex: 75)" style="flex:1; padding: 10px; border: 1px solid var(--border); border-radius: 8px; font-family: inherit; font-size: 13px;">
                        <input type="number" id="custom-h" placeholder="Altura (ex: 155)" style="flex:1; padding: 10px; border: 1px solid var(--border); border-radius: 8px; font-family: inherit; font-size: 13px;">
                        <button id="btn-apply-custom" style="padding: 10px 15px; border-radius: 8px; border: none; background: #3f3f46; color: white; cursor: pointer; font-weight: bold; font-family: inherit; font-size: 12px; transition: 0.2s;">APLICAR</button>
                    </div>
                </div>

                <div class="input-group" style="margin-top: 15px;">
                    <label>Imagem da Arte</label>`;

html = html.replace(targetHTML, newHTML);

// Injetando Lógica JS no setupSimulator
const targetJS = `function setupSimulator() {
    const brand = brandCombo.value;
    const idx = modelCombo.value;
    currentDevice = DEVICES[brand][idx];`;

const newJS = `function setupSimulator(skipDeviceOverride = false) {
    if(!skipDeviceOverride) {
        const brand = brandCombo.value;
        const idx = modelCombo.value;
        if(brand && idx && DEVICES[brand][idx]) {
            currentDevice = DEVICES[brand][idx];
        }
    }`;

html = html.replace(targetJS, newJS);

// Injetando Event Listeners no final do script
const eventTarget = `modelCombo.onchange = setupSimulator;`;
const newEvents = `modelCombo.onchange = () => setupSimulator(false);

$('btn-apply-custom').onclick = () => {
    const cw = parseFloat($('custom-w').value);
    const ch = parseFloat($('custom-h').value);
    if(!cw || !ch) { alert("Erro: Defina a largura e a altura do aparelho bruto em Milímetros (ex: 75 e 155)."); return; }
    
    // Pixel ratio de conversão aproximado do nosso layout base para renderização em milímetros
    const PX_PER_MM = 4.15; 
    currentDevice = {
        n: \`Personalizado (\${cw} x \${ch} mm)\`,
        w: Math.round(cw * PX_PER_MM),
        h: Math.round(ch * PX_PER_MM),
        maskUrl: null,
        type: 'fallback', 
        cr: 22 
    };
    
    setupSimulator(true);
};`;

html = html.replace(eventTarget, newEvents);

fs.writeFileSync('index.html', html);
console.log('Ferramenta de Dimensões Customizadas (MM) Acoplada.');
