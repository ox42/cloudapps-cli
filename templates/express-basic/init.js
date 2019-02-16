var expose = require('./expose');

function run() {
    expose('_', require('lodash'));
    expose('config', require('config'));
    expose('moment', require('moment'));
    expose('asyncWrap', require('./asyncWrap'));
}

module.exports = {
    run: run
};
