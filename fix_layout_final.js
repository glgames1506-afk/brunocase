const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Refatoração Total do CSS de Layout e Responsividade
const layoutReplacement = `        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Inter', system-ui, sans-serif; 
            background: var(--bg-body); 
            color: var(--text-dark); 
            -webkit-font-smoothing: antialiased;
            overflow-x: hidden;
            overflow-y: auto; /* Garante scroll natural */
            min-height: 100vh;
        }

        header {
            text-align: center;
            padding: 20px;
        }

        .simulator-layout {
            display: flex;
            max-width: 1200px;
            margin: 0 auto;
            gap: 20px;
            padding: 0 20px 40px 20px;
        }

        /* ÁREA ESQUERDA (MOCKUP) */
        .mockup-area {
            position: sticky; /* Trava o celular na tela enquanto rola os controles no desktop */
            top: 20px;
            flex: 1.2;
            height: calc(100vh - 120px);
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #18181b 0%, #09090b 100%);
            border-radius: var(--radius-card);
            box-shadow: inset 0 0 100px rgba(0,0,0,0.5);
            overflow: hidden;
            border: 1px solid var(--border);
        }

        .canvas-container-shadow {
            box-shadow: 0 25px 60px rgba(0,0,0,0.8);
            border-radius: 46px; 
            transition: all 0.3s ease;
        }

        /* ÁREA DIREITA (CONTROLES) */
        .control-panel {
            flex: 0 0 400px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        @media(max-width: 900px) {
            .simulator-layout {
                flex-direction: column;
                padding: 10px;
            }
            .mockup-area {
                position: relative;
                top: 0;
                width: 100%;
                height: 55vh; /* Celular ocupa metade da tela no mobile */
                min-height: 400px;
                margin-bottom: 20px;
            }
            .control-panel {
                width: 100%;
                flex: none;
                padding: 0 10px;
            }
            header h1 { font-size: 24px !important; }
        }`;

html = html.replace(/\* \{ margin: 0;[\s\S]*?\.control-panel \{[\s\S]*?\}[\s\S]*?@media\(max-width: 768px\) \{[\s\S]*?\}/m, layoutReplacement);

// 2. Garante que o scroll para o topo ocorra ao trocar de marca/modelo no mobile
html = html.replace(/brandCombo\.onchange = \(\) => \{/g, "brandCombo.onchange = () => {\n    if(window.innerWidth < 900) window.scrollTo({top: 0, behavior: 'smooth'});");

fs.writeFileSync('index.html', html);
console.log('Layout Ultra-Moderno (PC & Mobile) Aplicado.');
