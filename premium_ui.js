const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix the \n literal typo in the Panel Header
html = html.replace(/<h2>Painel de Produção<\/h2>\\n\s*<p>Estúdio B2B da Bruno Case\.<\/p>/g, 
    '<h2>Painel de Produção</h2>\\n<p>Estúdio de Personalização</p>'.replace('\\n', '')); // Removes the explicit string \\n

// 2. Remove the "SISTEMA B2B PREVIEW"
html = html.replace(/<p style="text-align: center; margin-top: 5px; color: var\(--text-gray\); font-size: 13px;">SISTEMA B2B PREVIEW<\/p>/g, '');

// 3. Upgrade the CSS to an ultra-premium, sleek aesthetic
const oldCssMatch = html.match(/:root \{[\s\S]*?<\/style>/)[0];

const premiumCSS = `:root {
            /* Premium Dark Mode Color Palette */
            --primary: #6366f1; /* Indigo sleek */
            --primary-hover: #4f46e5;
            --surface: #18181b; /* Zinc 900 */
            --bg-body: #09090b; /* Zinc 950 */
            --text-dark: #fafafa;
            --text-gray: #a1a1aa;
            --border: #27272a;
            --radius-card: 24px;
            --radius-btn: 12px;
            --shadow-soft: 0 10px 40px rgba(0, 0, 0, 0.5);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', system-ui, sans-serif; background: var(--bg-body); color: var(--text-dark); -webkit-font-smoothing: antialiased; }

        header {
            text-align: center;
            padding: 30px 20px 10px 20px;
        }

        .simulator-layout {
            display: flex;
            max-width: 1200px;
            margin: 0 auto;
            min-height: calc(100vh - 100px);
            align-items: stretch;
            padding-bottom: 40px;
        }

        /* ÁREA ESQUERDA (MOCKUP) */
        .mockup-area {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #18181b 0%, #09090b 100%);
            border-radius: var(--radius-card);
            margin: 20px;
            box-shadow: inset 0 0 100px rgba(0,0,0,0.5);
            overflow: hidden;
            border: 1px solid var(--border);
        }

        .canvas-container-shadow {
            box-shadow: 0 25px 60px rgba(0,0,0,0.8);
            border-radius: 46px; /* Para as bordas da base */
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        /* ÁREA DIREITA (CONTROLES) */
        .control-panel {
            width: 420px;
            background: var(--bg-body);
            display: flex;
            flex-direction: column;
            padding: 30px 20px 20px 10px;
        }

        .panel-header h2 { font-size: 22px; font-weight: 700; letter-spacing: -0.5px; }
        .panel-header p { font-size: 14px; color: var(--text-gray); margin-top: 5px; }

        .panel-body { margin-top: 30px; display: flex; flex-direction: column; gap: 20px; }

        .input-group label {
            display: block; font-size: 13px; font-weight: 600; color: var(--text-gray); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;
        }

        .custom-select {
            width: 100%;
            padding: 14px;
            border-radius: var(--radius-btn);
            border: 1px solid var(--border);
            appearance: none;
            background: var(--surface) url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a1a1aa' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e") no-repeat right 15px center;
            background-size: 16px;
            font-size: 15px; font-family: inherit; color: var(--text-dark); cursor: pointer; transition: 0.2s;
        }
        .custom-select:focus { border-color: var(--primary); outline: none; box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2); }

        .upload-btn {
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            border: 2px dashed var(--border); background: var(--surface); border-radius: 16px; padding: 30px 20px; cursor: pointer; transition: all 0.2s; gap: 10px;
        }
        .upload-btn:hover { border-color: var(--primary); background: rgba(99, 102, 241, 0.05); }
        .upload-btn svg { width: 32px; height: 32px; color: var(--primary); }
        .upload-btn span { font-size: 14px; font-weight: 600; color: var(--text-dark); }
        
        .editor-controls { background: var(--surface); padding: 20px; border-radius: 16px; display: none; flex-direction: column; gap: 16px; border: 1px solid var(--border); }
        .editor-controls.active { display: flex; }

        .slider-group { display: flex; flex-direction: column; gap: 8px; }
        .slider-group label { display: flex; justify-content: space-between; font-size: 12px; font-weight: 600; color: var(--text-gray); }
        
        input[type=range] { -webkit-appearance: none; width: 100%; background: transparent; }
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none; height: 18px; width: 18px; border-radius: 50%; background: var(--text-dark); cursor: pointer; margin-top: -7px; box-shadow: 0 2px 5px rgba(0,0,0,0.5);
        }
        input[type=range]::-webkit-slider-runnable-track { width: 100%; height: 4px; cursor: pointer; background: var(--border); border-radius: 2px; }

        .action-row { display: flex; gap: 10px; margin-top: 10px; }
        .btn-secondary { flex: 1; padding: 10px; border: 1px solid var(--border); border-radius: 8px; background: var(--surface); color: var(--text-dark); font-weight: 600; cursor: pointer; transition: 0.2s; }
        .btn-secondary:hover { background: #27272a; }

        .generate-btn-container { margin-top: auto; padding-top: 20px; }
        .btn-primary {
            width: 100%; padding: 18px; background: var(--primary); color: white; border: none; border-radius: var(--radius-btn); font-family: inherit; font-size: 15px; font-weight: 700; cursor: pointer;
            box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3); transition: all 0.2s; text-transform: uppercase; letter-spacing: 1px;
        }
        .btn-primary:hover { background: var(--primary-hover); transform: translateY(-2px); box-shadow: 0 12px 25px rgba(99, 102, 241, 0.4); }
        .btn-primary:active { transform: translateY(0); }

        .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 200; display: none; align-items: center; justify-content: center; backdrop-filter: blur(5px); }
        .modal.active { display: flex; }
        .modal-content { background: var(--surface); padding: 40px; border-radius: var(--radius-card); text-align: center; max-width: 90%; max-height: 90vh; overflow-y: auto; border: 1px solid var(--border); box-shadow: 0 20px 60px rgba(0,0,0,0.8); }
        .modal-img-container { margin: 25px 0; border: 1px solid var(--border); border-radius: 12px; overflow: hidden; background: #000; padding: 10px; }
        .modal-img-container img { max-width: 100%; max-height: 50vh; display: block; margin: 0 auto; border-radius: 8px; }
        .flex-btn-row { display: flex; gap: 12px; justify-content: center; }

        @media(max-width: 768px) {
            header { padding-top: 20px; }
            .simulator-layout { flex-direction: column; overflow-y: auto; padding: 10px; }
            .mockup-area { min-height: 500px; margin: 0 0 20px 0; }
            .control-panel { width: 100%; padding: 10px; }
        }

        /* Injecting custom color input fix */
        input[type=number] {
            background: var(--surface);
            color: var(--text-dark);
        }
    </style>`;

html = html.replace(oldCssMatch, premiumCSS);

// 4. Update the "DIMENSIONAMENTO MANUAL" box to fit the premium dark mode
html = html.replace(/<div class="input-group override-group"[^>]*>/g, 
    '<div class="input-group override-group" style="background: var(--surface); padding: 16px; border-radius: 16px; margin-top: 10px; border: 1px solid var(--border);">');
html = html.replace(/<button id="btn-apply-custom"[^>]*>APLICAR<\/button>/g,
    '<button id="btn-apply-custom" style="padding: 10px 20px; border-radius: 8px; border: none; background: var(--text-dark); color: var(--bg-body); cursor: pointer; font-weight: 700; font-family: inherit; font-size: 13px; transition: 0.2s;">APLICAR</button>');

// Fix header color logic to stand out nicely in dark mode!
html = html.replace(/stroke="var\(--primary\)"/g, 'stroke="var(--text-dark)"');
html = html.replace(/fill="var\(--primary\)"/g, 'fill="var(--text-dark)"');

fs.writeFileSync('index.html', html);
console.log('UI Premium Atualizada');
