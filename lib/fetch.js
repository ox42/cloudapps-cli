var Promise = require('bluebird');
var config = require('../config/config.json');
var download = require('./download.js');

var fetch = function(filename, destination, cb) {

    var success = false;
    return Promise.resolve(config.cdn)
        .mapSeries(function(server){

            if (success) {
                return false;
            }

            return new Promise(function(resolve, reject){
                download(server + filename, destination, function(err){
                    if (err) { return reject(err); }

                    success = true;
                    resolve(success);
                });
            });
        })
        .then(function(reses){
            if (success) {
                cb(null);
            } else {
                cb('Cannot download configuration file.');
            }
        })
        .catch(function(){
            cb('Cannot download configuration file.');
        });
};


module.exports = fetch;