var fs = require('fs');
var path = require('path');
var expose = require('./expose');

function run() {
    //export global libraries
    expose('_', require('lodash'));
    expose('config', require('config'));
    expose('moment', require('moment'));
    expose('models', require('./models'));
    expose('asyncWrap', require('./asyncWrap'));

    //initialize database directories
    if (config.DATABASE.dialect === 'sqlite') {
        let directory = path.dirname(path.join(__dirname, config.DATABASE.storage));
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }
    }

    //sync database models
    if (config.DATABASE.alter) {
        models.sequelize.sync({ force: true, alter: true });
    } else {
        models.sequelize.sync();
    }
}

module.exports = {
    run: run
};
