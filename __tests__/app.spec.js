var Promise = require('bluebird');
jest.mock('inquirer');
jest.setTimeout(3 * 60 * 1000);


const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const process = require('process');
const new_project = require('../cmds/new_project');

const { expectPrompts } = require('inquirer');


function clearDirectory(tests_directory) {

    if (tests_directory && tests_directory.indexOf('temp') >= 0) {
        return (new Promise(function(resolve, reject){

            rimraf(tests_directory, (err) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }

                resolve();
            });
        }));
    }

    return Promise.resolve();
}

it('should extract the necessary templates', function() {
    let tests_directory = path.join(__dirname, '/temp');
    let templates = (require('../templates/list.json')).templates;

    if (tests_directory && templates.length > 0) {

        console.log('Planning to test ' + templates.length + ' templates.');
        console.log('Creating a directory: ', tests_directory);

        return Promise.resolve()
            .then(function(){
                return clearDirectory(tests_directory);
            })
            .then(function(){

                fs.mkdirSync(tests_directory);
                process.chdir(tests_directory);
            })

            .then(function(){

                let iterate_templates = [];
                for (let template=0; template < templates.length; template++) {
                    iterate_templates.push(template);
                }

                return iterate_templates;
            })
            .mapSeries(function(template){

                let directory_name = 'test-' + templates[template].value;
                console.log('Checking template: ' + templates[template].value);

                expectPrompts([
                    {
                        message: 'Project name (ex. test): ',
                        input: directory_name
                    },
                    {
                        message: 'Choose a template: ',
                        choose: template
                    }
                ]);

                return Promise.resolve()
                    .then(function(){
                        return new_project();
                    })
                    .delay(100)
                    .then(function(){

                        let stat = fs.statSync(directory_name);
                        if (!stat || !stat.isDirectory()) {
                            return Promise.reject('No directory created for template: ' + directory_name);
                        }
                    });
            })

            .delay(1000)
            .then(function(){
                process.chdir(__dirname);
                return clearDirectory(tests_directory);
            })
            .then(function(){
                console.log('Test completed successfully!');
            });
    }
});
