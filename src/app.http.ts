import http from 'http';
import fs from 'fs'


const server = http.createServer((req, resp)=>{
    console.log(req.url)

    // resp.writeHead(200, {'Content-Type': 'text/html'});
    // resp.write(``)
    // resp.end

    // const data = {name: 'Jhon Doe', age:30, city: 'New York'};
    // resp.writeHead(200, {'Content-Type': 'application/json'});
    // resp.end(JSON.stringify(data))

    if(req.url == '/'){
        const htmlFile = fs.readFileSync('./public/index.html','utf-8');
        resp.writeHead(200, {'Content-Type': 'text/html'});
        resp.end(htmlFile);
        return
    }

    if(req.url?.endsWith('.js')){
        resp.writeHead(200, {'Content-Type': 'application/javascript'});
    } else if(req.url?.endsWith('.css')){
        resp.writeHead(200,  {'Content-Type': 'test/css'});
    }

    const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
    resp.end(responseContent);


});


server.listen(8080,()=>{
    console.log('Server running on port 8080')
})