const https = require('https');

https.get('https://www.gocase.com.br/capinha-para-celular-minha-cara/p', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const matches = data.match(/https:\/\/[a-zA-Z0-9\-\.]+\.vtexassets\.com\/arquivos\/ids\/[0-9]+[^\s"']*/g);
        if(matches) {
            const unique = [...new Set(matches)];
            console.log(unique.filter(u => u.includes('capinha')).slice(0, 20).join('\n'));
        }
    });
});
