const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// REVERSÃO TOTAL DO CSS PARA O MODELO ESTÁVEL (SEM VH OU STICKY BUGADO)
const stableCSS = `:root {
            --primary: #6366f1;
            --primary-hover: #4f46e5;
            --surface: #18181b;
            --bg-body: #09090b;
            --text-dark: #fafafa;
            --text-gray: #a1a1aa;
            --border: #27272a;
            --radius-card: 24px;
            --radius-btn: 12px;
        }

        * { margin:0; padding:0; box-sizing:border-box; }
        body { 
            font-family: 'Inter', system-ui, sans-serif; 
            background: var(--bg-body); 
            color: var(--text-dark); 
            min-height: 100vh;
            overflow-y: auto;
        }

        header { text-align: center; padding: 30px 10px; }
        header h1 { font-size: 28px; letter-spacing: 1px; }

        .simulator-layout {
            display: flex;
            flex-wrap: wrap;
            max-width: 1100px;
            margin: 0 auto;
            gap: 30px;
            padding: 20px;
        }

        .mockup-area {
            flex: 1;
            min-width: 320px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #111;
            border-radius: var(--radius-card);
            padding: 40px 20px;
            border: 1px solid var(--border);
        }

        .canvas-container-shadow {
            box-shadow: 0 20px 50px rgba(0,0,0,0.7);
            border-radius: 40px;
        }

        .control-panel {
            flex: 1;
            min-width: 320px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .panel-header h2 { font-size: 22px; font-weight: 700; }
        .panel-header p { font-size: 14px; color: var(--text-gray); }

        .panel-body { display: flex; flex-direction: column; gap: 15px; }

        .input-group label {
            display: block; font-size: 12px; font-weight: 600; color: var(--text-gray); margin-bottom: 8px; text-transform: uppercase;
        }

        .custom-select {
            width: 100%; padding: 14px; border-radius: var(--radius-btn); border: 1px solid var(--border);
            background: var(--surface); color: var(--text-dark); font-size: 15px; cursor: pointer;
        }

        .upload-btn {
            display: flex; flex-direction: column; align-items: center; padding: 25px;
            border: 2px dashed var(--border); border-radius: 16px; cursor: pointer; background: var(--surface); gap: 8px;
        }
        .upload-btn:hover { border-color: var(--primary); }

        .editor-controls { background: var(--surface); padding: 20px; border-radius: 16px; display: none; flex-direction: column; gap: 15px; border: 1px solid var(--border); }
        .editor-controls.active { display: flex; }

        .slider-group { display: flex; flex-direction: column; gap: 5px; }
        .slider-group label { display: flex; justify-content: space-between; font-size: 11px; }
        
        input[type=range] { width: 100%; }

        .btn-primary {
            width: 100%; padding: 18px; background: var(--primary); color: white; border: none; border-radius: var(--radius-btn);
            font-weight: 700; cursor: pointer; text-transform: uppercase; margin-top: 10px;
        }

        .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 999; display: none; align-items: center; justify-content: center; }
        .modal.active { display: flex; }
        .modal-content { background: var(--surface); padding: 30px; border-radius: 20px; max-width: 90%; }
        .modal-img-container img { max-width: 100%; max-height: 60vh; }

        @media(max-width: 800px) {
            .simulator-layout { flex-direction: column; align-items: center; }
            .mockup-area { width: 100%; min-height: 450px; }
            .control-panel { width: 100%; }
        }`;

html = html.replace(/<style>[\s\S]*?<\/style>/m, `<style>${stableCSS}</style>`);

fs.writeFileSync('index.html', html);
console.log('Layout Estável Restaurado.');
