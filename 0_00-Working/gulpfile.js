var gulp = require('gulp');
    gutil = require('gulp-util');
    coffee = require('gulp-coffee');
    concat = require('gulp-concat');

gulp.task('log', function(){
  gutil.log('Workflows are awesome');

});

var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = [
  'components/scripts/rclick.js',
  'components/scripts/pixgrid.js',
  'components/scripts/tagline.js',
  'components/scripts/template.js'
];

//Processes raw coffee file into tagline.js (referenced in coffee file)
gulp.task('coffee',function(){
  gulp.src(coffeeSources)
    .pipe(coffee({ bare: true}) //pipe it through coffee bare plugin
      .on('error', gutil.log)) //sends error if invalid coffeescript, and log in console
    .pipe(gulp.dest('components/scripts')) //push results to scripts folder
});

//Combines javascript files together from source
gulp.task('js',function(){
  gulp.src(jsSources)
    .pipe(concat('script.js'))  //one file that we will reference in index.html
    .pipe(gulp.dest('builds/development/js')) //final destination
});
