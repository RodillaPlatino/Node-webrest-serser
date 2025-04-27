import fs from 'fs'
import http2 from 'http2';

const server = http2.createSecureServer({
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.crt'),       
}, (req, resp) => {

    if (req.url == '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        resp.writeHead(200, {'Content-Type': 'text/html'});
        resp.end(htmlFile);
        return;
    }

    try {     
        const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');

        if (req.url?.endsWith('.js')) {
            resp.writeHead(200, {'Content-Type': 'application/javascript'});
        } else if (req.url?.endsWith('.css')) {
            resp.writeHead(200, {'Content-Type': 'text/css'});
        } else {
            resp.writeHead(200, {'Content-Type': 'text/html'});
        }

        resp.end(responseContent);

    } catch (error) {
        resp.writeHead(404, {'Content-Type':'text/html'});
        resp.end('404 Not Found');
    }

});

server.listen(8080, () => {
    console.log('Server running on port 8080');
})
