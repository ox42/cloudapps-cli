var path = require('path');

var os = require('os');
var crypto = require('crypto');

var fileCreate = function() {
    var firstTemporaryString = crypto.randomBytes(4).readUInt32LE(0);
    var secondTemporaryString = Math.round(Math.random() * 10000000000);

    var filename = 'cloudapps-' + firstTemporaryString  + '-' + secondTemporaryString  + '.tmp';
    var destination = path.join(os.tmpdir(), filename);

    return destination;
};


var hashCreate = function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 30; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

module.exports = {
    file: fileCreate,
    hash: hashCreate
};
