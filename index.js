var path = require('path');
var ghost = require('ghost');
var custom_helpers = require('./helpers')();

ghost({
    config: path.join(__dirname, 'config.js')
}).then(function (ghostServer) {
    ghostServer.start();
});

