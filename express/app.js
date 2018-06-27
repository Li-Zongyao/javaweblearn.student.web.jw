var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.send('Hello World!');
    var url = req.query.url;
    var name = req.query.name;
    console.log(url, name);
});

app.post('/login', function (req, res) {
    var body = req.body;
    console.log(body);
    if(body.username=='student' && body.password=='123456'){
        res.send({"status":"success"});
    }else{
        res.send({"status":"failure"});
    }

});

app.post('/register', function (req, res) {
    var body = req.body;
    console.log(body);
    res.send({"status":"success"});
});

app.post('/forgot', function (req, res) {
    var body = req.body;
    console.log(body);
    res.send({"status":"success"});
});

app.post('/addstudent', function (req, res) {
    var body = req.body;
    console.log(body);
    res.send({"status":"success"});
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});