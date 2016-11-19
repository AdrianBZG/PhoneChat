// Gulpfile
var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('default', [], function() {
    gulp.start('server');
});

gulp.task('server', function () {
  return gulp.src('').pipe(shell([ 'node --harmony_destructuring server.js' ]));
});
