/*===========================================================
 GULP: APP TASKS :: Script -- js hint, uglify & concat
===========================================================*/
var gulp = require('gulp'),
    gulpIf = require('gulp-if'),
    jshintStylish = require('jshint-stylish'),
    gulploadPlugins = require('gulp-load-plugins');

var plugins = gulploadPlugins();
var config = require('./config');

gulp.task('vendor', function () {

    console.log(config.notify.update('\n--------- Running VENDOR SCRIPT tasks -----------------------------------------\n'));
    return gulp.src([config.source.js + '/vendor/*.js']) 
        .pipe(plugins.concat('application.js'))  
        .pipe(plugins.uglify())  
        .pipe(plugins.size()) 
        .pipe(gulp.dest(config.build.js));
});

gulp.task('scripts', ['vendor'],  function () {

    console.log(config.notify.update('\n--------- Running SCRIPT tasks -----------------------------------------\n'));
    return gulp.src([config.source.js + '/*.js'])
        .pipe(plugins.fileInclude({
            prefix: '@@',
            basepath: config.source.vendorjs
        })) 
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter(jshintStylish))
        .pipe(gulpIf(config.production, plugins.uglify()))
        .pipe(plugins.size()) 
        .pipe(gulp.dest(config.build.js));
});
