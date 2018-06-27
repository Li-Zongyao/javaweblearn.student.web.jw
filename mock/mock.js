var todayDate = new Date();
var responses = { };

var fs = require('fs');
var path = require('path');
var dirs = fs.readdirSync(path.join(__dirname) + '/data');

dirs.forEach(function (file) {
    var mockdata = require('./data/' + file);
    if (mockdata.data) {
        Object.assign(responses, mockdata.data);
    }
});

exports.getResponse = function (request) {
    var path = request.url;
    var method = request.method;

    var key = "";
    for (var k in responses) {
        var p = new RegExp(k);
        if (p.test(path)) {
            console.log(path);
            console.log(k);
            key = k;
            break;
        }
    }
    if (!method) method = 'GET';
    var results = responses[key];
    if (undefined == results) return false;

    var resp = results[method];
    if (undefined == results) return false;
    return resp;
};