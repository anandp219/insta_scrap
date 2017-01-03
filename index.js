var http = require("http");
var url = require('url');
var req = require('request')


http.createServer(function(request, response) {
    if (request.url === '/favicon.ico') {
        response.writeHead(200, {'Content-Type': 'image/x-icon'} );
        response.end();
        return;
    }
    var parts = url.parse(request.url, true);
    var query = parts.query;
    username = query["username"]
    var isPrivate = true
    if(username) {
        console.log(username)
        req('https://instagram.com/' +username+ "/" , function (error, resp, body) {
            //Check for error
            if(error){
                return console.log('Error:', error);
            }

            //Check for right status code
            if(resp.statusCode !== 200){
                return console.log('Invalid Status Code Returned:', response.statusCode);
            }

            if(body.indexOf('"is_private": false') > -1) {
                isPrivate = false
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.write(isPrivate.toString());
                response.end();
            } else {
                isPrivate = true
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.write(isPrivate.toString());
                response.end();
            }

        });
    } else {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("No username");
        response.end();
    }
}).listen(process.env.PORT || 5000);