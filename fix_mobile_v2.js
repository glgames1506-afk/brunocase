const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Tornando a Lógica de Resize global e automática
const resizeLogicReplacement = `    resizeCanvasVisual();
    
    // Aplica OVERLAY
    let src = currentDevice.maskUrl || generatePerfectMask(currentDevice);
    fabric.Image.fromURL(src, img => {
        fabricCanvas.setOverlayImage(img, fabricCanvas.renderAll.bind(fabricCanvas), {
            scaleX: currentDevice.w / img.width, 
            scaleY: currentDevice.h / img.height,
            crossOrigin: 'anonymous'
        });
    });

    resetEditor();
}

function resizeCanvasVisual() {
    if(!currentDevice || !fabricCanvas) return;
    
    // Força o browser a recalcular o layout antes de medir
    const stage = $('stage-area');
    const stageH = stage.offsetHeight - 40;
    const stageW = stage.offsetWidth - 40;
    
    const scaleY = stageH / currentDevice.h;
    const scaleX = stageW / currentDevice.w;
    
    let finalScale = Math.min(1, scaleY, scaleX);
    
    const wrapper = $('canvas-wrapper');
    wrapper.style.transform = \`scale(\${finalScale})\`;
    wrapper.style.width = \`\${currentDevice.w}px\`;
    wrapper.style.height = \`\${currentDevice.h}px\`;
}

window.addEventListener('resize', resizeCanvasVisual);
window.addEventListener('orientationchange', () => setTimeout(resizeCanvasVisual, 100));`;

html = html.replace(/    \/\/ Escala Responsiva Visual[\s\S]*?resetEditor\(\);\n\}/m, resizeLogicReplacement);

// 2. Forçando o mockup-area a ter um tamanho fixo mínimo no mobile para o JS medir certo
html = html.replace(/.mockup-area \{[\s\S]*?flex: 1;/, '.mockup-area {\n            position: relative;\n            flex: 1;');

// 3. Garantindo que o commit e push ocorram após a mudança
fs.writeFileSync('index.html', html);
console.log('Mobile Engine V2 (Auto-Resize) Implantado.');
