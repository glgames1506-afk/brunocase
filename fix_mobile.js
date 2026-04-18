const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Melhorando o CSS Responsivo
const oldMobileCss = `@media(max-width: 768px) {
            header { padding-top: 20px; }
            .simulator-layout { flex-direction: column; overflow-y: auto; padding: 10px; }
            .mockup-area { min-height: 500px; margin: 0 0 20px 0; }
            .control-panel { width: 100%; padding: 10px; }
        }`;

const newMobileCss = `@media(max-width: 768px) {
            header { padding: 20px 10px 0 10px; }
            header h1 { font-size: 22px !important; }
            .simulator-layout { flex-direction: column; padding: 10px; overflow: visible; }
            .mockup-area { 
                min-height: 450px; 
                margin: 0; 
                border-radius: 16px; 
                padding: 10px;
                order: 1; /* Mockup primeiro no mobile */
            }
            .control-panel { 
                width: 100%; 
                padding: 20px 0; 
                order: 2;
            }
            .panel-header h2 { font-size: 20px; }
            .custom-select { padding: 16px; font-size: 16px; } /* Maior para toque */
            .btn-primary { padding: 20px; font-size: 16px; }
            .canvas-container-shadow { transform-origin: center center; }
        }`;

html = html.replace(oldMobileCss, newMobileCss);

// 2. Melhorando a Lógica de Escalonamento Responsivo (JS)
const oldScaleLogic = `    // Escala Responsiva Visual (O Canvas lógico continua no tamanho real, só o visual css encolhe/cresce)
    const stageH = $('stage-area').clientHeight - 60;
    const scaleY = stageH / currentDevice.h;
    let finalScale = Math.min(1, scaleY); // Não deixa crescer mais de 1x, apenas encolhe
    $('canvas-wrapper').style.transform = \`scale(\${finalScale})\`;
    $('canvas-wrapper').style.width = \`\${currentDevice.w}px\`;
    $('canvas-wrapper').style.height = \`\${currentDevice.h}px\`;`;

const newScaleLogic = `    // Escala Responsiva Visual (Cross-device scaling inteligente)
    const stageH = $('stage-area').clientHeight - 40;
    const stageW = $('stage-area').clientWidth - 40;
    
    const scaleY = stageH / currentDevice.h;
    const scaleX = stageW / currentDevice.w;
    
    // Pega a menor escala para garantir que caiba tanto na largura quanto na altura
    let finalScale = Math.min(1, scaleY, scaleX);
    
    $('canvas-wrapper').style.transform = \`scale(\${finalScale})\`;
    $('canvas-wrapper').style.width = \`\${currentDevice.w}px\`;
    $('canvas-wrapper').style.height = \`\${currentDevice.h}px\`;`;

html = html.replace(oldScaleLogic, newScaleLogic);

fs.writeFileSync('index.html', html);
console.log('Responsividade Mobile Ajustada.');
