var path = require('path');

var os = require('os');
var crypto = require('crypto');

var create = function() {
    var firstTemporaryString = crypto.randomBytes(4).readUInt32LE(0);
    var secondTemporaryString = Math.round(Math.random() * 10000000000);

    var filename = 'cloudapps-' + firstTemporaryString  + '-' + secondTemporaryString  + '.tmp';
    var destination = path.join(os.tmpdir(), filename);

    return destination;
};

module.exports = create;
