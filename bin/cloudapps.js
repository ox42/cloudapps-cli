#!/usr/bin/env node

var newProject = require('../cmds/new_project.js');

var argv = require('yargs')
    .scriptName('cloudapps')
    .command('new', 'create a new project from a template', {},
        function() {
            newProject();
        }
    )
    .demandCommand(1, '(HELP) In short, please run "cloudapps new" to create a new project, or use --help for more.')
    .help('help')
    .argv;
