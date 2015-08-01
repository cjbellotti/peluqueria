var app = require('express')();

var fs = require('fs');

var files = fs.readdirSync(__dirname + '/./services');

for (var index in files) {
    console.log ('Publishing service %s...', files[index].substring(0, files[index].indexOf('.js')));
    app.use(require('./services/' + files[index]));
}

module.exports = app;
