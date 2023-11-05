const http = require('http');
const port = 5500;

const server = http.createserver((req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-type','text/plain');
    res.end ('hello World \n');
});

server.listen (port , hostname, ()=>{
    console.log ('Server running at hrrp://${hostname}:${port}/');
});