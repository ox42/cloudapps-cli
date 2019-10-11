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

            return (new Promise(function(resolve, reject){
                download(server + filename, destination, function(err){
                    if (err) { return reject(err); }

                    success = true;
                    resolve(success);
                });
            })).delay(100);
        })
        .then(function(){
            if (success) {
                cb(null);
            } else {
                cb('Cannot download configuration file. Make sure you have an active internet connection.');
            }
        })
        .catch(function(err){
            console.error(err);
            cb('Cannot download configuration file. Make sure you have an active internet connection.');
        });
};


module.exports = fetch;
