var PORT = 18888;

var http = require('http');
var url=require('url');
var fs=require('fs');
var mine=require('./mine').types;
var path=require('path');
var mock=require('./mock');

var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var realPath = path.join(".", pathname);
    console.log(realPath);
    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    console.log(ext);
    fs.exists(realPath, function (exists) {
        if (!exists) {
            var mockResponse = mock.getResponse(request);
            if (mockResponse) {
                response.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                response.write(JSON.stringify(mockResponse));
                response.end();
            } else {
                response.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                response.write("This request URL " + pathname + " was not found on this server.");
                response.end();
            }
        } else {
            console.log(realPath);
            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
                } else {
                    var contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
});

server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");
