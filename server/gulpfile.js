// Gulpfile

var gulp = require('gulp');
var watch = require('gulp-watch'); // Watch to have background tasks executing when some event is triggered
var karma = require('gulp-karma');  // Include Karma
var shell = require('gulp-shell');
var sass = require('gulp-sass');	// This is used to automatize the Sass tasks

gulp.task('default', [], function() {
    gulp.start('server');
});

gulp.task('sass', function () {
  return gulp.src(input.sass)
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(output.sass));
});

gulp.task('server', function () {
  return gulp.src('').pipe(shell([ 'node --harmony_destructuring server.js' ]));
});
