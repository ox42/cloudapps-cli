var Promise = require('bluebird');
jest.mock('inquirer');
jest.setTimeout(3 * 60 * 1000);


const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const process = require('process');
const new_project = require('../cmds/new_project');

const { expectPrompts } = require('inquirer');


async function clearDirectory(tests_directory) {

    if (tests_directory && tests_directory.indexOf('temp') >= 0) {
        await (new Promise(function(resolve, reject){

            rimraf(tests_directory, (err) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }

                resolve();
            });
        }));
    }

}

it('should create a valid directory', async () => {
    let tests_directory = path.join(__dirname, '/temp');
    let templates = (require('../templates/list.json')).templates;

    if (tests_directory && templates.length > 0) {

        console.log('Planning to test ' + templates.length + ' templates.');
        console.log('Creating a directory: ', tests_directory);

        await clearDirectory(tests_directory);
        fs.mkdirSync(tests_directory);

        process.chdir(tests_directory);

        for (let template=0; template < templates.length; template++) {
            await Promise.delay(500);

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

            await new_project();
        }


        await Promise.delay(1000);
        process.chdir(__dirname);
        await clearDirectory(tests_directory);
    }
});
