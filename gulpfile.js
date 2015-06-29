var gulp = require('gulp');

gulp.task('default', ['copy-static']);

gulp.task('build-dir', require('./gulp-tasks/build-dir'));
gulp.task('copy-static', require('./gulp-tasks/copy-static'));
