var https = require('https');
var fs = require('fs');

var download = function(url, destination, cb) {
    var file = fs.createWriteStream(destination);

    https.get(url, function(response) {

        if (response.aborted || (response.statusCode && response.statusCode >= 400)) {
            return cb('Invalid response: ' + response.statusCode);
        } else {

            response.pipe(file);
            file.on('finish', function() {
                file.close(cb);
            });
        }

    }).on('error', function(err) {
        fs.unlink(destination, function(){});
        if (cb) cb(err.message);
    });
};

module.exports = download;
