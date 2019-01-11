#!/usr/bin/env node

var newProject = require('../cmds/new_project.js');

var argv = require('yargs')
    .scriptName('cloudapps')
    .command('new', 'create a new project from a template', {},
        function() {
            newProject();
        }
    )
    .demandCommand(1, 'In short, please run "new" to create a new project, or --help for more.')
    .help('help')
    .argv;
