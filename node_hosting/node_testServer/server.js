//Ce server n'est pas à utiliser car il n'est pas encore développé.

const http = require ('node:http');
const port = 3500;
// const fs = require ('node:fs')

const server=http.createServer((req,res)=>{
res.statusCode = 200;
res.setHeader('Content-Type', 'text/plain');
res.end ('Hello World');
});

server.listen(port, ()=>{
    console.log('ça fonctionne');
});
