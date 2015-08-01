var gulp = require('gulp');
var mocha = require('gulp-mocha');
var livereload = require('gulp-livereload');

var config = require('../configuration.json');
var srcFiles = config.tasksDir + '/**/*.js';

module.exports = copyTask;
module.exports.srcFiles = srcFiles;

function copyTask() {
	return gulp.src(srcFiles, {read: false})
		.pipe(mocha({reporter: 'spec'}));
}