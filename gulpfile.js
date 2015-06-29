var gulp = require('gulp');

gulp.task('default', ['copy-task', 'js-task', 'css-task', 'watch-task']);

gulp.task('copy-task', require('./gulp-tasks/copy-task'));
gulp.task('js-task', require('./gulp-tasks/js-task'));
gulp.task('css-task', require('./gulp-tasks/css-task'));

gulp.task('watch-task', require('./gulp-tasks/watch-task'));
