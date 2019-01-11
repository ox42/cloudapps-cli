var fetch = require('../lib/fetch.js');
var chance = require('../lib/chance.js');

var fs = require('fs');
var path = require('path');
var process = require('process');
var inquirer = require('inquirer');

var run = function() {

    return Promise.resolve()
        .then(function(){

            console.log();
            console.log('Hello, nice developer.');
            console.log('Please wait, fetching templates...');
            console.log('=================');

            var templates_destination = chance();

            return new Promise(function(resolve, reject){
                fetch("list.json", templates_destination, function(err){
                    if (err) { return reject(err); }

                    console.log();
                    resolve(JSON.parse(fs.readFileSync(templates_destination, 'utf-8')));
                });
            });

        })
        .then(function(templates){

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
                        name: 'template',
                        message: 'Choose a template: ',
                        choices: templates
                    }
                ])
                .then(answers => {
                    var destination = chance();

                    console.log(); console.log();
                    console.log('=================');
                    console.log('Fetching project archive...');


                    var directory_name = (answers.name || '').trim().toLowerCase().replace(/[\W_]+/g, '_');
                    var project_directory = path.join(process.cwd(), directory_name);

                    return new Promise(function(resolve, reject){
                        fetch(answers.name, destination, function(err){

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

                            console.log('==================');
                            console.log('Project successfully created.');
                            console.log('Go to the project directory to start working on it.');
                            console.log('Good luck!');
                        });


                    }).catch(function(err){
                        console.error('\x1b[31m', err);
                        console.log('\x1b[0m', '');
                    })

                });
        });
};

module.exports = run;
