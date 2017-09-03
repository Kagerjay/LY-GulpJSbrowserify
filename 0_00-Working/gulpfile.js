var gulp = require('gulp');
    gutil = require('gulp-util');
    coffee = require('gulp-coffee');

gulp.task('log', function(){
  gutil.log('Workflows are awesome');

});

var coffeeSources = ['components/coffee/tagline.coffee'];

gulp.task('coffee',function(){
  gulp.src(coffeeSources)
    .pipe(coffee({ bare: true}) //pipe it through coffee bare plugin
      .on('error', gutil.log)) //sends error if invalid coffeescript, and log in console
    .pipe(gulp.dest('components/scripts')) //push results to scripts folder
});
