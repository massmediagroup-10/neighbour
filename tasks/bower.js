/*==========================================================
 GULP: APP TASKS :: Bower file include
===========================================================*/
var gulp = require('gulp'),
    bower = require('bower'),
    gulpIf = require('gulp-if'),
    underscore = require('underscore'),
    underscoreStr = require('underscore.string'),
    sourcemaps = require('gulp-sourcemaps'),
    filter = require('gulp-filter'),
    gulploadPlugins = require('gulp-load-plugins');

var plugins = gulploadPlugins();
var exclude = [];

var filterByExtension = function(extension){
    return filter(function(file){
        return file.path.match(new RegExp('.' + extension + '$'));
    });
};

var config = require('./config');

var bowerFile = require('../bower.json');
var bowerPackages = bowerFile.dependencies;
var bowerDir = '../bower_components';
var packagesOrder = [];
var mainFiles = [];

// Function for adding package name into packagesOrder array in the right order
function addPackage(name){
  mainFiles = [];
  // package info and dependencies
  var info = require(bowerDir + '/' + name + '/bower.json');
  var dependencies = info.dependencies;

  // add dependencies by repeat the step
  if(!!dependencies){
    underscore.each(dependencies, function(value, key){
      if(exclude.indexOf(key) === -1){
        addPackage(key);
      }
    });
  }

  // and then add this package into the packagesOrder array if they are not exist yet
  if(packagesOrder.indexOf(name) === -1){
    packagesOrder.push(name);
  }
}

function bowerMain (extension) {
  var mainFiles = [];

  // calculate the order of packages
  underscore.each(bowerPackages, function(value, key){
    if(exclude.indexOf(key) === -1){ // add to packagesOrder if it's not in exclude
      addPackage(key);
    }
  });

  // get the main files of packages base on the order
  underscore.each(packagesOrder, function(bowerPackage){
    var info = require(bowerDir + '/' + bowerPackage + '/bower.json');
    var main = info.main;
    var packages = [];
    var package;
    
    // get only the .js file if mainFile is an array
    if(underscore.isArray(main)){
      underscore.each(main, function(file){
        if(underscoreStr.endsWith(file, extension)){
          package = bowerDir + '/' + bowerPackage + '/' + file;
          packages.push(package.split('../')[1]);
        }
      });
    } else {
        if(underscoreStr.endsWith(main, extension)){
          package = bowerDir + '/' + bowerPackage + '/' + main;
          packages.push(package.split('../')[1]);
        }
    }

    packages.forEach(function (package) {
      mainFiles.push(package);
    })

  });

  return mainFiles;
}

// TASKS

gulp.task('bower', function(cb){
  console.log(config.notify.update('\n--------- Running Bower Task --------------------------------------------\n'));
  bower.commands.install([], {save: true}, {})
    .on('end', function(installed){
      //console.log(update('Bower installation completed'));
      cb(); // notify gulp that this task is finished
    });
});

gulp.task('bundle-libraries', ['bower'], function(){  
  // run the gulp stream   
  console.log(config.notify.update(bowerMain('.js')));
  return gulp.src(bowerMain('.js'))
    .pipe(sourcemaps.init({loadMaps : true}))
      .pipe(plugins.concat('bower.js'))
      .pipe(gulpIf(config.production, plugins.uglify()))
    .pipe(gulpIf(config.production, sourcemaps.write('./')))
    .pipe(gulp.dest(config.build.js));
});

gulp.task('bundle-libraries-css', function(){  
  // run the gulp stream
  console.log(config.notify.update(bowerMain('.css')));
  return gulp.src(bowerMain('.css'))
    .pipe(sourcemaps.init({loadMaps : true}))
      .pipe(plugins.concat('bower.css'))
      .pipe(gulpIf(config.production, plugins.minifyCss()))
    .pipe(gulpIf(config.production, sourcemaps.write('./')))
    .pipe(gulp.dest(config.build.css));
});
