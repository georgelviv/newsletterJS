var gulp = require('gulp');
var livereload = require('gulp-livereload');

var config = require('../configuration.json');

module.exports = watchTask;

function watchTask() {
	livereload.listen();
	gulp.watch(require('../gulp-tasks/copy-task').srcFiles, ['copy-task']);
	gulp.watch(require('../gulp-tasks/js-task').srcFiles, ['js-task']);
	gulp.watch(require('../gulp-tasks/css-task').srcFiles, ['css-task']);
}