var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default', ['build', 'watch-task']);

gulp.task('build', function() {
	runSequence('tpl-task',
				['copy-task', 'vendor-task', 'css-task', 'js-task']
			);
});

gulp.task('copy-task', require('./gulp-tasks/copy-task'));
gulp.task('vendor-task', require('./gulp-tasks/vendor-task'));
gulp.task('js-task', require('./gulp-tasks/js-task'));
gulp.task('css-task', require('./gulp-tasks/css-task'));
gulp.task('tpl-task', require('./gulp-tasks/tpl-task'));

gulp.task('watch-task', require('./gulp-tasks/watch-task'));
