var gulp = require('gulp');
var process = require('process');
var cachebust = require('gulp-cache-bust');

var config = require('config');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var uglifyJS = require('gulp-uglify');
var nodemon = require('gulp-nodemon');
var cleanCSS = require("gulp-clean-css");

//Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['./assets/javascripts/lib/*.js', './assets/javascripts/*.js'])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('scripts.min.js'))
        .pipe(uglifyJS())
        .pipe(gulp.dest('./public/dist'));
});

//Concatenate & Minify CSS
gulp.task('styles', function() {
    return gulp.src(['./assets/stylesheets/lib/*.css', './assets/stylesheets/*.css'])
        .pipe(concat('styles.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./public/dist'));
});

//Cachebust scripts and styles
gulp.task('cachebust', function() {

    return gulp.src('./views/**/*')
        .pipe(cachebust({ type: 'MD5', basePath: './public' }))
        .pipe(gulp.dest('./build/views'));
});

// Default Task
gulp.task('compile', gulp.series('scripts', 'styles', 'cachebust'));

gulp.task('develop', function() {

    var monitor = nodemon({ script: './bin/www',
        ext: 'js css ejs json',
        "verbose": false,
        delay: (config.DATABASE && config.DATABASE.alter ? 10000 : 1000),
        tasks: ['compile'],
        "ignore": [".idea/*", ".idea\\*", "sqlite3/*", "sqlite3\\*", "build/*", "build\\*", "public/dist/*", "public\\dist\\*"],
        "env": {
            "NODE_ENV": "development"
        }});

    monitor.on('start', function() {
        console.log('nodemon has started app');
    }).on('quit', function() {
        console.log('nodemon has quit');
        process.exit();
    }).on('restart', function(files) {
        console.log('App restarted due to: ', files);
    });

    return monitor;
});


gulp.task('debug', gulp.series('compile', 'develop'));
gulp.task('build', gulp.series('compile'));
gulp.task('default', gulp.series('compile'));