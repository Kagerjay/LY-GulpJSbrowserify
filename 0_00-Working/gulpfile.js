var gulp = require('gulp');
    gutil = require('gulp-util');
    coffee = require('gulp-coffee');
    browserify = require('gulp-browserify');
    compass = require('gulp-compass'),
    concat = require('gulp-concat');

gulp.task('log', function(){
  gutil.log('Workflows are awesome');

});

//source data
var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = [
  'components/scripts/rclick.js',
  'components/scripts/pixgrid.js',
  'components/scripts/tagline.js',
  'components/scripts/template.js'
];
var sassSources = ['components/sass/style.scss'];

//Processes raw coffee file into tagline.js (referenced in coffee file)
gulp.task('coffee',function(){
  gulp.src(coffeeSources)
    .pipe(coffee({ bare: true}) //pipe it through coffee bare plugin
      .on('error', gutil.log)) //sends error if invalid coffeescript, and log in console
    .pipe(gulp.dest('components/scripts')) //push results to scripts folder
});

//Extra Parameter 'coffee'
//Combines javascript files together from source
gulp.task('js', ['coffee'], function(){
  gulp.src(jsSources)
    .pipe(concat('script.js'))  //one file that we will reference in index.html
    .pipe(browserify())
    .pipe(gulp.dest('builds/development/js')) //final destination
});

//Sass process data
gulp.task('compass',function(){
  gulp.src(sassSources)
    .pipe(compass({  //compass library
      sass: 'components/sass', //directory
      image: 'builds/development/images',
      stye: 'expanded'
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest('builds/development/css')) //final destination
});

//No call back task
gulp.task('default', ['coffee', 'js', 'compass', 'watch']);

gulp.task('watch', function(){
  gulp.watch(coffeeSources,['coffee']);
  gulp.watch(jsSources,['js']);
  gulp.watch('components/sass/*.scss',['compass']);
});
