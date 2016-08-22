var random = require("random-js")(); // uses the nativeMath engine
var http = require('http');
var ip   = "0.0.0.0", port = 8082;

http.createServer(function(req, res) {

    if(req.url!='/polling') {
        res.writeHead(404, {'Content-Type':'text/plain'});
        res.end();
        return false;
    }

    var timeout;
    var cnt = 0;
    var start = new Date();

    function polling (req, res) {
        var random_val = random.integer(1, 100); // Just use with the demo
        var current = new Date();

        console.log('Random Value:' + random_val + ', running:' + cnt + ', time:' + parseInt(current - start));

        if (timeout) {
            clearTimeout(timeout);
        }

        if (parseInt(current - start) > 25000) {
            res.writeHead(200, {'Content-Type':'text/plain'});
            res.end('Please Connect Again !!');
            return false;
        }

        // You can try to get Data and reply client here
        if (random_val > 90) {
            res.writeHead(200, {'Content-Type':'text/plain'});
            res.end('Getting Data Successfully !!');
            return false;
        }        

        cnt++;
        timeout = setTimeout(function() { polling(req, res) }, 5000);
    }

    polling(req, res);

}).listen(port, ip);

console.log('Server Listening at http://' + ip + ':' + port + '/');
