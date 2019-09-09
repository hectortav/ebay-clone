const https = require('https');
const app = require('./app');
const fs = require('fs');

const port = process.env.PORT || 3000;

const server = https.createServer({
    key: fs.readFileSync('localhost.key'),
    cert: fs.readFileSync('localhost.cert')
}, app);

server.listen(port);

/*
var tls = require('tls');
var fs = require('fs');

var options = {
 key : fs.readFileSync('mykey.pem'),
 cert: fs.readFileSync('my-cert.pem')
}

tls.createServer(options,function(s)
{
 s.write("welcome!\n");
 s.pipe(s);
}).listen(3000);*/