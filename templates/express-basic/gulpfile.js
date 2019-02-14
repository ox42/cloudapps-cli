var gulp = require('gulp');
var cachebust = require('gulp-cache-bust');

var concat = require('gulp-concat');
var babel = require('gulp-babel');
var uglifyJS = require('gulp-uglify');
var rename = require('gulp-rename');
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
        .pipe(rename('styles.min.css'))
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

    return nodemon({ script: './bin/www',
        ext: 'js css ejs json',
        "verbose": "true",
        tasks: ['compile'],
        "ignore": [".idea/*", ".idea\\*", "build/*", "build\\*", "public/dist/*", "public\\dist\\*"],
        "env": {
            "NODE_ENV": "development"
        }});
});


gulp.task('debug', gulp.series('compile', 'develop'));
gulp.task('build', gulp.series('compile'));
gulp.task('default', gulp.series('compile'));