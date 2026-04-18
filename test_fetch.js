const https = require('https');

function checkUrl(url) {
    return new Promise((resolve) => {
        const options = {
            method: 'HEAD',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
            }
        };
        const req = https.request(url, options, (res) => {
            resolve(res.statusCode);
        });
        req.on('error', () => resolve(500));
        req.end();
    });
}

async function test() {
    const urls = [
        'https://cdn.gocase.com.br/v2/case-designer/devices/iphone-16-pro/iphone-16-pro.png',
        'https://cdn.gocase.com.br/v2/case-designer/devices/galaxy-s24-ultra/galaxy-s24-ultra.png',
        'https://cdn.gocase.com.br/v2/case-designer/devices/samsung-galaxy-s24-ultra/samsung-galaxy-s24-ultra.png',
        'https://cdn.gocase.com.br/v2/case-designer/devices/xiaomi-redmi-note-12/xiaomi-redmi-note-12.png',
        'https://cdn.gocase.com.br/v2/case-designer/devices/moto-g84/moto-g84.png'
    ];
    for (const url of urls) {
        const code = await checkUrl(url);
        console.log(`${code} -> ${url}`);
    }
}
test();
