var fetch = require('../lib/fetch.js');
var chance = require('../lib/chance.js');

var fs = require('fs');
var path = require('path');
var process = require('process');
var inquirer = require('inquirer');

var packageInfo = require('../package.json');
var Promise = require('bluebird');
var AdmZip = require('adm-zip');

var run = function() {

    function majorVersion(version) {
        if (version.indexOf('.') !== version.lastIndexOf('.')) {
            let lastIndex = version.lastIndexOf('.');
            version = version.substring(0, lastIndex);
        }

        return version;
    }

    return Promise.resolve()
        .then(function(){

            console.log();
            console.log('Hello, nice developer.');
            console.log('Please wait, fetching templates...');
            console.log('=================');

            var templates_destination = chance.file();

            return new Promise(function(resolve, reject){
                fetch("list.json", templates_destination, function(err){
                    if (err) { return reject(err); }

                    console.log();
                    resolve(JSON.parse(fs.readFileSync(templates_destination, 'utf-8')));
                });
            });

        })
        .then(function(packageData){

            if (packageData && packageInfo && majorVersion(packageData.version) != majorVersion(packageInfo.version)) {

                //ask the user to update to a newer version
                console.error('\x1b[31m', 'You have an older version of the cloudapps cli.');
                console.error('Please update it using the command "npm install -g cloudapps" to continue.');
                console.error('\x1b[0m', '');
            }

            return packageData.templates;
        })
        .then(function(templates){

            if (!templates) {
                return Promise.reject('Please fix the errors above, and try again.');
            }

            console.log();
            console.log('Ok, let\'s start by setting up the new project...');
            console.log();

            return inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'Project name (ex. test): ',
                    },

                    {
                        type: 'list',
                        pageSize: 10,
                        name: 'template',
                        message: 'Choose a template: ',
                        choices: templates
                    }
                ])
                .then(answers => {
                    var destination = chance.file();

                    console.log(); console.log();
                    console.log('=================');
                    console.log('Fetching project archive...');


                    var directory_name = ((answers.name || '').trim().toLowerCase().replace(/[\W_]+/g, '-') || 'test');
                    var project_directory = path.join(process.cwd(), directory_name);

                    return new Promise(function(resolve, reject){
                        fetch(answers.template + '.zip', destination, function(err){

                            if (err) {
                                console.error('\x1b[31m', err);
                                console.log('\x1b[0m', '');

                                return reject('Ups, download failed. ' +
                                    'Please make sure you have an active Internet connection and try again.');
                            }

                            resolve();
                        });
                    }).then(function(){

                        if (fs.existsSync(project_directory)) {
                            return Promise.reject('Project directory already exists: ' + project_directory);
                        }

                        console.log('Creating directory: ' + project_directory);
                        fs.mkdirSync(project_directory);


                        return new Promise(function(resolve, reject){

                            var zip = new AdmZip(destination);
                            zip.extractAllToAsync(project_directory, false, function(error){
                                if (error) { return reject(error); }
                                resolve();
                            });

                        }).then(function(){

                            function recursiveWalk(directory) {

                                let list = fs.readdirSync(directory);
                                list.forEach(function(file) {
                                    file = directory + '/' + file;
                                    let stat = fs.statSync(file);

                                    if (stat && stat.isDirectory()) {
                                        recursiveWalk(file);
                                    } else {

                                        if (file.endsWith('.json') || file.endsWith('.js') || file.endsWith('.html') || file.indexOf('.env') >= 0) {

                                            let fileContents = fs.readFileSync(file, 'utf8');
                                            if (fileContents.includes('{CLOUDAPPS_RANDOM_STRING_VALUE}')) {
                                                fileContents = fileContents.replace(/{CLOUDAPPS_RANDOM_STRING_VALUE}/g, chance.hash());

                                                fs.writeFileSync(file, fileContents);
                                            }
                                        }
                                    }
                                });
                            }

                            recursiveWalk(project_directory);

                        }).then(function(){

                            if (fs.existsSync(path.join(project_directory, 'note.nfo'))) {

                                return new Promise(function(resolve){
                                    fs.readFile(path.join(project_directory, 'note.nfo'), 'utf8', function(error, content){

                                        if (!error && content) {
                                            resolve(content);
                                        } else {
                                            resolve(undefined);
                                        }
                                    });
                                });
                            } else {
                                return undefined;
                            }
                        }).then(function(note){

                            console.log('==================');
                            console.log();
                            console.log();
                            console.log('Project successfully created.');
                            console.log('Go to the project directory to play with it.');

                            if (note){
                                console.log();
                                console.log(note);
                                console.log();
                            }

                            console.log('Good luck, and don\'t forget to have fun!');
                        });


                    }).catch(function(err){
                        console.error('\x1b[31m', err);
                        console.error('\x1b[0m', '');
                    })

                });
        });
};

module.exports = run;
